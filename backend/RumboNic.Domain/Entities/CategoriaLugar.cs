namespace RumboNic.Domain.Entities;

public class CategoriaLugar
{
    public short Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Icono { get; set; }

    public bool EstaActiva { get; set; }

    public ICollection<LugarCategoria> LugaresCategorias { get; set; }
        = new List<LugarCategoria>();
}