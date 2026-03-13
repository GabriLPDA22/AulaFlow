using System.ComponentModel.DataAnnotations;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Application.Auth;

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string Password
);

public record RefreshTokenRequest(
    [Required] string RefreshToken
);

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt,
    UserDto User
);

public record UserDto(
    Guid Id,
    Guid BusinessId,
    string Name,
    string Email,
    UserRole Role
);
