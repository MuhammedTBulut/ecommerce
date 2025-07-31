using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class CashOnDeliveryPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Cash on Delivery";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, string customerInfo)
    {
        // Cash on delivery requires no immediate payment processing
        await Task.Delay(100); // Minimal processing

        var isSuccess = !string.IsNullOrEmpty(customerInfo) && amount > 0;

        return new PaymentResult
        {
            IsSuccess = isSuccess,
            TransactionId = isSuccess ? $"COD_{Guid.NewGuid():N}"[..11] : string.Empty,
            Message = isSuccess ? "Cash on delivery order confirmed" : "Order confirmation failed",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public bool IsAvailable()
    {
        // Cash on delivery is usually always available
        return true;
    }
}