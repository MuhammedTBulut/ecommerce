namespace ECommerce.Domain.Interfaces.Strategies;

public interface IPaymentStrategy
{
    string PaymentMethod { get; }
    Task<PaymentResult> ProcessPaymentAsync(decimal amount, string customerInfo);
    bool IsAvailable();
}

public class PaymentResult
{
    public bool IsSuccess { get; set; }
    public string TransactionId { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime ProcessedAt { get; set; }
}