namespace RumboNic.Application.DTOs.Lugares;

public class LugarListDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public string Municipio { get; set; } = string.Empty;

    public string Departamento { get; set; } = string.Empty;

    public decimal Latitud { get; set; }

    public decimal Longitud { get; set; }

    public bool EsNegocioLocal { get; set; }

    public bool EsSostenible { get; set; }

    public string Estado { get; set; } = string.Empty;

    public string? FotoPortadaUrl { get; set; }

    public List<string> Categorias { get; set; } = [];
}