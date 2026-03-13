using AulaFlow.Application.AssistantSettings;
using AulaFlow.Domain.Entities;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AulaFlow.Infrastructure.Services;

public class AssistantSettingsService(AppDbContext db) : IAssistantSettingsService
{
    public async Task<AssistantSettingsDto> GetByBusinessIdAsync(Guid businessId)
    {
        var settings = await db.AssistantSettings
            .FirstOrDefaultAsync(a => a.BusinessId == businessId);

        if (settings is null)
        {
            settings = new AssistantSettings { BusinessId = businessId };
            db.AssistantSettings.Add(settings);
            await db.SaveChangesAsync();
        }

        return MapToDto(settings);
    }

    public async Task<AssistantSettingsDto> UpsertAsync(Guid businessId, UpdateAssistantSettingsRequest request)
    {
        var settings = await db.AssistantSettings
            .FirstOrDefaultAsync(a => a.BusinessId == businessId);

        if (settings is null)
        {
            settings = new AssistantSettings { BusinessId = businessId };
            db.AssistantSettings.Add(settings);
        }

        settings.AssistantName = request.AssistantName;
        settings.WelcomeMessage = request.WelcomeMessage;
        settings.Personality = request.Personality;
        settings.LeadCaptureEnabled = request.LeadCaptureEnabled;
        settings.LeadCapturePrompt = request.LeadCapturePrompt;
        settings.PrimaryColor = request.PrimaryColor;
        settings.AvatarUrl = request.AvatarUrl;
        settings.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return MapToDto(settings);
    }

    private static AssistantSettingsDto MapToDto(AssistantSettings a) =>
        new(a.Id, a.BusinessId, a.AssistantName, a.WelcomeMessage, a.Personality,
            a.LeadCaptureEnabled, a.LeadCapturePrompt, a.PrimaryColor, a.AvatarUrl);
}
