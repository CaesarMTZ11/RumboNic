using Microsoft.EntityFrameworkCore;
using RumboNic.Application.DTOs.Lugares;
using RumboNic.Application.Interfaces.Lugares;
using RumboNic.Infrastructure.Persistence;

namespace RumboNic.Infrastructure.Services.Lugares;

public class LugarService : ILugarService
{
    private readonly ApplicationDbContext _context;

    public LugarService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<LugarListDto>> GetAllAsync(
        LugarFilterDto filter,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Lugares
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.Buscar))
        {
            var search = filter.Buscar.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(search) ||
                (x.Descripcion != null &&
                 x.Descripcion.Contains(search)) ||
                x.Municipio.Nombre.Contains(search) ||
                x.Municipio.Departamento.Nombre.Contains(search));
        }

        if (filter.MunicipioId.HasValue)
        {
            query = query.Where(x =>
                x.MunicipioId == filter.MunicipioId.Value);
        }

        if (filter.CategoriaId.HasValue)
        {
            query = query.Where(x =>
                x.LugaresCategorias.Any(lc =>
                    lc.CategoriaLugarId ==
                    filter.CategoriaId.Value));
        }

        if (filter.SoloLocales == true)
        {
            query = query.Where(x =>
                x.EsNegocioLocal);
        }

        if (filter.SoloSostenibles == true)
        {
            query = query.Where(x =>
                x.EsSostenible);
        }

        var lugares = await query
            .OrderBy(x => x.Nombre)
            .Select(x => new LugarListDto
            {
                Id = x.Id,

                Nombre = x.Nombre,

                Descripcion = x.Descripcion,

                Municipio = x.Municipio.Nombre,

                Departamento =
                    x.Municipio.Departamento.Nombre,

                Latitud = x.Latitud,

                Longitud = x.Longitud,

                EsNegocioLocal =
                    x.EsNegocioLocal,

                EsSostenible =
                    x.EsSostenible,

                Estado =
                    x.EstadoLugar.Nombre,

                FotoPortadaUrl =
                    x.Fotos
                        .Where(f => f.EsPortada)
                        .OrderBy(f => f.Orden)
                        .Select(f => f.Url)
                        .FirstOrDefault()
                    ??
                    x.Fotos
                        .OrderBy(f => f.Orden)
                        .Select(f => f.Url)
                        .FirstOrDefault(),

                Categorias =
                    x.LugaresCategorias
                        .Select(lc =>
                            lc.CategoriaLugar.Nombre)
                        .ToList()
            })
            .ToListAsync(
                cancellationToken);

        return lugares;
    }

    public async Task<LugarDetailDto?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Lugares
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new LugarDetailDto
            {
                Id = x.Id,

                Nombre = x.Nombre,

                Descripcion =
                    x.Descripcion,

                Municipio =
                    x.Municipio.Nombre,

                Departamento =
                    x.Municipio
                        .Departamento
                        .Nombre,

                Direccion =
                    x.Direccion,

                Latitud =
                    x.Latitud,

                Longitud =
                    x.Longitud,

                Telefono =
                    x.Telefono,

                CorreoContacto =
                    x.CorreoContacto,

                SitioWeb =
                    x.SitioWeb,

                PrecioMinimo =
                    x.PrecioMinimo,

                PrecioMaximo =
                    x.PrecioMaximo,

                MonedaCodigo =
                    x.Moneda != null
                        ? x.Moneda.CodigoISO
                        : null,

                EsNegocioLocal =
                    x.EsNegocioLocal,

                EsSostenible =
                    x.EsSostenible,

                Estado =
                    x.EstadoLugar.Nombre,

                Origen =
                    x.OrigenLugar.Nombre,

                FechaCreacion =
                    x.FechaCreacion,

                Categorias =
                    x.LugaresCategorias
                        .OrderBy(lc =>
                            lc.CategoriaLugar.Nombre)
                        .Select(lc =>
                            new LugarCategoriaDto
                            {
                                Id =
                                    lc.CategoriaLugar.Id,

                                Nombre =
                                    lc.CategoriaLugar.Nombre,

                                Icono =
                                    lc.CategoriaLugar.Icono
                            })
                        .ToList(),

                Fotos =
                    x.Fotos
                        .OrderByDescending(f =>
                            f.EsPortada)
                        .ThenBy(f => f.Orden)
                        .Select(f =>
                            new FotoLugarDto
                            {
                                Id = f.Id,

                                Url = f.Url,

                                TextoAlternativo =
                                    f.TextoAlternativo,

                                EsPortada =
                                    f.EsPortada,

                                Orden =
                                    f.Orden
                            })
                        .ToList(),

                Horarios =
                    x.Horarios
                        .OrderBy(h =>
                            h.DiaSemana)
                        .Select(h =>
                            new HorarioLugarDto
                            {
                                DiaSemana =
                                    h.DiaSemana,

                                HoraApertura =
                                    h.HoraApertura,

                                HoraCierre =
                                    h.HoraCierre,

                                EstaCerrado =
                                    h.EstaCerrado,

                                Abierto24Horas =
                                    h.Abierto24Horas
                            })
                        .ToList()
            })
            .FirstOrDefaultAsync(
                cancellationToken);
    }
}