namespace AulaFlow.Application.Businesses;

public interface IBusinessService
{
    Task<BusinessDto> GetByIdAsync(Guid businessId);
    Task<BusinessDto> UpdateAsync(Guid businessId, UpdateBusinessRequest request);
}
