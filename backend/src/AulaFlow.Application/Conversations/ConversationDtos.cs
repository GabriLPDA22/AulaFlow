using AulaFlow.Application.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Application.Conversations;

public record ConversationDto(
    Guid Id,
    Guid BusinessId,
    string VisitorId,
    ConversationStatus Status,
    bool LeadCaptured,
    string? Summary,
    DateTime StartedAt,
    DateTime? ClosedAt,
    int MessageCount
);

public record ConversationDetailDto(
    Guid Id,
    Guid BusinessId,
    string VisitorId,
    ConversationStatus Status,
    bool LeadCaptured,
    string? Summary,
    DateTime StartedAt,
    DateTime? ClosedAt,
    IEnumerable<MessageDto> Messages
);

public record MessageDto(
    Guid Id,
    MessageRole Role,
    string Content,
    DateTime CreatedAt
);

public class ConversationQuery : PagedQuery
{
    public ConversationStatus? Status { get; set; }
    public bool? LeadCaptured { get; set; }
}

public record SummarizeResponse(string Summary);
