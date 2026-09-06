using Microsoft.AspNetCore.Mvc;
using RumboNic.Application.DTOs.Lugares;
using RumboNic.Application.Interfaces.Lugares;

namespace RumboNic.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LugaresController : ControllerBase
{
    private readonly ILugarService _lugarService;

    public LugaresController(
        ILugarService lugarService)
    {
        _lugarService = lugarService;
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(IReadOnlyList<LugarListDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<
        IReadOnlyList<LugarListDto>>> GetAll(
        [FromQuery] LugarFilterDto filter,
        CancellationToken cancellationToken)
    {
        var lugares =
            await _lugarService.GetAllAsync(
                filter,
                cancellationToken);

        return Ok(lugares);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(
        typeof(LugarDetailDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<
        LugarDetailDto>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var lugar =
            await _lugarService.GetByIdAsync(
                id,
                cancellationToken);

        if (lugar is null)
        {
            return NotFound(new
            {
                message =
                    $"No se encontró el lugar con id {id}."
            });
        }

        return Ok(lugar);
    }
}