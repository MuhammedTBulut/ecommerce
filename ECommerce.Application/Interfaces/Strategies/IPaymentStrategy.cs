namespace ECommerce.Application.Interfaces.Strategies;

public interface IPaymentStrategy
{
    string PaymentMethod { get; }
    Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails details);
    Task<bool> ValidatePaymentDetailsAsync(PaymentDetails details);
}

public class PaymentResult
{
    public bool IsSuccessful { get; set; }
    public string TransactionId { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime ProcessedAt { get; set; }
}

public class PaymentDetails
{
    public string? CardNumber { get; set; }
    public string? CardHolderName { get; set; }
    public string? ExpiryDate { get; set; }
    public string? CVV { get; set; }
    public string? BankAccountNumber { get; set; }
    public string? CustomerName { get; set; }
    public string? CustomerPhone { get; set; }
    public string? CustomerAddress { get; set; }
}