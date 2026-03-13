using AulaFlow.Api.Extensions;
using AulaFlow.Application.Leads;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AulaFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/leads")]
public class LeadsController(ILeadService leadService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] LeadQuery query)
    {
        var businessId = User.GetBusinessId();
        var result = await leadService.GetAllAsync(businessId, query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await leadService.GetByIdAsync(businessId, id);
        return Ok(result);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateLeadRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await leadService.UpdateAsync(businessId, id, request);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateLeadStatusRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await leadService.UpdateStatusAsync(businessId, id, request);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var businessId = User.GetBusinessId();
        await leadService.DeleteAsync(businessId, id);
        return NoContent();
    }
}
