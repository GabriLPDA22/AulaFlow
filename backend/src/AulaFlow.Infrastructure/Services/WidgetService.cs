using AulaFlow.Application.Conversations;
using AulaFlow.Application.Widget;
using AulaFlow.Domain.Entities;
using AulaFlow.Domain.Enums;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AulaFlow.Infrastructure.Services;

public class WidgetService(AppDbContext db, ILogger<WidgetService> logger) : IWidgetService
{
    public async Task<StartConversationResponse> StartConversationAsync(Guid businessId, string visitorId)
    {
        var settings = await db.AssistantSettings
            .FirstOrDefaultAsync(a => a.BusinessId == businessId);

        var conversation = new Conversation
        {
            BusinessId = businessId,
            VisitorId = visitorId
        };

        db.Conversations.Add(conversation);
        await db.SaveChangesAsync();

        logger.LogInformation("New conversation {ConversationId} started for business {BusinessId}", conversation.Id, businessId);

        return new StartConversationResponse(
            conversation.Id,
            settings?.AssistantName ?? "Asistente",
            settings?.WelcomeMessage ?? "Hola, ¿en qué puedo ayudarte?",
            settings?.PrimaryColor ?? "#1D3557",
            settings?.AvatarUrl
        );
    }

    public async Task<SendMessageResponse> SendMessageAsync(Guid businessId, Guid conversationId, string content)
    {
        var conversation = await db.Conversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId && c.Status == ConversationStatus.Active)
            ?? throw new KeyNotFoundException("Conversación no encontrada o cerrada");

        var userMessage = new Message
        {
            ConversationId = conversationId,
            Role = MessageRole.User,
            Content = content
        };

        db.Messages.Add(userMessage);

        // Placeholder IA: en Fase 5 se integra con OpenAI
        var assistantResponse = await GeneratePlaceholderResponseAsync(businessId, content);

        var assistantMessage = new Message
        {
            ConversationId = conversationId,
            Role = MessageRole.Assistant,
            Content = assistantResponse
        };

        db.Messages.Add(assistantMessage);
        await db.SaveChangesAsync();

        return new SendMessageResponse(
            new MessageDto(userMessage.Id, userMessage.Role, userMessage.Content, userMessage.CreatedAt),
            new MessageDto(assistantMessage.Id, assistantMessage.Role, assistantMessage.Content, assistantMessage.CreatedAt)
        );
    }

    public async Task<IEnumerable<MessageDto>> GetMessagesAsync(Guid businessId, Guid conversationId, string visitorId)
    {
        var conversation = await db.Conversations
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId && c.VisitorId == visitorId)
            ?? throw new KeyNotFoundException("Conversación no encontrada");

        return await db.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .Select(m => new MessageDto(m.Id, m.Role, m.Content, m.CreatedAt))
            .ToListAsync();
    }

    public async Task<CaptureLeadResponse> CaptureLeadAsync(Guid businessId, Guid conversationId, CaptureLeadRequest request)
    {
        var conversation = await db.Conversations
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Conversación no encontrada");

        if (conversation.LeadCaptured)
            throw new InvalidOperationException("Ya se capturó un lead para esta conversación");

        var lead = new Lead
        {
            BusinessId = businessId,
            ConversationId = conversationId,
            Name = request.Name,
            Email = request.Email,
            Phone = request.Phone
        };

        db.Leads.Add(lead);
        conversation.LeadCaptured = true;
        await db.SaveChangesAsync();

        logger.LogInformation("Lead {LeadId} captured from conversation {ConversationId}", lead.Id, conversationId);

        return new CaptureLeadResponse(lead.Id, "Gracias, hemos registrado tus datos.");
    }

    private async Task<string> GeneratePlaceholderResponseAsync(Guid businessId, string userMessage)
    {
        var knowledgeSources = await db.KnowledgeSources
            .Where(k => k.BusinessId == businessId && k.IsActive)
            .ToListAsync();

        if (!knowledgeSources.Any())
            return "Gracias por tu mensaje. En breve nos pondremos en contacto contigo.";

        return "Gracias por tu consulta. He revisado la información disponible y te puedo confirmar que estamos aquí para ayudarte. ¿Necesitas algo más específico?";
    }
}
