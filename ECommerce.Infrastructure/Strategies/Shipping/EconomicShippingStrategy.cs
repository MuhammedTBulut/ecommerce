using ECommerce.Application.Interfaces.Strategies.Shipping;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class EconomicShippingStrategy : IShippingStrategy
{
    public string ShippingMethodName => "Economic Shipping";

    public async Task<ShippingResult> CalculateShippingAsync(ShippingRequest request)
    {
        try
        {
            await Task.Delay(1200); // Simulate API call

            // Economic shipping calculation (lowest cost, slower delivery)
            decimal baseCost = 8.00m; // Lower base cost
            decimal weightCost = request.TotalWeight * 1.5m; // Lower per kg cost
            decimal valueCost = request.TotalValue * 0.005m; // 0.5% of order value
            
            decimal totalCost = baseCost + weightCost + valueCost;

            // Slower delivery times for lower cost
            int deliveryDays = request.DestinationCountry.ToUpper() switch
            {
                "TR" => 5, // 5 days for Turkey
                "DE" or "FR" or "IT" or "ES" => 14, // 2 weeks for EU
                _ => 21 // 3 weeks international
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
                ErrorMessage = $"Economic shipping calculation failed: {ex.Message}"
            };
        }
    }

    public async Task<string> CreateShipmentAsync(ShippingRequest request)
    {
        await Task.Delay(3000); // Slower processing for economic option
        return $"ECO_{DateTime.UtcNow:yyyyMMdd}_{Guid.NewGuid():N[..8]}";
    }

    public async Task<string> TrackShipmentAsync(string trackingNumber)
    {
        await Task.Delay(700);
        return $"Economic shipment {trackingNumber} is in queue for processing";
    }
}