using AulaFlow.Application.Common;

namespace AulaFlow.Application.Leads;

public interface ILeadService
{
    Task<PagedResult<LeadDto>> GetAllAsync(Guid businessId, LeadQuery query);
    Task<LeadDto> GetByIdAsync(Guid businessId, Guid leadId);
    Task<LeadDto> UpdateAsync(Guid businessId, Guid leadId, UpdateLeadRequest request);
    Task<LeadDto> UpdateStatusAsync(Guid businessId, Guid leadId, UpdateLeadStatusRequest request);
    Task DeleteAsync(Guid businessId, Guid leadId);
}
