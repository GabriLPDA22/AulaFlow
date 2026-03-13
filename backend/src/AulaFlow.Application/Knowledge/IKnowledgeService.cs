namespace AulaFlow.Application.Knowledge;

public interface IKnowledgeService
{
    Task<IEnumerable<KnowledgeSourceDto>> GetAllAsync(Guid businessId);
    Task<KnowledgeSourceDto> GetByIdAsync(Guid businessId, Guid id);
    Task<KnowledgeSourceDto> CreateAsync(Guid businessId, CreateKnowledgeSourceRequest request);
    Task<KnowledgeSourceDto> UpdateAsync(Guid businessId, Guid id, UpdateKnowledgeSourceRequest request);
    Task DeleteAsync(Guid businessId, Guid id);
    Task<KnowledgeSourceDto> ToggleActiveAsync(Guid businessId, Guid id);
}
