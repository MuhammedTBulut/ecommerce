using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Shipping;

public class FastShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Fast Shipping";

    public decimal CalculateShippingCost(decimal orderValue, string destination)
    {
        // Fast shipping costs more
        var baseCost = 25.00m;
        
        // Free shipping for orders over 200
        if (orderValue >= 200)
            return 0;

        // Additional cost for certain destinations
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            baseCost += 15.00m;

        return baseCost;
    }

    public TimeSpan EstimateDeliveryTime(string destination)
    {
        // Fast shipping: 1-2 days
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            return TimeSpan.FromDays(2);
        
        return TimeSpan.FromDays(1);
    }

    public async Task<ShippingResult> ArrangeShippingAsync(ShippingRequest request)
    {
        // Simulate arranging fast shipping
        await Task.Delay(800);

        var deliveryTime = EstimateDeliveryTime(request.Address);
        var estimatedDeliveryDate = DateTime.UtcNow.Add(deliveryTime);

        return new ShippingResult
        {
            IsSuccessful = true,
            TrackingNumber = $"FAST{DateTime.UtcNow:yyyyMMddHHmmss}",
            Message = "Fast shipping arranged successfully",
            EstimatedDeliveryDate = estimatedDeliveryDate
        };
    }
}