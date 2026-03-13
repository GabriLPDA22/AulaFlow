using AulaFlow.Application.Common;
using AulaFlow.Application.Conversations;
using AulaFlow.Domain.Enums;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AulaFlow.Infrastructure.Services;

public class ConversationService(AppDbContext db, ILogger<ConversationService> logger) : IConversationService
{
    public async Task<PagedResult<ConversationDto>> GetAllAsync(Guid businessId, ConversationQuery query)
    {
        var q = db.Conversations
            .Where(c => c.BusinessId == businessId)
            .AsQueryable();

        if (query.Status.HasValue)
            q = q.Where(c => c.Status == query.Status.Value);

        if (query.LeadCaptured.HasValue)
            q = q.Where(c => c.LeadCaptured == query.LeadCaptured.Value);

        var total = await q.CountAsync();
        var items = await q
            .OrderByDescending(c => c.StartedAt)
            .Skip(query.Skip)
            .Take(query.PageSize)
            .Select(c => new ConversationDto(
                c.Id,
                c.BusinessId,
                c.VisitorId,
                c.Status,
                c.LeadCaptured,
                c.Summary,
                c.StartedAt,
                c.ClosedAt,
                c.Messages.Count))
            .ToListAsync();

        return new PagedResult<ConversationDto>
        {
            Items = items,
            Total = total,
            Page = query.Page,
            PageSize = query.PageSize
        };
    }

    public async Task<ConversationDetailDto> GetByIdAsync(Guid businessId, Guid conversationId)
    {
        var conversation = await db.Conversations
            .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Conversación no encontrada");

        return new ConversationDetailDto(
            conversation.Id,
            conversation.BusinessId,
            conversation.VisitorId,
            conversation.Status,
            conversation.LeadCaptured,
            conversation.Summary,
            conversation.StartedAt,
            conversation.ClosedAt,
            conversation.Messages.Select(MapMessageToDto));
    }

    public async Task<IEnumerable<MessageDto>> GetMessagesAsync(Guid businessId, Guid conversationId)
    {
        var exists = await db.Conversations
            .AnyAsync(c => c.Id == conversationId && c.BusinessId == businessId);

        if (!exists) throw new KeyNotFoundException("Conversación no encontrada");

        return await db.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .Select(m => MapMessageToDto(m))
            .ToListAsync();
    }

    public async Task<SummarizeResponse> SummarizeAsync(Guid businessId, Guid conversationId)
    {
        var conversation = await db.Conversations
            .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Conversación no encontrada");

        // Placeholder: en Fase 5 se integra con OpenAI
        var summary = $"Conversación con {conversation.Messages.Count} mensajes iniciada el {conversation.StartedAt:dd/MM/yyyy}. " +
                      $"Lead capturado: {(conversation.LeadCaptured ? "Sí" : "No")}.";

        conversation.Summary = summary;
        await db.SaveChangesAsync();

        logger.LogInformation("Summary generated for conversation {ConversationId}", conversationId);
        return new SummarizeResponse(summary);
    }

    public async Task CloseAsync(Guid businessId, Guid conversationId)
    {
        var conversation = await db.Conversations
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Conversación no encontrada");

        conversation.Status = ConversationStatus.Closed;
        conversation.ClosedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    private static MessageDto MapMessageToDto(Domain.Entities.Message m) =>
        new(m.Id, m.Role, m.Content, m.CreatedAt);
}
