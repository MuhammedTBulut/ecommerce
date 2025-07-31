using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class BankTransferPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Bank Transfer";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, string customerInfo)
    {
        // Simulate bank transfer processing
        await Task.Delay(3000); // Simulate longer processing time

        var isSuccess = !string.IsNullOrEmpty(customerInfo) && amount > 0;

        return new PaymentResult
        {
            IsSuccess = isSuccess,
            TransactionId = isSuccess ? $"BT_{Guid.NewGuid():N}"[..10] : string.Empty,
            Message = isSuccess ? "Bank transfer initiated successfully" : "Bank transfer failed",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public bool IsAvailable()
    {
        // Check if bank transfer is available
        return true;
    }
}