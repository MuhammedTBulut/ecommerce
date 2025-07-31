using ECommerce.Application.Interfaces.Strategies.Shipping;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class ExpressShippingStrategy : IShippingStrategy
{
    public string ShippingMethodName => "Express Shipping";

    public async Task<ShippingResult> CalculateShippingAsync(ShippingRequest request)
    {
        try
        {
            await Task.Delay(1000); // Simulate API call

            // Express shipping calculation (higher cost, faster delivery)
            decimal baseCost = 35.00m; // Higher base cost
            decimal weightCost = request.TotalWeight * 4.0m; // Higher per kg cost
            decimal valueCost = request.TotalValue * 0.015m; // 1.5% of order value
            decimal expressPremium = 20.00m; // Express premium
            
            decimal totalCost = baseCost + weightCost + valueCost + expressPremium;

            // Faster delivery times
            int deliveryDays = request.DestinationCountry.ToUpper() switch
            {
                "TR" => 1, // Next day for Turkey
                "DE" or "FR" or "IT" or "ES" => 3, // 3 days for EU
                _ => 7 // 1 week international
            };

            return new ShippingResult
            {
                Cost = Math.Round(totalCost, 2),
                EstimatedDeliveryDays = deliveryDays,
                ShippingMethod = ShippingMethodName,
                IsSuccess = true
            };
        }
        catch (Exception ex)
        {
            return new ShippingResult
            {
                IsSuccess = false,
                ErrorMessage = $"Express shipping calculation failed: {ex.Message}"
            };
        }
    }

    public async Task<string> CreateShipmentAsync(ShippingRequest request)
    {
        await Task.Delay(1500); // Faster processing
        return $"EXP_{DateTime.UtcNow:yyyyMMdd}_{Guid.NewGuid():N[..8]}";
    }

    public async Task<string> TrackShipmentAsync(string trackingNumber)
    {
        await Task.Delay(300);
        return $"Express shipment {trackingNumber} is being processed with priority handling";
    }
}