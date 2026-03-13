using AulaFlow.Api.Extensions;
using AulaFlow.Application.Knowledge;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AulaFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/knowledge-sources")]
public class KnowledgeSourcesController(IKnowledgeService knowledgeService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var businessId = User.GetBusinessId();
        var result = await knowledgeService.GetAllAsync(businessId);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await knowledgeService.GetByIdAsync(businessId, id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateKnowledgeSourceRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await knowledgeService.CreateAsync(businessId, request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateKnowledgeSourceRequest request)
    {
        var businessId = User.GetBusinessId();
        var result = await knowledgeService.UpdateAsync(businessId, id, request);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var businessId = User.GetBusinessId();
        await knowledgeService.DeleteAsync(businessId, id);
        return NoContent();
    }

    [HttpPatch("{id:guid}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var businessId = User.GetBusinessId();
        var result = await knowledgeService.ToggleActiveAsync(businessId, id);
        return Ok(result);
    }
}
