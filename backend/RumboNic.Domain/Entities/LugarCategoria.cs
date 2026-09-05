namespace RumboNic.Domain.Entities;

public class LugarCategoria
{
    public int LugarId { get; set; }

    public short CategoriaLugarId { get; set; }

    public Lugar Lugar { get; set; } = null!;

    public CategoriaLugar CategoriaLugar { get; set; } = null!;
}