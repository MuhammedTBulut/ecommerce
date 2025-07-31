using ECommerce.Application.Interfaces.Strategies.Payment;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class CreditCardPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethodName => "Credit Card";

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        try
        {
            // Simulate credit card processing
            await Task.Delay(2000); // Simulate API call delay

            // Extract card details from PaymentDetails
            if (!request.PaymentDetails.ContainsKey("CardNumber") ||
                !request.PaymentDetails.ContainsKey("ExpiryDate") ||
                !request.PaymentDetails.ContainsKey("CVV"))
            {
                return new PaymentResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Missing required card details"
                };
            }

            var cardNumber = request.PaymentDetails["CardNumber"].ToString();
            
            // Simulate validation
            if (string.IsNullOrEmpty(cardNumber) || cardNumber.Length < 16)
            {
                return new PaymentResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid card number"
                };
            }

            // Simulate successful payment
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"CC_{Guid.NewGuid():N}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Payment processing failed: {ex.Message}"
            };
        }
    }

    public async Task<bool> VerifyPaymentAsync(string transactionId)
    {
        // Simulate verification
        await Task.Delay(1000);
        return transactionId.StartsWith("CC_");
    }

    public async Task<PaymentResult> RefundPaymentAsync(string transactionId, decimal amount)
    {
        try
        {
            await Task.Delay(1500);
            
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"REF_{transactionId}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Refund failed: {ex.Message}"
            };
        }
    }
}