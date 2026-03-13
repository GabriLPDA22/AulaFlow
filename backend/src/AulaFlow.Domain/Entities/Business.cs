using AulaFlow.Domain.Common;

namespace AulaFlow.Domain.Entities;

public class Business : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public Guid BusinessToken { get; set; } = Guid.NewGuid();

    public ICollection<User> Users { get; set; } = [];
    public ICollection<KnowledgeSource> KnowledgeSources { get; set; } = [];
    public ICollection<Conversation> Conversations { get; set; } = [];
    public ICollection<Lead> Leads { get; set; } = [];
    public AssistantSettings? AssistantSettings { get; set; }
}
