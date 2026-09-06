using Microsoft.EntityFrameworkCore;
using RumboNic.Application.DTOs.Catalogos;
using RumboNic.Application.Interfaces.Catalogos;
using RumboNic.Infrastructure.Persistence;

namespace RumboNic.Infrastructure.Services.Catalogos;

public class CatalogoService : ICatalogoService
{
    private readonly ApplicationDbContext _context;

    public CatalogoService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<DepartamentoDto>> GetDepartamentosAsync(
        CancellationToken cancellationToken = default)
    {
        return await _context.Departamentos
            .AsNoTracking()
            .OrderBy(x => x.Nombre)
            .Select(x => new DepartamentoDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                Codigo = x.Codigo
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<MunicipioDto>> GetMunicipiosAsync(
        short? departamentoId = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Municipios
            .AsNoTracking()
            .AsQueryable();

        if (departamentoId.HasValue)
        {
            query = query.Where(x =>
                x.DepartamentoId == departamentoId.Value);
        }

        return await query
            .OrderBy(x => x.Departamento.Nombre)
            .ThenBy(x => x.Nombre)
            .Select(x => new MunicipioDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                DepartamentoId = x.DepartamentoId,
                Departamento = x.Departamento.Nombre
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<MunicipioDto>> GetMunicipiosByDepartamentoAsync(
        short departamentoId,
        CancellationToken cancellationToken = default)
    {
        return await _context.Municipios
            .AsNoTracking()
            .Where(x =>
                x.DepartamentoId == departamentoId)
            .OrderBy(x => x.Nombre)
            .Select(x => new MunicipioDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                DepartamentoId = x.DepartamentoId,
                Departamento = x.Departamento.Nombre
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<CategoriaLugarDto>> GetCategoriasLugarAsync(
        bool soloActivas = true,
        CancellationToken cancellationToken = default)
    {
        var query = _context.CategoriasLugar
            .AsNoTracking()
            .AsQueryable();

        if (soloActivas)
        {
            query = query.Where(x =>
                x.EstaActiva);
        }

        return await query
            .OrderBy(x => x.Nombre)
            .Select(x => new CategoriaLugarDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                Icono = x.Icono,
                EstaActiva = x.EstaActiva
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> DepartamentoExistsAsync(
    short departamentoId,
    CancellationToken cancellationToken = default)
    {
        return await _context.Departamentos
            .AsNoTracking()
            .AnyAsync(
                x => x.Id == departamentoId,
                cancellationToken);
    }
}