using AulaFlow.Domain.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Domain.Entities;

public class Lead : BaseEntity
{
    public Guid BusinessId { get; set; }
    public Guid? ConversationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Notes { get; set; }
    public LeadStatus Status { get; set; } = LeadStatus.New;
    public DateTime CapturedAt { get; set; } = DateTime.UtcNow;

    public Business Business { get; set; } = null!;
    public Conversation? Conversation { get; set; }
}
