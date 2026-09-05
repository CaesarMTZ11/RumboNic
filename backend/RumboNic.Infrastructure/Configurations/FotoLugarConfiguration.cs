using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class FotoLugarConfiguration
    : IEntityTypeConfiguration<FotoLugar>
{
    public void Configure(
        EntityTypeBuilder<FotoLugar> builder)
    {
        builder.ToTable("FotosLugar");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Url)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.TextoAlternativo)
            .HasMaxLength(250);

        builder.Property(x => x.EsPortada)
            .IsRequired();

        builder.Property(x => x.Orden)
            .IsRequired();

        builder.Property(x => x.FechaRegistro)
            .IsRequired();

        builder.HasOne(x => x.Lugar)
            .WithMany(x => x.Fotos)
            .HasForeignKey(x => x.LugarId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new
        {
            x.LugarId,
            x.Orden
        });
    }
}