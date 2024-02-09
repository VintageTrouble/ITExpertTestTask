using Infrastructure.EntityFramework;
using Infrastructure.EntityFramework.Abstractions;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationContext>(options => 
            options.UseSqlite(configuration.GetConnectionString("Database")));

        services.AddScoped<IApplicationContext>(sp =>
            sp.GetRequiredService<ApplicationContext>());

        return services;
    }
}
