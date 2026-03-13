namespace AulaFlow.Application.AssistantSettings;

public interface IAssistantSettingsService
{
    Task<AssistantSettingsDto> GetByBusinessIdAsync(Guid businessId);
    Task<AssistantSettingsDto> UpsertAsync(Guid businessId, UpdateAssistantSettingsRequest request);
}
