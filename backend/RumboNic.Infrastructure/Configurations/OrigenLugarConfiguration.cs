using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class OrigenLugarConfiguration
    : IEntityTypeConfiguration<OrigenLugar>
{
    public void Configure(
        EntityTypeBuilder<OrigenLugar> builder)
    {
        builder.ToTable("OrigenesLugar");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Codigo)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.Nombre)
            .HasMaxLength(80)
            .IsRequired();

        builder.Property(x => x.Descripcion)
            .HasMaxLength(500);

        builder.HasIndex(x => x.Codigo)
            .IsUnique();
    }
}