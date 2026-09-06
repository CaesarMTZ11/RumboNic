namespace RumboNic.Application.DTOs.Usuarios;

public class UsuarioDetailDto
{
    public int Id { get; set; }

    public string NombreCompleto { get; set; } = string.Empty;

    public string Correo { get; set; } = string.Empty;

    public string? FotoPerfilUrl { get; set; }

    public short? MunicipioResidenciaId { get; set; }

    public string? MunicipioResidencia { get; set; }

    public string? DepartamentoResidencia { get; set; }

    public DateTime FechaRegistro { get; set; }

    public bool EstaActivo { get; set; }
}