namespace RumboNic.Domain.Entities;

public class Municipio
{
    public short Id { get; set; }

    public short DepartamentoId { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public Departamento Departamento { get; set; } = null!;

    public ICollection<Lugar> Lugares { get; set; }
        = new List<Lugar>();
}