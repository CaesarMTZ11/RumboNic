namespace RumboNic.Domain.Entities;

public class HorarioLugar
{
    public int LugarId { get; set; }

    public byte DiaSemana { get; set; }

    public TimeOnly? HoraApertura { get; set; }

    public TimeOnly? HoraCierre { get; set; }

    public bool EstaCerrado { get; set; }

    public bool Abierto24Horas { get; set; }

    public Lugar Lugar { get; set; } = null!;
}