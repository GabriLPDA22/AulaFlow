using System.ComponentModel.DataAnnotations;

namespace AulaFlow.Application.Businesses;

public record BusinessDto(
    Guid Id,
    string Name,
    string Slug,
    string? LogoUrl,
    DateTime CreatedAt
);

public record UpdateBusinessRequest(
    [Required, MaxLength(200)] string Name,
    [MaxLength(500)] string? LogoUrl
);
