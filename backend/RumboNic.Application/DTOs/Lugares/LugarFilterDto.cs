namespace RumboNic.Application.DTOs.Lugares;

public class LugarFilterDto
{
    public string? Buscar { get; set; }

    public short? MunicipioId { get; set; }

    public short? CategoriaId { get; set; }

    public bool? SoloLocales { get; set; }

    public bool? SoloSostenibles { get; set; }
}