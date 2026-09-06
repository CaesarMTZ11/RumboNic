using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class UsuarioConfiguration
    : IEntityTypeConfiguration<Usuario>
{
    public void Configure(
        EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuarios");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.NombreCompleto)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.Correo)
            .HasMaxLength(320)
            .IsRequired();

        builder.Property(x => x.FotoPerfilUrl)
            .HasMaxLength(500);

        builder.Property(x => x.FechaRegistro)
            .IsRequired();

        builder.Property(x => x.EstaActivo)
            .IsRequired();

        builder.HasIndex(x => x.Correo)
            .IsUnique();

        builder.HasOne(x => x.MunicipioResidencia)
            .WithMany()
            .HasForeignKey(x => x.MunicipioResidenciaId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}