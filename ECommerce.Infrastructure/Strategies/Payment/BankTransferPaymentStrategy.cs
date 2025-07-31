using ECommerce.Application.Interfaces.Strategies.Payment;

namespace ECommerce.Infrastructure.Strategies.Payment;

public class BankTransferPaymentStrategy : IPaymentStrategy
{
    public string PaymentMethodName => "Bank Transfer";

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        try
        {
            // Simulate bank transfer processing
            await Task.Delay(3000); // Bank transfers take longer

            // Extract bank details from PaymentDetails
            if (!request.PaymentDetails.ContainsKey("BankName") ||
                !request.PaymentDetails.ContainsKey("AccountNumber"))
            {
                return new PaymentResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Missing required bank details"
                };
            }

            var accountNumber = request.PaymentDetails["AccountNumber"].ToString();
            
            // Simulate validation
            if (string.IsNullOrEmpty(accountNumber) || accountNumber.Length < 10)
            {
                return new PaymentResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid account number"
                };
            }

            // Simulate successful transfer
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"BT_{Guid.NewGuid():N}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Bank transfer failed: {ex.Message}"
            };
        }
    }

    public async Task<bool> VerifyPaymentAsync(string transactionId)
    {
        // Simulate verification
        await Task.Delay(2000);
        return transactionId.StartsWith("BT_");
    }

    public async Task<PaymentResult> RefundPaymentAsync(string transactionId, decimal amount)
    {
        try
        {
            await Task.Delay(2500);
            
            return new PaymentResult
            {
                IsSuccess = true,
                TransactionId = $"BTREF_{transactionId}",
                ProcessedAt = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Bank transfer refund failed: {ex.Message}"
            };
        }
    }
}