using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class EstadoLugarConfiguration
    : IEntityTypeConfiguration<EstadoLugar>
{
    public void Configure(
        EntityTypeBuilder<EstadoLugar> builder)
    {
        builder.ToTable("EstadosLugar");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Codigo)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.Nombre)
            .HasMaxLength(80)
            .IsRequired();

        builder.HasIndex(x => x.Codigo)
            .IsUnique();
    }
}