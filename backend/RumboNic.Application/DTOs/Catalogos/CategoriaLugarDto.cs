namespace RumboNic.Application.DTOs.Catalogos;

public class CategoriaLugarDto
{
    public short Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Icono { get; set; }

    public bool EstaActiva { get; set; }
}