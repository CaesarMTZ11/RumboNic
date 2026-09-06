using Microsoft.AspNetCore.Mvc;
using RumboNic.Application.DTOs.Usuarios;
using RumboNic.Application.Interfaces.Usuarios;

namespace RumboNic.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuariosController(
        IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(
        typeof(UsuarioDetailDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<
        UsuarioDetailDto>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var usuario =
            await _usuarioService
                .GetByIdAsync(
                    id,
                    cancellationToken);

        if (usuario is null)
        {
            return NotFound(new
            {
                message =
                    $"No se encontró el usuario con id {id}."
            });
        }

        return Ok(usuario);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(
        typeof(UsuarioDetailDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<
        UsuarioDetailDto>> Update(
        int id,
        [FromBody] ActualizarUsuarioDto dto,
        CancellationToken cancellationToken)
    {
        var result =
            await _usuarioService
                .UpdateAsync(
                    id,
                    dto,
                    cancellationToken);

        switch (result.Status)
        {
            case UsuarioUpdateStatus
                .UserNotFound:

                return NotFound(new
                {
                    message =
                        $"No se encontró el usuario con id {id}."
                });

            case UsuarioUpdateStatus
                .MunicipalityNotFound:

                return BadRequest(new
                {
                    message =
                        "El municipio seleccionado no existe."
                });

            case UsuarioUpdateStatus
                .Updated:

                return Ok(result.Usuario);

            default:

                return StatusCode(
                    StatusCodes
                        .Status500InternalServerError);
        }
    }
}