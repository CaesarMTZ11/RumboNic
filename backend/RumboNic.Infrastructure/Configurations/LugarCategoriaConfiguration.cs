using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Configurations;

public class LugarCategoriaConfiguration
    : IEntityTypeConfiguration<LugarCategoria>
{
    public void Configure(
        EntityTypeBuilder<LugarCategoria> builder)
    {
        builder.ToTable("LugaresCategorias");

        builder.HasKey(x => new
        {
            x.LugarId,
            x.CategoriaLugarId,
        });

        builder.HasOne(x => x.Lugar)
            .WithMany(x => x.LugaresCategorias)
            .HasForeignKey(x => x.LugarId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.CategoriaLugar)
            .WithMany(x => x.LugaresCategorias)
            .HasForeignKey(x => x.CategoriaLugarId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}