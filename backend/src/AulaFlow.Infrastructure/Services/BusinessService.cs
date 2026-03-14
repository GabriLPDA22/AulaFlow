using AulaFlow.Application.Businesses;
using AulaFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AulaFlow.Infrastructure.Services;

public class BusinessService(AppDbContext db) : IBusinessService
{
    public async Task<BusinessDto> GetByIdAsync(Guid businessId)
    {
        var business = await db.Businesses.FindAsync(businessId)
            ?? throw new KeyNotFoundException("Negocio no encontrado");

        return MapToDto(business);
    }

    public async Task<BusinessDto> UpdateAsync(Guid businessId, UpdateBusinessRequest request)
    {
        var business = await db.Businesses.FindAsync(businessId)
            ?? throw new KeyNotFoundException("Negocio no encontrado");

        business.Name = request.Name;
        business.LogoUrl = request.LogoUrl;

        await db.SaveChangesAsync();
        return MapToDto(business);
    }

    private static BusinessDto MapToDto(Domain.Entities.Business b) =>
        new(b.Id, b.Name, b.Slug, b.LogoUrl, b.BusinessToken, b.CreatedAt);
}
