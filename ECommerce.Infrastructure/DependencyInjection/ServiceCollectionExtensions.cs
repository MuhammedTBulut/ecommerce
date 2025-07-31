using Microsoft.Extensions.DependencyInjection;
using ECommerce.Domain.Interfaces.Repositories;
using ECommerce.Application.Services.Interfaces;
using ECommerce.Infrastructure.Repositories;
using ECommerce.Infrastructure.Services;

namespace ECommerce.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        // Register Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        // Register Infrastructure Services
        services.AddScoped<IActionLogger, ActionLoggerService>();

        return services;
    }
}