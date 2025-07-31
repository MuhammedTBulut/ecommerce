using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class CreditCardPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Credit Card";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, string customerInfo)
    {
        // Simulate payment processing
        await Task.Delay(2000); // Simulate API call

        // In a real implementation, integrate with payment gateway (Stripe, PayPal, etc.)
        var isSuccess = !string.IsNullOrEmpty(customerInfo) && amount > 0;

        return new PaymentResult
        {
            IsSuccess = isSuccess,
            TransactionId = isSuccess ? $"CC_{Guid.NewGuid():N}"[..10] : string.Empty,
            Message = isSuccess ? "Payment processed successfully" : "Payment failed",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public bool IsAvailable()
    {
        // Check if credit card processing is available
        return true;
    }
}