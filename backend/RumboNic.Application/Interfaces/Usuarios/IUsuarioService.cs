using RumboNic.Application.DTOs.Usuarios;

namespace RumboNic.Application.Interfaces.Usuarios;

public interface IUsuarioService
{
    Task<UsuarioDetailDto?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);

    Task<UsuarioUpdateResult> UpdateAsync(
        int id,
        ActualizarUsuarioDto dto,
        CancellationToken cancellationToken = default);
}