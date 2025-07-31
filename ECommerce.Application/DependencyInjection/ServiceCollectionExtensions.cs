using Microsoft.Extensions.DependencyInjection;
using ECommerce.Domain.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Application.Interfaces.Strategies;
using ECommerce.Application.Interfaces.Factories;
using ECommerce.Application.Services.Implementations;
using ECommerce.Application.Strategies.Payment;
using ECommerce.Application.Strategies.Shipping;
using ECommerce.Application.Factories;

namespace ECommerce.Application.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register Services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();

        // Register Factories
        services.AddScoped<IUserFactory, UserFactory>();
        services.AddScoped<IProductFactory, ProductFactory>();

        // Register Payment Strategies
        services.AddScoped<IPaymentStrategy, CreditCardPaymentStrategy>();
        services.AddScoped<IPaymentStrategy, BankTransferPaymentStrategy>();
        services.AddScoped<IPaymentStrategy, CashOnDeliveryPaymentStrategy>();

        // Register Shipping Strategies
        services.AddScoped<IShippingStrategy, FastShippingStrategy>();
        services.AddScoped<IShippingStrategy, StandardShippingStrategy>();
        services.AddScoped<IShippingStrategy, EconomicShippingStrategy>();

        return services;
    }

    public static IServiceCollection AddPaymentStrategy<T>(this IServiceCollection services) 
        where T : class, IPaymentStrategy
    {
        services.AddScoped<IPaymentStrategy, T>();
        return services;
    }

    public static IServiceCollection AddShippingStrategy<T>(this IServiceCollection services) 
        where T : class, IShippingStrategy
    {
        services.AddScoped<IShippingStrategy, T>();
        return services;
    }
}