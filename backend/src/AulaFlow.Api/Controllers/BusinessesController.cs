using AulaFlow.Api.Extensions;
using AulaFlow.Application.Businesses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AulaFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/businesses")]
public class BusinessesController(IBusinessService businessService) : ControllerBase
{
    [HttpGet("me")]
    public async Task<IActionResult> GetMyBusiness()
    {
        var businessId = User.GetBusinessId();
        var result = await businessService.GetByIdAsync(businessId);
        return Ok(result);
    }

    [HttpPatch("me")]
    public async Task<IActionResult> UpdateMyBusiness([FromBody] UpdateBusinessRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await businessService.UpdateAsync(businessId, request);
        return Ok(result);
    }
}
