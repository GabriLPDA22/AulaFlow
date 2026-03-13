using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AulaFlow.Application.Auth;
using AulaFlow.Domain.Entities;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace AulaFlow.Infrastructure.Services;

public class AuthService(
    AppDbContext db,
    IConfiguration config,
    ILogger<AuthService> logger) : IAuthService
{
    private readonly string _jwtSecret = config["Jwt:Secret"] ?? throw new InvalidOperationException("Jwt:Secret not configured");
    private readonly string _jwtIssuer = config["Jwt:Issuer"] ?? "aulaflow";
    private readonly string _jwtAudience = config["Jwt:Audience"] ?? "aulaflow";
    private readonly int _accessTokenMinutes = int.TryParse(config["Jwt:AccessTokenMinutes"], out var m) ? m : 15;
    private readonly int _refreshTokenDays = int.TryParse(config["Jwt:RefreshTokenDays"], out var d) ? d : 7;

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await db.Users
            .Include(u => u.Business)
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLower() && u.IsActive);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Credenciales incorrectas");

        return await GenerateAuthResponseAsync(user);
    }

    public async Task<AuthResponse> RefreshAsync(string refreshToken)
    {
        var token = await db.RefreshTokens
            .Include(rt => rt.User)
            .ThenInclude(u => u.Business)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken && !rt.IsRevoked);

        if (token is null || token.ExpiresAt < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Refresh token inválido o expirado");

        token.IsRevoked = true;
        await db.SaveChangesAsync();

        return await GenerateAuthResponseAsync(token.User);
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var token = await db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshToken);
        if (token is not null)
        {
            token.IsRevoked = true;
            await db.SaveChangesAsync();
        }
    }

    public async Task<UserDto> GetCurrentUserAsync(Guid userId)
    {
        var user = await db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("Usuario no encontrado");

        return MapToUserDto(user);
    }

    private async Task<AuthResponse> GenerateAuthResponseAsync(User user)
    {
        var accessToken = GenerateAccessToken(user);
        var refreshToken = await CreateRefreshTokenAsync(user.Id);
        var expiresAt = DateTime.UtcNow.AddMinutes(_accessTokenMinutes);

        logger.LogInformation("User {UserId} authenticated successfully", user.Id);

        return new AuthResponse(accessToken, refreshToken, expiresAt, MapToUserDto(user));
    }

    private string GenerateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim("businessId", user.BusinessId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _jwtIssuer,
            audience: _jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_accessTokenMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<string> CreateRefreshTokenAsync(Guid userId)
    {
        var tokenValue = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        var refreshToken = new RefreshToken
        {
            UserId = userId,
            Token = tokenValue,
            ExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenDays)
        };

        db.RefreshTokens.Add(refreshToken);
        await db.SaveChangesAsync();

        return tokenValue;
    }

    private static UserDto MapToUserDto(User user) =>
        new(user.Id, user.BusinessId, user.Name, user.Email, user.Role);
}
