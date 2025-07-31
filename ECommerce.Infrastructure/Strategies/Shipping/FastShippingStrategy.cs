using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class FastShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Fast Shipping";
    public int EstimatedDeliveryDays => 1;

    public decimal CalculateShippingCost(decimal orderTotal, string destination)
    {
        // Fast shipping has higher cost
        decimal baseCost = 25.00m;
        
        // Add premium for same-day or next-day delivery
        decimal premiumCost = orderTotal * 0.15m;
        
        return baseCost + premiumCost;
    }

    public bool IsAvailable(string destination)
    {
        // Fast shipping might not be available to all destinations
        var supportedCities = new[] { "istanbul", "ankara", "izmir", "bursa", "antalya" };
        return supportedCities.Contains(destination.ToLowerInvariant());
    }
}