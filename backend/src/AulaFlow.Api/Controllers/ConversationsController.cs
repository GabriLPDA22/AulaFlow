using AulaFlow.Api.Extensions;
using AulaFlow.Application.Conversations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AulaFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/conversations")]
public class ConversationsController(IConversationService conversationService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ConversationQuery query)
    {
        var businessId = User.GetBusinessId();
        var result = await conversationService.GetAllAsync(businessId, query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await conversationService.GetByIdAsync(businessId, id);
        return Ok(result);
    }

    [HttpGet("{id:guid}/messages")]
    public async Task<IActionResult> GetMessages(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await conversationService.GetMessagesAsync(businessId, id);
        return Ok(result);
    }

    [HttpPost("{id:guid}/summarize")]
    public async Task<IActionResult> Summarize(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await conversationService.SummarizeAsync(businessId, id);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/close")]
    public async Task<IActionResult> Close(Guid id)
    {
        var businessId = User.GetBusinessId();
        await conversationService.CloseAsync(businessId, id);
        return NoContent();
    }
}
