namespace AulaFlow.Domain.Entities;

public class AssistantSettings
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BusinessId { get; set; }
    public string AssistantName { get; set; } = "Asistente";
    public string WelcomeMessage { get; set; } = "Hola, ¿en qué puedo ayudarte?";
    public string Personality { get; set; } = "Amable, profesional y conciso";
    public bool LeadCaptureEnabled { get; set; } = true;
    public string LeadCapturePrompt { get; set; } = "Para ayudarte mejor, ¿me dices tu nombre y correo?";
    public string PrimaryColor { get; set; } = "#1D3557";
    public string? AvatarUrl { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Business Business { get; set; } = null!;
}
