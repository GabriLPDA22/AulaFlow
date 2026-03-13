using AulaFlow.Domain.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Domain.Entities;

public class User : BaseEntity
{
    public Guid BusinessId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Member;
    public bool IsActive { get; set; } = true;

    public Business Business { get; set; } = null!;
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
}
