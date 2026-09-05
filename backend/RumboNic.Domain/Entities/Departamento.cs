namespace RumboNic.Domain.Entities;

public class Departamento
{
    public short Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Codigo { get; set; } = string.Empty;

    public ICollection<Municipio> Municipios { get; set; }
        = new List<Municipio>();
}