using System.ComponentModel.DataAnnotations;
using AulaFlow.Application.Conversations;

namespace AulaFlow.Application.Widget;

public record StartConversationRequest(
    [Required] string VisitorId
);

public record StartConversationResponse(
    Guid ConversationId,
    string AssistantName,
    string WelcomeMessage,
    string PrimaryColor,
    string? AvatarUrl
);

public record SendMessageRequest(
    [Required, MaxLength(2000)] string Content
);

public record SendMessageResponse(
    MessageDto UserMessage,
    MessageDto AssistantMessage
);

public record CaptureLeadRequest(
    [Required, MaxLength(200)] string Name,
    [Required, EmailAddress, MaxLength(300)] string Email,
    [MaxLength(50)] string? Phone
);

public record CaptureLeadResponse(
    Guid LeadId,
    string Message
);
