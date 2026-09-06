namespace RumboNic.Application.DTOs.Lugares;

public class LugarDetailDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public string Municipio { get; set; } = string.Empty;

    public string Departamento { get; set; } = string.Empty;

    public string? Direccion { get; set; }

    public decimal Latitud { get; set; }

    public decimal Longitud { get; set; }

    public string? Telefono { get; set; }

    public string? CorreoContacto { get; set; }

    public string? SitioWeb { get; set; }

    public decimal? PrecioMinimo { get; set; }

    public decimal? PrecioMaximo { get; set; }

    public string? MonedaCodigo { get; set; }

    public bool EsNegocioLocal { get; set; }

    public bool EsSostenible { get; set; }

    public string Estado { get; set; } = string.Empty;

    public string Origen { get; set; } = string.Empty;

    public DateTime FechaCreacion { get; set; }

    public List<LugarCategoriaDto> Categorias { get; set; } = [];

    public List<FotoLugarDto> Fotos { get; set; } = [];

    public List<HorarioLugarDto> Horarios { get; set; } = [];
}