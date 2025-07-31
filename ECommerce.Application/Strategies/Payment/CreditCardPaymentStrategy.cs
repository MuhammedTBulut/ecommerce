using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.Application.Strategies.Payment;

public class CreditCardPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethod => "Credit Card";

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails details)
    {
        // Simulate credit card processing
        await Task.Delay(1000); // Simulate API call delay

        var isValid = await ValidatePaymentDetailsAsync(details);
        if (!isValid)
        {
            return new PaymentResult
            {
                IsSuccessful = false,
                Message = "Invalid credit card details",
                ProcessedAt = DateTime.UtcNow
            };
        }

        // Simulate successful payment
        return new PaymentResult
        {
            IsSuccessful = true,
            TransactionId = Guid.NewGuid().ToString(),
            Message = "Payment processed successfully",
            ProcessedAt = DateTime.UtcNow
        };
    }

    public async Task<bool> ValidatePaymentDetailsAsync(PaymentDetails details)
    {
        await Task.Delay(100); // Simulate validation delay

        return !string.IsNullOrWhiteSpace(details.CardNumber) &&
               !string.IsNullOrWhiteSpace(details.CardHolderName) &&
               !string.IsNullOrWhiteSpace(details.ExpiryDate) &&
               !string.IsNullOrWhiteSpace(details.CVV) &&
               details.CardNumber.Length >= 16;
    }
}