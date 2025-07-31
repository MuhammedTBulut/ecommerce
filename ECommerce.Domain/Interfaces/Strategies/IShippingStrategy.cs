namespace ECommerce.Domain.Interfaces.Strategies;

public interface IShippingStrategy
{
    string ShippingMethod { get; }
    decimal CalculateShippingCost(decimal orderTotal, string destination);
    int EstimatedDeliveryDays { get; }
    bool IsAvailable(string destination);
}

public class ShippingInfo
{
    public string Method { get; set; } = string.Empty;
    public decimal Cost { get; set; }
    public int EstimatedDays { get; set; }
    public DateTime EstimatedDeliveryDate => DateTime.Now.AddDays(EstimatedDays);
}