using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class DepartamentoConfiguration
    : IEntityTypeConfiguration<Departamento>
{
    public void Configure(
        EntityTypeBuilder<Departamento> builder)
    {
        builder.ToTable("Departamentos");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Nombre)
            .HasMaxLength(80)
            .IsRequired();

        builder.Property(x => x.Codigo)
            .HasMaxLength(10)
            .IsUnicode(false)
            .IsRequired();

        builder.HasIndex(x => x.Nombre)
            .IsUnique();

        builder.HasIndex(x => x.Codigo)
            .IsUnique();
    }
}