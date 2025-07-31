using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Payment;

public class BankTransferPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Bank Transfer";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails details)
    {
        // Simulate bank transfer processing
        await Task.Delay(2000); // Simulate longer processing time

        var isValid = await ValidatePaymentDetailsAsync(details);
        if (!isValid)
        {
            return new PaymentResult
            {
                IsSuccessful = false,
                Message = "Invalid bank account details",
                ProcessedAt = DateTime.UtcNow
            };
        }

        // Simulate successful bank transfer
        return new PaymentResult
        {
            IsSuccessful = true,
            TransactionId = $"BT{DateTime.UtcNow:yyyyMMddHHmmss}",
            Message = "Bank transfer initiated successfully",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public async Task<bool> ValidatePaymentDetailsAsync(PaymentDetails details)
    {
        await Task.Delay(200); // Simulate validation delay

        return !string.IsNullOrWhiteSpace(details.BankAccountNumber) &&
               !string.IsNullOrWhiteSpace(details.CustomerName) &&
               details.BankAccountNumber.Length >= 10;
    }
}