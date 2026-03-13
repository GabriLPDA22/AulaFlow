using AulaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AulaFlow.Infrastructure.Data.Configurations;

public class KnowledgeSourceConfiguration : IEntityTypeConfiguration<KnowledgeSource>
{
    public void Configure(EntityTypeBuilder<KnowledgeSource> builder)
    {
        builder.HasKey(k => k.Id);
        builder.Property(k => k.Title).IsRequired().HasMaxLength(300);
        builder.Property(k => k.Content).IsRequired();
        builder.Property(k => k.Type).HasConversion<string>();
    }
}
