namespace RumboNic.Domain.Entities;

public class EstadoLugar
{
    public short Id { get; set; }

    public string Codigo { get; set; } = string.Empty;

    public string Nombre { get; set; } = string.Empty;

    public ICollection<Lugar> Lugares { get; set; }
        = new List<Lugar>();
}