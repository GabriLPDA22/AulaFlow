using AulaFlow.Domain.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Domain.Entities;

public class Conversation : BaseEntity
{
    public Guid BusinessId { get; set; }
    public string VisitorId { get; set; } = string.Empty;
    public ConversationStatus Status { get; set; } = ConversationStatus.Active;
    public bool LeadCaptured { get; set; }
    public string? Summary { get; set; }
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ClosedAt { get; set; }

    public Business Business { get; set; } = null!;
    public ICollection<Message> Messages { get; set; } = [];
    public Lead? Lead { get; set; }
}
