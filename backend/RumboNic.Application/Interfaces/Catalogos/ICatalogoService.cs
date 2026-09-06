using RumboNic.Application.DTOs.Catalogos;

namespace RumboNic.Application.Interfaces.Catalogos;

public interface ICatalogoService
{
    Task<IReadOnlyList<DepartamentoDto>> GetDepartamentosAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<MunicipioDto>> GetMunicipiosAsync(
        short? departamentoId = null,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<MunicipioDto>> GetMunicipiosByDepartamentoAsync(
        short departamentoId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<CategoriaLugarDto>> GetCategoriasLugarAsync(
        bool soloActivas = true,
        CancellationToken cancellationToken = default);

    Task<bool> DepartamentoExistsAsync(
        short departamentoId,
        CancellationToken cancellationToken = default);
}