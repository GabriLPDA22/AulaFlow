using AulaFlow.Application.Knowledge;
using AulaFlow.Domain.Entities;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AulaFlow.Infrastructure.Services;

public class KnowledgeService(AppDbContext db) : IKnowledgeService
{
    public async Task<IEnumerable<KnowledgeSourceDto>> GetAllAsync(Guid businessId)
    {
        return await db.KnowledgeSources
            .Where(k => k.BusinessId == businessId)
            .OrderByDescending(k => k.CreatedAt)
            .Select(k => MapToDto(k))
            .ToListAsync();
    }

    public async Task<KnowledgeSourceDto> GetByIdAsync(Guid businessId, Guid id)
    {
        var source = await db.KnowledgeSources
            .FirstOrDefaultAsync(k => k.Id == id && k.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Fuente de conocimiento no encontrada");

        return MapToDto(source);
    }

    public async Task<KnowledgeSourceDto> CreateAsync(Guid businessId, CreateKnowledgeSourceRequest request)
    {
        var source = new KnowledgeSource
        {
            BusinessId = businessId,
            Type = request.Type,
            Title = request.Title,
            Content = request.Content
        };

        db.KnowledgeSources.Add(source);
        await db.SaveChangesAsync();
        return MapToDto(source);
    }

    public async Task<KnowledgeSourceDto> UpdateAsync(Guid businessId, Guid id, UpdateKnowledgeSourceRequest request)
    {
        var source = await db.KnowledgeSources
            .FirstOrDefaultAsync(k => k.Id == id && k.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Fuente de conocimiento no encontrada");

        source.Title = request.Title;
        source.Type = request.Type;
        source.Content = request.Content;

        await db.SaveChangesAsync();
        return MapToDto(source);
    }

    public async Task DeleteAsync(Guid businessId, Guid id)
    {
        var source = await db.KnowledgeSources
            .FirstOrDefaultAsync(k => k.Id == id && k.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Fuente de conocimiento no encontrada");

        db.KnowledgeSources.Remove(source);
        await db.SaveChangesAsync();
    }

    public async Task<KnowledgeSourceDto> ToggleActiveAsync(Guid businessId, Guid id)
    {
        var source = await db.KnowledgeSources
            .FirstOrDefaultAsync(k => k.Id == id && k.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Fuente de conocimiento no encontrada");

        source.IsActive = !source.IsActive;
        await db.SaveChangesAsync();
        return MapToDto(source);
    }

    private static KnowledgeSourceDto MapToDto(KnowledgeSource k) =>
        new(k.Id, k.BusinessId, k.Type, k.Title, k.Content, k.IsActive, k.CreatedAt, k.UpdatedAt);
}
