namespace RumboNic.Application.DTOs.Catalogos;

public class MunicipioDto
{
    public short Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public short DepartamentoId { get; set; }

    public string Departamento { get; set; } = string.Empty;
}