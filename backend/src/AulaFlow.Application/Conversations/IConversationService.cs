using AulaFlow.Application.Common;

namespace AulaFlow.Application.Conversations;

public interface IConversationService
{
    Task<PagedResult<ConversationDto>> GetAllAsync(Guid businessId, ConversationQuery query);
    Task<ConversationDetailDto> GetByIdAsync(Guid businessId, Guid conversationId);
    Task<IEnumerable<MessageDto>> GetMessagesAsync(Guid businessId, Guid conversationId);
    Task<SummarizeResponse> SummarizeAsync(Guid businessId, Guid conversationId);
    Task CloseAsync(Guid businessId, Guid conversationId);
}
