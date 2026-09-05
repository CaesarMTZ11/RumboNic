namespace RumboNic.Domain.Entities;

public class FotoLugar
{
    public int Id { get; set; }

    public int LugarId { get; set; }

    public string Url { get; set; } = string.Empty;

    public string? TextoAlternativo { get; set; }

    public bool EsPortada { get; set; }

    public short Orden { get; set; }

    public DateTime FechaRegistro { get; set; }

    public Lugar Lugar { get; set; } = null!;
}