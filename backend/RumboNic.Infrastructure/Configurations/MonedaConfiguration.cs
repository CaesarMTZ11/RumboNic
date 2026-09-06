using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class MonedaConfiguration
    : IEntityTypeConfiguration<Moneda>
{
    public void Configure(
        EntityTypeBuilder<Moneda> builder)
    {
        builder.ToTable("Monedas");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.CodigoISO)
            .HasMaxLength(3)
            .IsRequired();

        builder.Property(x => x.Nombre)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Simbolo)
            .HasMaxLength(10)
            .IsRequired();

        builder.HasIndex(x => x.CodigoISO)
            .IsUnique();
    }
}