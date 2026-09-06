using Microsoft.EntityFrameworkCore;
using RumboNic.Application.DTOs.Usuarios;
using RumboNic.Application.Interfaces.Usuarios;
using RumboNic.Infrastructure.Persistence;

namespace RumboNic.Infrastructure.Services.Usuarios;

public class UsuarioService : IUsuarioService
{
    private readonly ApplicationDbContext _context;

    public UsuarioService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UsuarioDetailDto?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Usuarios
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new UsuarioDetailDto
            {
                Id = x.Id,

                NombreCompleto =
                    x.NombreCompleto,

                Correo =
                    x.Correo,

                FotoPerfilUrl =
                    x.FotoPerfilUrl,

                MunicipioResidenciaId =
                    x.MunicipioResidenciaId,

                MunicipioResidencia =
                    x.MunicipioResidencia != null
                        ? x.MunicipioResidencia.Nombre
                        : null,

                DepartamentoResidencia =
                    x.MunicipioResidencia != null
                        ? x.MunicipioResidencia
                            .Departamento
                            .Nombre
                        : null,

                FechaRegistro =
                    x.FechaRegistro,

                EstaActivo =
                    x.EstaActivo
            })
            .FirstOrDefaultAsync(
                cancellationToken);
    }

    public async Task<UsuarioUpdateResult> UpdateAsync(
        int id,
        ActualizarUsuarioDto dto,
        CancellationToken cancellationToken = default)
    {
        var usuario =
            await _context.Usuarios
                .FirstOrDefaultAsync(
                    x => x.Id == id,
                    cancellationToken);

        if (usuario is null)
        {
            return new UsuarioUpdateResult
            {
                Status =
                    UsuarioUpdateStatus.UserNotFound
            };
        }

        if (dto.MunicipioResidenciaId.HasValue)
        {
            var municipioExiste =
                await _context.Municipios
                    .AsNoTracking()
                    .AnyAsync(
                        x =>
                            x.Id ==
                            dto.MunicipioResidenciaId.Value,
                        cancellationToken);

            if (!municipioExiste)
            {
                return new UsuarioUpdateResult
                {
                    Status =
                        UsuarioUpdateStatus
                            .MunicipalityNotFound
                };
            }
        }

        usuario.NombreCompleto =
            dto.NombreCompleto.Trim();

        usuario.FotoPerfilUrl =
            string.IsNullOrWhiteSpace(
                dto.FotoPerfilUrl)
                ? null
                : dto.FotoPerfilUrl.Trim();

        usuario.MunicipioResidenciaId =
            dto.MunicipioResidenciaId;

        await _context.SaveChangesAsync(
            cancellationToken);

        var updated =
            await GetByIdAsync(
                id,
                cancellationToken);

        return new UsuarioUpdateResult
        {
            Status =
                UsuarioUpdateStatus.Updated,

            Usuario = updated
        };
    }
}