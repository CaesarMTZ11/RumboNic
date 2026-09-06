using RumboNic.Application.DTOs.Lugares;

namespace RumboNic.Application.Interfaces.Lugares;

public interface ILugarService
{
    Task<IReadOnlyList<LugarListDto>> GetAllAsync(
        LugarFilterDto filter,
        CancellationToken cancellationToken = default);

    Task<LugarDetailDto?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);
}