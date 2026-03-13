using AulaFlow.Application.Common;
using AulaFlow.Application.Leads;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AulaFlow.Infrastructure.Services;

public class LeadService(AppDbContext db) : ILeadService
{
    public async Task<PagedResult<LeadDto>> GetAllAsync(Guid businessId, LeadQuery query)
    {
        var q = db.Leads
            .Where(l => l.BusinessId == businessId)
            .AsQueryable();

        if (query.Status.HasValue)
            q = q.Where(l => l.Status == query.Status.Value);

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.ToLower();
            q = q.Where(l => l.Name.ToLower().Contains(search) || l.Email.ToLower().Contains(search));
        }

        var total = await q.CountAsync();
        var items = await q
            .OrderByDescending(l => l.CapturedAt)
            .Skip(query.Skip)
            .Take(query.PageSize)
            .Select(l => MapToDto(l))
            .ToListAsync();

        return new PagedResult<LeadDto>
        {
            Items = items,
            Total = total,
            Page = query.Page,
            PageSize = query.PageSize
        };
    }

    public async Task<LeadDto> GetByIdAsync(Guid businessId, Guid leadId)
    {
        var lead = await db.Leads
            .FirstOrDefaultAsync(l => l.Id == leadId && l.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Lead no encontrado");

        return MapToDto(lead);
    }

    public async Task<LeadDto> UpdateAsync(Guid businessId, Guid leadId, UpdateLeadRequest request)
    {
        var lead = await db.Leads
            .FirstOrDefaultAsync(l => l.Id == leadId && l.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Lead no encontrado");

        if (request.Name is not null) lead.Name = request.Name;
        if (request.Email is not null) lead.Email = request.Email;
        if (request.Phone is not null) lead.Phone = request.Phone;
        if (request.Notes is not null) lead.Notes = request.Notes;

        await db.SaveChangesAsync();
        return MapToDto(lead);
    }

    public async Task<LeadDto> UpdateStatusAsync(Guid businessId, Guid leadId, UpdateLeadStatusRequest request)
    {
        var lead = await db.Leads
            .FirstOrDefaultAsync(l => l.Id == leadId && l.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Lead no encontrado");

        lead.Status = request.Status;
        await db.SaveChangesAsync();
        return MapToDto(lead);
    }

    public async Task DeleteAsync(Guid businessId, Guid leadId)
    {
        var lead = await db.Leads
            .FirstOrDefaultAsync(l => l.Id == leadId && l.BusinessId == businessId)
            ?? throw new KeyNotFoundException("Lead no encontrado");

        db.Leads.Remove(lead);
        await db.SaveChangesAsync();
    }

    private static LeadDto MapToDto(Domain.Entities.Lead l) =>
        new(l.Id, l.BusinessId, l.ConversationId, l.Name, l.Email, l.Phone, l.Notes, l.Status, l.CapturedAt, l.UpdatedAt);
}
