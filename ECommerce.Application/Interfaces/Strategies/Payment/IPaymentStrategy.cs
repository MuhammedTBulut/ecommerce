namespace ECommerce.Application.Interfaces.Strategies.Payment;

public class PaymentRequest
{
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "TRY";
    public Dictionary<string, object> PaymentDetails { get; set; } = new();
}

public class PaymentResult
{
    public bool IsSuccess { get; set; }
    public string TransactionId { get; set; } = string.Empty;
    public string ErrorMessage { get; set; } = string.Empty;
    public DateTime ProcessedAt { get; set; } = DateTime.UtcNow;
}

public interface IPaymentStrategy
{
    string PaymentMethodName { get; }
    Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request);
    Task<bool> VerifyPaymentAsync(string transactionId);
    Task<PaymentResult> RefundPaymentAsync(string transactionId, decimal amount);
}