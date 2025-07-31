using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Shipping;

public class EconomicShippingStrategy : IShippingStrategy
{
    public string ShippingMethod => "Economic Shipping";

    public decimal CalculateShippingCost(decimal orderValue, string destination)
    {
        // Economic shipping cost
        var baseCost = 5.00m;
        
        // Free shipping for orders over 150
        if (orderValue >= 150)
            return 0;

        // Additional cost for certain destinations
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            baseCost += 3.00m;

        return baseCost;
    }

    public TimeSpan EstimateDeliveryTime(string destination)
    {
        // Economic shipping: 7-10 days
        if (destination.ToLower().Contains("rural") || destination.ToLower().Contains("remote"))
            return TimeSpan.FromDays(10);
        
        return TimeSpan.FromDays(7);
    }

    public async Task<ShippingResult> ArrangeShippingAsync(ShippingRequest request)
    {
        // Simulate arranging economic shipping
        await Task.Delay(1200);

        var deliveryTime = EstimateDeliveryTime(request.Address);
        var estimatedDeliveryDate = DateTime.UtcNow.Add(deliveryTime);

        return new ShippingResult
        {
            IsSuccessful = true,
            TrackingNumber = $"ECO{DateTime.UtcNow:yyyyMMddHHmmss}",
            Message = "Economic shipping arranged successfully",
            EstimatedDeliveryDate = estimatedDeliveryDate
        };
    }
}