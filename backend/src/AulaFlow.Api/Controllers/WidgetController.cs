using AulaFlow.Application.Widget;
using AulaFlow.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AulaFlow.Api.Controllers;

[ApiController]
[Route("api/widget")]
public class WidgetController(IWidgetService widgetService, AppDbContext db) : ControllerBase
{
    [HttpPost("conversations")]
    public async Task<IActionResult> StartConversation([FromBody] StartConversationRequest request)
    {
        var businessId = await ResolveBusinessIdAsync();
        if (businessId is null) return Unauthorized(new { type = "unauthorized", message = "Token de negocio inválido" });

        var result = await widgetService.StartConversationAsync(businessId.Value, request.VisitorId);
        return CreatedAtAction(nameof(GetMessages), new { id = result.ConversationId }, result);
    }

    [HttpPost("conversations/{id:guid}/messages")]
    public async Task<IActionResult> SendMessage(Guid id, [FromBody] SendMessageRequest request)
    {
        var businessId = await ResolveBusinessIdAsync();
        if (businessId is null) return Unauthorized(new { type = "unauthorized", message = "Token de negocio inválido" });

        var result = await widgetService.SendMessageAsync(businessId.Value, id, request.Content);
        return Ok(result);
    }

    [HttpGet("conversations/{id:guid}/messages")]
    public async Task<IActionResult> GetMessages(Guid id, [FromQuery] string visitorId)
    {
        var businessId = await ResolveBusinessIdAsync();
        if (businessId is null) return Unauthorized(new { type = "unauthorized", message = "Token de negocio inválido" });

        var result = await widgetService.GetMessagesAsync(businessId.Value, id, visitorId);
        return Ok(result);
    }

    [HttpPost("conversations/{id:guid}/lead")]
    public async Task<IActionResult> CaptureLead(Guid id, [FromBody] CaptureLeadRequest request)
    {
        var businessId = await ResolveBusinessIdAsync();
        if (businessId is null) return Unauthorized(new { type = "unauthorized", message = "Token de negocio inválido" });

        var result = await widgetService.CaptureLeadAsync(businessId.Value, id, request);
        return CreatedAtAction(null, result);
    }

    private async Task<Guid?> ResolveBusinessIdAsync()
    {
        if (!Request.Headers.TryGetValue("X-Business-Token", out var tokenHeader))
            return null;

        if (!Guid.TryParse(tokenHeader.ToString(), out var token))
            return null;

        var business = await db.Businesses
            .Where(b => b.BusinessToken == token)
            .Select(b => new { b.Id })
            .FirstOrDefaultAsync();

        return business?.Id;
    }
}
