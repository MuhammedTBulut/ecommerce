namespace ECommerce.Application.Interfaces.Strategies.Shipping;

public class ShippingRequest
{
    public string DestinationAddress { get; set; } = string.Empty;
    public string DestinationCity { get; set; } = string.Empty;
    public string DestinationCountry { get; set; } = string.Empty;
    public decimal TotalWeight { get; set; }
    public decimal TotalValue { get; set; }
    public bool IsExpress { get; set; }
}

public class ShippingResult
{
    public decimal Cost { get; set; }
    public int EstimatedDeliveryDays { get; set; }
    public string TrackingNumber { get; set; } = string.Empty;
    public string ShippingMethod { get; set; } = string.Empty;
    public bool IsSuccess { get; set; }
    public string ErrorMessage { get; set; } = string.Empty;
}

public interface IShippingStrategy
{
    string ShippingMethodName { get; }
    Task<ShippingResult> CalculateShippingAsync(ShippingRequest request);
    Task<string> CreateShipmentAsync(ShippingRequest request);
    Task<string> TrackShipmentAsync(string trackingNumber);
}