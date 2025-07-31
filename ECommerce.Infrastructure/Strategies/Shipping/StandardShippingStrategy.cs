using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class StandardShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Standard Shipping";
    public int EstimatedDeliveryDays => 3;

    public decimal CalculateShippingCost(decimal orderTotal, string destination)
    {
        // Standard shipping with moderate cost
        decimal baseCost = 15.00m;
        
        // Free shipping for orders over certain amount
        if (orderTotal >= 200m)
        {
            return 0m;
        }
        
        return baseCost;
    }

    public bool IsAvailable(string destination)
    {
        // Standard shipping is available to most destinations
        return !string.IsNullOrWhiteSpace(destination);
    }
}