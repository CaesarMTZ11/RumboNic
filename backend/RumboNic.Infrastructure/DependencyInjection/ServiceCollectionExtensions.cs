using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RumboNic.Application.Interfaces.Lugares;
using RumboNic.Infrastructure.Persistence;
using RumboNic.Infrastructure.Services.Lugares;
using RumboNic.Application.Interfaces.Catalogos;
using RumboNic.Infrastructure.Services.Catalogos;

namespace RumboNic.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString =
            configuration.GetConnectionString(
                "DefaultConnection")
            ?? throw new InvalidOperationException(
                "No se encontró la cadena de conexión DefaultConnection.");

        services.AddDbContext<ApplicationDbContext>(
            options =>
                options.UseSqlServer(
                    connectionString));

        services.AddScoped<
            ILugarService,
            LugarService>();

        services.AddScoped<
            ICatalogoService,
            CatalogoService>();

        return services;
    }
}