namespace RumboNic.Domain.Entities;

public class Usuario
{
    public int Id { get; set; }

    public string NombreCompleto { get; set; } = string.Empty;

    public string Correo { get; set; } = string.Empty;

    public string? FotoPerfilUrl { get; set; }

    public short? MunicipioResidenciaId { get; set; }

    public DateTime FechaRegistro { get; set; }

    public bool EstaActivo { get; set; }

    public Municipio? MunicipioResidencia { get; set; }
}