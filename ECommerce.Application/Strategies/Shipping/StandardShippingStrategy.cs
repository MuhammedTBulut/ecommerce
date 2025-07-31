using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Shipping;

public class StandardShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Standard Shipping";

    public decimal CalculateShippingCost(decimal orderValue, string destination)
    {
        // Standard shipping cost
        var baseCost = 10.00m;
        
        // Free shipping for orders over 100
        if (orderValue >= 100)
            return 0;

        // Additional cost for certain destinations
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            baseCost += 5.00m;

        return baseCost;
    }

    public TimeSpan EstimateDeliveryTime(string destination)
    {
        // Standard shipping: 3-5 days
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            return TimeSpan.FromDays(5);
        
        return TimeSpan.FromDays(3);
    }

    public async Task<ShippingResult> ArrangeShippingAsync(ShippingRequest request)
    {
        // Simulate arranging standard shipping
        await Task.Delay(1000);

        var deliveryTime = EstimateDeliveryTime(request.Address);
        var estimatedDeliveryDate = DateTime.UtcNow.Add(deliveryTime);

        return new ShippingResult
        {
            IsSuccessful = true,
            TrackingNumber = $"STD{DateTime.UtcNow:yyyyMMddHHmmss}",
            Message = "Standard shipping arranged successfully",
            EstimatedDeliveryDate = estimatedDeliveryDate
        };
    }
}