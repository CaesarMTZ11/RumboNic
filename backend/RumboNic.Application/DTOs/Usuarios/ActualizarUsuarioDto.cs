using System.ComponentModel.DataAnnotations;

namespace RumboNic.Application.DTOs.Usuarios;

public class ActualizarUsuarioDto
{
    [Required]
    [MinLength(3)]
    [MaxLength(120)]
    public string NombreCompleto { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? FotoPerfilUrl { get; set; }

    public short? MunicipioResidenciaId { get; set; }
}