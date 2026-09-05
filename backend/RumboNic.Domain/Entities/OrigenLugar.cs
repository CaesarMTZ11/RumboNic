namespace RumboNic.Domain.Entities;

public class OrigenLugar
{
    public short Id { get; set; }

    public string Codigo { get; set; } = string.Empty;

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public ICollection<Lugar> Lugares { get; set; }
        = new List<Lugar>();
}