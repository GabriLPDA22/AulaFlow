using System.ComponentModel.DataAnnotations;
using AulaFlow.Application.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Application.Leads;

public record LeadDto(
    Guid Id,
    Guid BusinessId,
    Guid? ConversationId,
    string Name,
    string Email,
    string? Phone,
    string? Notes,
    LeadStatus Status,
    DateTime CapturedAt,
    DateTime UpdatedAt
);

public class LeadQuery : PagedQuery
{
    public LeadStatus? Status { get; set; }
    public string? Search { get; set; }
}

public record UpdateLeadRequest(
    [MaxLength(200)] string? Name,
    [EmailAddress, MaxLength(300)] string? Email,
    [MaxLength(50)] string? Phone,
    [MaxLength(2000)] string? Notes
);

public record UpdateLeadStatusRequest(
    [Required] LeadStatus Status
);
