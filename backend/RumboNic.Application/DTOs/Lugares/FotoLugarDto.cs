namespace RumboNic.Application.DTOs.Lugares;

public class FotoLugarDto
{
    public int Id { get; set; }

    public string Url { get; set; } = string.Empty;

    public string? TextoAlternativo { get; set; }

    public bool EsPortada { get; set; }

    public short Orden { get; set; }
}