using AulaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AulaFlow.Infrastructure.Data.Configurations;

public class BusinessConfiguration : IEntityTypeConfiguration<Business>
{
    public void Configure(EntityTypeBuilder<Business> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Name).IsRequired().HasMaxLength(200);
        builder.Property(b => b.Slug).IsRequired().HasMaxLength(100);
        builder.HasIndex(b => b.Slug).IsUnique();
        builder.HasIndex(b => b.BusinessToken).IsUnique();
        builder.Property(b => b.LogoUrl).HasMaxLength(500);

        builder.HasMany(b => b.Users)
            .WithOne(u => u.Business)
            .HasForeignKey(u => u.BusinessId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(b => b.KnowledgeSources)
            .WithOne(k => k.Business)
            .HasForeignKey(k => k.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(b => b.Conversations)
            .WithOne(c => c.Business)
            .HasForeignKey(c => c.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(b => b.Leads)
            .WithOne(l => l.Business)
            .HasForeignKey(l => l.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(b => b.AssistantSettings)
            .WithOne(a => a.Business)
            .HasForeignKey<AssistantSettings>(a => a.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
