using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Payment;

public class CashOnDeliveryPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Cash on Delivery";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails details)
    {
        // Simulate cash on delivery processing
        await Task.Delay(500); // Simulate quick processing

        var isValid = await ValidatePaymentDetailsAsync(details);
        if (!isValid)
        {
            return new PaymentResult
            {
                IsSuccessful = false,
                Message = "Invalid customer details for cash on delivery",
                ProcessedAt = DateTime.UtcNow
            };
        }

        // Cash on delivery is always "successful" at order time
        return new PaymentResult
        {
            IsSuccessful = true,
            TransactionId = $"COD{DateTime.UtcNow:yyyyMMddHHmmss}",
            Message = "Cash on delivery order confirmed",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public async Task<bool> ValidatePaymentDetailsAsync(PaymentDetails details)
    {
        await Task.Delay(50); // Simulate minimal validation delay

        return !string.IsNullOrWhiteSpace(details.CustomerName) &&
               !string.IsNullOrWhiteSpace(details.CustomerPhone) &&
               !string.IsNullOrWhiteSpace(details.CustomerAddress);
    }
}