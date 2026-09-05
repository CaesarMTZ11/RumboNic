namespace RumboNic.Domain.Entities;

public class Moneda
{
    public short Id { get; set; }

    public string CodigoISO { get; set; } = string.Empty;

    public string Nombre { get; set; } = string.Empty;

    public string Simbolo { get; set; } = string.Empty;

    public ICollection<Lugar> Lugares { get; set; }
        = new List<Lugar>();
}