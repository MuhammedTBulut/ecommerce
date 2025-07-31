using ECommerce.Application.Interfaces.Strategies.Shipping;

namespace ECommerce.Infrastructure.Strategies.Shipping;

public class StandardShippingStrategy : IShippingStrategy
{
    public string ShippingMethodName => "Standard Shipping";

    public async Task<ShippingResult> CalculateShippingAsync(ShippingRequest request)
    {
        try
        {
            await Task.Delay(1000); // Simulate API call

            // Standard shipping calculation
            decimal baseCost = 15.00m; // Base shipping cost
            decimal weightCost = request.TotalWeight * 2.5m; // Per kg cost
            decimal valueCost = request.TotalValue * 0.01m; // 1% of order value
            
            decimal totalCost = baseCost + weightCost + valueCost;

            // Different delivery times based on location
            int deliveryDays = request.DestinationCountry.ToUpper() switch
            {
                "TR" => 3, // Turkey domestic
                "DE" or "FR" or "IT" or "ES" => 7, // EU
                _ => 14 // International
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
                ErrorMessage = $"Standard shipping calculation failed: {ex.Message}"
            };
        }
    }

    public async Task<string> CreateShipmentAsync(ShippingRequest request)
    {
        await Task.Delay(2000); // Simulate shipment creation
        return $"STD_{DateTime.UtcNow:yyyyMMdd}_{Guid.NewGuid():N[..8]}";
    }

    public async Task<string> TrackShipmentAsync(string trackingNumber)
    {
        await Task.Delay(500);
        return $"Shipment {trackingNumber} is in transit via standard shipping";
    }
}