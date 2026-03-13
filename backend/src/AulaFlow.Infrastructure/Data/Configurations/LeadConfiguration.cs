using AulaFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AulaFlow.Infrastructure.Data.Configurations;

public class LeadConfiguration : IEntityTypeConfiguration<Lead>
{
    public void Configure(EntityTypeBuilder<Lead> builder)
    {
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Name).IsRequired().HasMaxLength(200);
        builder.Property(l => l.Email).IsRequired().HasMaxLength(300);
        builder.Property(l => l.Phone).HasMaxLength(50);
        builder.Property(l => l.Notes).HasMaxLength(2000);
        builder.Property(l => l.Status).HasConversion<string>();
    }
}
