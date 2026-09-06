using Microsoft.AspNetCore.Mvc;
using RumboNic.Application.DTOs.Catalogos;
using RumboNic.Application.Interfaces.Catalogos;

namespace RumboNic.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogosController : ControllerBase
{
    private readonly ICatalogoService _catalogoService;

    public CatalogosController(
        ICatalogoService catalogoService)
    {
        _catalogoService = catalogoService;
    }

    [HttpGet("departamentos")]
    [ProducesResponseType(
        typeof(IReadOnlyList<DepartamentoDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<
        IReadOnlyList<DepartamentoDto>>> GetDepartamentos(
        CancellationToken cancellationToken)
    {
        var departamentos =
            await _catalogoService
                .GetDepartamentosAsync(
                    cancellationToken);

        return Ok(departamentos);
    }

    [HttpGet("municipios")]
    [ProducesResponseType(
        typeof(IReadOnlyList<MunicipioDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<
        IReadOnlyList<MunicipioDto>>> GetMunicipios(
        [FromQuery] short? departamentoId,
        CancellationToken cancellationToken)
    {
        var municipios =
            await _catalogoService
                .GetMunicipiosAsync(
                    departamentoId,
                    cancellationToken);

        return Ok(municipios);
    }

    [HttpGet("departamentos/{departamentoId:int}/municipios")]
[ProducesResponseType(
    typeof(IReadOnlyList<MunicipioDto>),
    StatusCodes.Status200OK)]
[ProducesResponseType(
    StatusCodes.Status400BadRequest)]
[ProducesResponseType(
    StatusCodes.Status404NotFound)]
public async Task<ActionResult<
    IReadOnlyList<MunicipioDto>>> GetMunicipiosByDepartamento(
    int departamentoId,
    CancellationToken cancellationToken)
{
    if (
        departamentoId <= 0 ||
        departamentoId > short.MaxValue)
    {
        return BadRequest(new
        {
            message =
                "El identificador del departamento no es válido."
        });
    }

    var id = (short)departamentoId;

    var exists =
        await _catalogoService
            .DepartamentoExistsAsync(
                id,
                cancellationToken);

    if (!exists)
    {
        return NotFound(new
        {
            message =
                $"No se encontró el departamento con id {id}."
        });
    }

    var municipios =
        await _catalogoService
            .GetMunicipiosByDepartamentoAsync(
                id,
                cancellationToken);

    return Ok(municipios);
}

    [HttpGet("categorias-lugar")]
    [ProducesResponseType(
        typeof(IReadOnlyList<CategoriaLugarDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<
        IReadOnlyList<CategoriaLugarDto>>> GetCategoriasLugar(
        [FromQuery] bool soloActivas = true,
        CancellationToken cancellationToken = default)
    {
        var categorias =
            await _catalogoService
                .GetCategoriasLugarAsync(
                    soloActivas,
                    cancellationToken);

        return Ok(categorias);
    }
}