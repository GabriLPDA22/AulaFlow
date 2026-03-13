using AulaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AulaFlow.Infrastructure.Data.Configurations;

public class AssistantSettingsConfiguration : IEntityTypeConfiguration<AssistantSettings>
{
    public void Configure(EntityTypeBuilder<AssistantSettings> builder)
    {
        builder.HasKey(a => a.Id);
        builder.HasIndex(a => a.BusinessId).IsUnique();
        builder.Property(a => a.AssistantName).IsRequired().HasMaxLength(100);
        builder.Property(a => a.WelcomeMessage).IsRequired().HasMaxLength(500);
        builder.Property(a => a.Personality).HasMaxLength(1000);
        builder.Property(a => a.LeadCapturePrompt).HasMaxLength(500);
        builder.Property(a => a.PrimaryColor).HasMaxLength(20);
        builder.Property(a => a.AvatarUrl).HasMaxLength(500);
    }
}
