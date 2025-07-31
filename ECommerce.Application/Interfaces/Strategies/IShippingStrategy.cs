namespace ECommerce.Application.Interfaces.Strategies;

public interface IShippingStrategy
{
    string ShippingMethod { get; }
    decimal CalculateShippingCost(decimal orderValue, string destination);
    TimeSpan EstimateDeliveryTime(string destination);
    Task<ShippingResult> ArrangeShippingAsync(ShippingRequest request);
}

public class ShippingResult
{
    public bool IsSuccessful { get; set; }
    public string TrackingNumber { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime EstimatedDeliveryDate { get; set; }
}

public class ShippingRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public decimal OrderValue { get; set; }
    public double Weight { get; set; }
}