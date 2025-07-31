using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Interfaces.Strategies;
using ECommerce.Infrastructure.Strategies.Shipping;

namespace ECommerce.Infrastructure.Factories;

public class ShippingStrategyFactory : IShippingStrategyFactory
{
    private readonly Dictionary<string, Func<IShippingStrategy>> _strategies;

    public ShippingStrategyFactory()
    {
        _strategies = new Dictionary<string, Func<IShippingStrategy>>(StringComparer.OrdinalIgnoreCase)
        {
            { "fast", () => new FastShippingStrategy() },
            { "fast shipping", () => new FastShippingStrategy() },
            { "express", () => new FastShippingStrategy() },
            { "standard", () => new StandardShippingStrategy() },
            { "standard shipping", () => new StandardShippingStrategy() },
            { "normal", () => new StandardShippingStrategy() },
            { "economic", () => new EconomicShippingStrategy() },
            { "economic shipping", () => new EconomicShippingStrategy() },
            { "economy", () => new EconomicShippingStrategy() },
            { "slow", () => new EconomicShippingStrategy() }
        };
    }

    public IShippingStrategy CreateShippingStrategy(string shippingMethod)
    {
        if (string.IsNullOrWhiteSpace(shippingMethod))
            throw new ArgumentException("Shipping method cannot be null or empty", nameof(shippingMethod));

        if (_strategies.TryGetValue(shippingMethod, out var strategyFactory))
        {
            return strategyFactory();
        }

        throw new NotSupportedException($"Shipping method '{shippingMethod}' is not supported");
    }

    public IEnumerable<string> GetAvailableShippingMethods(string destination)
    {
        var allMethods = new[] { "Fast Shipping", "Standard Shipping", "Economic Shipping" };
        var availableMethods = new List<string>();

        foreach (var method in allMethods)
        {
            try
            {
                var strategy = CreateShippingStrategy(method);
                if (strategy.IsAvailable(destination))
                {
                    availableMethods.Add(method);
                }
            }
            catch (NotSupportedException)
            {
                // Skip unsupported methods
            }
        }

        return availableMethods;
    }
}