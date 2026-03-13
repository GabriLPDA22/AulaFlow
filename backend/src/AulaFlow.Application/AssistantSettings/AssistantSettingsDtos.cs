using System.ComponentModel.DataAnnotations;

namespace AulaFlow.Application.AssistantSettings;

public record AssistantSettingsDto(
    Guid Id,
    Guid BusinessId,
    string AssistantName,
    string WelcomeMessage,
    string Personality,
    bool LeadCaptureEnabled,
    string LeadCapturePrompt,
    string PrimaryColor,
    string? AvatarUrl
);

public record UpdateAssistantSettingsRequest(
    [Required, MaxLength(100)] string AssistantName,
    [Required, MaxLength(500)] string WelcomeMessage,
    [MaxLength(1000)] string Personality,
    bool LeadCaptureEnabled,
    [MaxLength(500)] string LeadCapturePrompt,
    [MaxLength(20)] string PrimaryColor,
    [MaxLength(500)] string? AvatarUrl
);
