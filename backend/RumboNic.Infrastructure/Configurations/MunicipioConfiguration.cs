using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class MunicipioConfiguration
    : IEntityTypeConfiguration<Municipio>
{
    public void Configure(
        EntityTypeBuilder<Municipio> builder)
    {
        builder.ToTable("Municipios");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Nombre)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasOne(x => x.Departamento)
            .WithMany(x => x.Municipios)
            .HasForeignKey(x => x.DepartamentoId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasIndex(x => new
        {
            x.DepartamentoId,
            x.Nombre,
        }).IsUnique();
    }
}