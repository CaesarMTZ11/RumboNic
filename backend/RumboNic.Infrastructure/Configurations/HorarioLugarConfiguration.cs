using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class HorarioLugarConfiguration
    : IEntityTypeConfiguration<HorarioLugar>
{
    public void Configure(
        EntityTypeBuilder<HorarioLugar> builder)
    {
        builder.ToTable("HorariosLugar");

        builder.HasKey(x => new
        {
            x.LugarId,
            x.DiaSemana
        });

        builder.Property(x => x.DiaSemana)
            .IsRequired();

        builder.Property(x => x.HoraApertura);

        builder.Property(x => x.HoraCierre);

        builder.Property(x => x.EstaCerrado)
            .IsRequired();

        builder.Property(x => x.Abierto24Horas)
            .IsRequired();

        builder.HasOne(x => x.Lugar)
            .WithMany(x => x.Horarios)
            .HasForeignKey(x => x.LugarId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}