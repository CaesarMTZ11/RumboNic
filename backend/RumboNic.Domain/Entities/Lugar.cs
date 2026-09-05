namespace RumboNic.Domain.Entities;

public class Lugar
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public short MunicipioId { get; set; }

    public string? Direccion { get; set; }

    public decimal Latitud { get; set; }

    public decimal Longitud { get; set; }

    public string? Telefono { get; set; }

    public string? CorreoContacto { get; set; }

    public string? SitioWeb { get; set; }

    public decimal? PrecioMinimo { get; set; }

    public decimal? PrecioMaximo { get; set; }

    public short? MonedaId { get; set; }

    public bool EsNegocioLocal { get; set; }

    public bool EsSostenible { get; set; }

    public short EstadoLugarId { get; set; }

    public short OrigenLugarId { get; set; }

    public int? CreadoPorUsuarioId { get; set; }

    public int? ValidadoPorUsuarioId { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaValidacion { get; set; }

    public Municipio Municipio { get; set; } = null!;

    public Moneda? Moneda { get; set; }

    public EstadoLugar EstadoLugar { get; set; } = null!;

    public OrigenLugar OrigenLugar { get; set; } = null!;

    public ICollection<LugarCategoria> LugaresCategorias { get; set; }
        = new List<LugarCategoria>();

    public ICollection<FotoLugar> Fotos { get; set; }
        = new List<FotoLugar>();

    public ICollection<HorarioLugar> Horarios { get; set; }
        = new List<HorarioLugar>();
}