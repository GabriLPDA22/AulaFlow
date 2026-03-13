using System.ComponentModel.DataAnnotations;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Application.Knowledge;

public record KnowledgeSourceDto(
    Guid Id,
    Guid BusinessId,
    KnowledgeType Type,
    string Title,
    string Content,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateKnowledgeSourceRequest(
    [Required, MaxLength(300)] string Title,
    [Required] KnowledgeType Type,
    [Required] string Content
);

public record UpdateKnowledgeSourceRequest(
    [Required, MaxLength(300)] string Title,
    [Required] KnowledgeType Type,
    [Required] string Content
);
