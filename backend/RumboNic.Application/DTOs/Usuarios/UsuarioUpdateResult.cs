namespace RumboNic.Application.DTOs.Usuarios;

public enum UsuarioUpdateStatus
{
    Updated,
    UserNotFound,
    MunicipalityNotFound
}

public class UsuarioUpdateResult
{
    public UsuarioUpdateStatus Status { get; set; }

    public UsuarioDetailDto? Usuario { get; set; }
}