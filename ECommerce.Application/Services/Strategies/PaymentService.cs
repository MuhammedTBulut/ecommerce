using ECommerce.Application.Interfaces.Strategies.Payment;

namespace ECommerce.Application.Services.Strategies;

public interface IPaymentService
{
    Task<PaymentResult> ProcessPaymentAsync(string paymentMethod, PaymentRequest request);
    Task<bool> VerifyPaymentAsync(string paymentMethod, string transactionId);
    Task<PaymentResult> RefundPaymentAsync(string paymentMethod, string transactionId, decimal amount);
    IEnumerable<string> GetAvailablePaymentMethods();
}

public class PaymentService : IPaymentService
{
    private readonly Dictionary<string, IPaymentStrategy> _paymentStrategies;

    public PaymentService(IEnumerable<IPaymentStrategy> paymentStrategies)
    {
        _paymentStrategies = paymentStrategies.ToDictionary(
            strategy => strategy.PaymentMethodName,
            strategy => strategy,
            StringComparer.OrdinalIgnoreCase
        );
    }

    public async Task<PaymentResult> ProcessPaymentAsync(string paymentMethod, PaymentRequest request)
    {
        if (!_paymentStrategies.TryGetValue(paymentMethod, out var strategy))
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Payment method '{paymentMethod}' is not supported"
            };
        }

        return await strategy.ProcessPaymentAsync(request);
    }

    public async Task<bool> VerifyPaymentAsync(string paymentMethod, string transactionId)
    {
        if (!_paymentStrategies.TryGetValue(paymentMethod, out var strategy))
        {
            return false;
        }

        return await strategy.VerifyPaymentAsync(transactionId);
    }

    public async Task<PaymentResult> RefundPaymentAsync(string paymentMethod, string transactionId, decimal amount)
    {
        if (!_paymentStrategies.TryGetValue(paymentMethod, out var strategy))
        {
            return new PaymentResult
            {
                IsSuccess = false,
                ErrorMessage = $"Payment method '{paymentMethod}' is not supported"
            };
        }

        return await strategy.RefundPaymentAsync(transactionId, amount);
    }

    public IEnumerable<string> GetAvailablePaymentMethods()
    {
        return _paymentStrategies.Keys;
    }
}