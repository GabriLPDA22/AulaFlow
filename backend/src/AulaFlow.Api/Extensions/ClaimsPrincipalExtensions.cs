using System.Security.Claims;

namespace AulaFlow.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user) =>
        Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public static Guid GetBusinessId(this ClaimsPrincipal user) =>
        Guid.Parse(user.FindFirstValue("businessId")!);
}
