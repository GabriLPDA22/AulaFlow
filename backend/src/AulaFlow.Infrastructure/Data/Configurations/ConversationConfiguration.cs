using AulaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AulaFlow.Infrastructure.Data.Configurations;

public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
{
    public void Configure(EntityTypeBuilder<Conversation> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.VisitorId).IsRequired().HasMaxLength(200);
        builder.Property(c => c.Status).HasConversion<string>();
        builder.Property(c => c.Summary).HasMaxLength(2000);

        builder.HasMany(c => c.Messages)
            .WithOne(m => m.Conversation)
            .HasForeignKey(m => m.ConversationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(c => c.Lead)
            .WithOne(l => l.Conversation)
            .HasForeignKey<Lead>(l => l.ConversationId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
