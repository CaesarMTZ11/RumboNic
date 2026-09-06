using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class CategoriaLugarConfiguration
    : IEntityTypeConfiguration<CategoriaLugar>
{
    public void Configure(
        EntityTypeBuilder<CategoriaLugar> builder)
    {
        builder.ToTable("CategoriasLugar");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Nombre)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Icono)
            .HasMaxLength(100);

        builder.Property(x => x.EstaActiva)
            .IsRequired();
    }
}