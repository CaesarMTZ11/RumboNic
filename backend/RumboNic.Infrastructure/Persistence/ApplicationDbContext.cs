using Microsoft.EntityFrameworkCore;
using RumboNic.Domain.Entities;

namespace RumboNic.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Departamento> Departamentos => Set<Departamento>();

    public DbSet<Municipio> Municipios => Set<Municipio>();

    public DbSet<Moneda> Monedas => Set<Moneda>();

    public DbSet<CategoriaLugar> CategoriasLugar =>
        Set<CategoriaLugar>();

    public DbSet<EstadoLugar> EstadosLugar =>
        Set<EstadoLugar>();

    public DbSet<OrigenLugar> OrigenesLugar =>
        Set<OrigenLugar>();

    public DbSet<Lugar> Lugares => Set<Lugar>();

    public DbSet<Usuario> Usuarios => Set<Usuario>();

    public DbSet<LugarCategoria> LugaresCategorias =>
        Set<LugarCategoria>();

    public DbSet<FotoLugar> FotosLugar =>
        Set<FotoLugar>();

    public DbSet<HorarioLugar> HorariosLugar =>
        Set<HorarioLugar>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly);
    }
}