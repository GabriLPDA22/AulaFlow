using AulaFlow.Api.Extensions;
using AulaFlow.Application.AssistantSettings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AulaFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/assistant-settings")]
public class AssistantSettingsController(IAssistantSettingsService settingsService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var businessId = User.GetBusinessId();
        var result = await settingsService.GetByBusinessIdAsync(businessId);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> Upsert([FromBody] UpdateAssistantSettingsRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await settingsService.UpsertAsync(businessId, request);
        return Ok(result);
    }
}
