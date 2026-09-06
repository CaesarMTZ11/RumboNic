namespace RumboNic.Application.DTOs.Lugares;

public class HorarioLugarDto
{
    public byte DiaSemana { get; set; }

    public TimeOnly? HoraApertura { get; set; }

    public TimeOnly? HoraCierre { get; set; }

    public bool EstaCerrado { get; set; }

    public bool Abierto24Horas { get; set; }
}