using ECommerce.Application.Interfaces.Strategies.Payment;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class CashOnDeliveryPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethodName => "Cash on Delivery";

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        try
        {
            // Simulate processing
            await Task.Delay(500); // COD is faster to process

            // No additional validation needed for COD
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"COD_{Guid.NewGuid():N}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"COD processing failed: {ex.Message}"
            };
        }
    }

    public async Task<bool> VerifyPaymentAsync(string transactionId)
    {
        // COD verification happens upon delivery
        await Task.Delay(100);
        return transactionId.StartsWith("COD_");
    }

    public async Task<PaymentResult> RefundPaymentAsync(string transactionId, decimal amount)
    {
        try
        {
            await Task.Delay(1000);
            
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"CODREF_{transactionId}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"COD refund failed: {ex.Message}"
            };
        }
    }
}