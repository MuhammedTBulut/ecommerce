using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class EconomicShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Economic Shipping";
    public int EstimatedDeliveryDays => 7;

    public decimal CalculateShippingCost(decimal orderTotal, string destination)
    {
        // Economic shipping with lowest cost
        decimal baseCost = 8.00m;
        
        // Free shipping for larger orders
        if (orderTotal >= 100m)
        {
            return 0m;
        }
        
        return baseCost;
    }

    public bool IsAvailable(string destination)
    {
        // Economic shipping is available everywhere but takes longer
        return !string.IsNullOrWhiteSpace(destination);
    }
}