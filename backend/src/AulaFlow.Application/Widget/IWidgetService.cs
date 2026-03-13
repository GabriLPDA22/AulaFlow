using AulaFlow.Application.Conversations;

namespace AulaFlow.Application.Widget;

public interface IWidgetService
{
    Task<StartConversationResponse> StartConversationAsync(Guid businessId, string visitorId);
    Task<SendMessageResponse> SendMessageAsync(Guid businessId, Guid conversationId, string content);
    Task<IEnumerable<MessageDto>> GetMessagesAsync(Guid businessId, Guid conversationId, string visitorId);
    Task<CaptureLeadResponse> CaptureLeadAsync(Guid businessId, Guid conversationId, CaptureLeadRequest request);
}
