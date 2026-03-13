using AulaFlow.Domain.Common;
using AulaFlow.Domain.Enums;

namespace AulaFlow.Domain.Entities;

public class KnowledgeSource : BaseEntity
{
    public Guid BusinessId { get; set; }
    public KnowledgeType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public Business Business { get; set; } = null!;
}
