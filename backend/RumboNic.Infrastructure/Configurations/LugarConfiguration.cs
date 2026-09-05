using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class LugarConfiguration
    : IEntityTypeConfiguration<Lugar>
{
    public void Configure(
        EntityTypeBuilder<Lugar> builder)
    {
        builder.ToTable("Lugares");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Nombre)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(x => x.Descripcion)
            .HasMaxLength(2000);

        builder.Property(x => x.Direccion)
            .HasMaxLength(300);

        builder.Property(x => x.Latitud)
            .HasPrecision(9, 6);

        builder.Property(x => x.Longitud)
            .HasPrecision(9, 6);

        builder.Property(x => x.Telefono)
            .HasMaxLength(30);

        builder.Property(x => x.CorreoContacto)
            .HasMaxLength(320);

        builder.Property(x => x.SitioWeb)
            .HasMaxLength(500);

        builder.Property(x => x.PrecioMinimo)
            .HasPrecision(12, 2);

        builder.Property(x => x.PrecioMaximo)
            .HasPrecision(12, 2);

        builder.HasOne(x => x.Municipio)
            .WithMany(x => x.Lugares)
            .HasForeignKey(x => x.MunicipioId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.Moneda)
            .WithMany(x => x.Lugares)
            .HasForeignKey(x => x.MonedaId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.EstadoLugar)
            .WithMany(x => x.Lugares)
            .HasForeignKey(x => x.EstadoLugarId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.OrigenLugar)
            .WithMany(x => x.Lugares)
            .HasForeignKey(x => x.OrigenLugarId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}