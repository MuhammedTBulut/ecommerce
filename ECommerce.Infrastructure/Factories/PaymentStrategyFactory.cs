using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Interfaces.Strategies;
using ECommerce.Infrastructure.Strategies.Payment;

namespace ECommerce.Infrastructure.Factories;

public class PaymentStrategyFactory : IPaymentStrategyFactory
{
    private readonly Dictionary<string, Func<IPaymentStrategy>> _strategies;

    public PaymentStrategyFactory()
    {
        _strategies = new Dictionary<string, Func<IPaymentStrategy>>(StringComparer.OrdinalIgnoreCase)
        {
            { "creditcard", () => new CreditCardPaymentStrategy() },
            { "credit card", () => new CreditCardPaymentStrategy() },
            { "banktransfer", () => new BankTransferPaymentStrategy() },
            { "bank transfer", () => new BankTransferPaymentStrategy() },
            { "cashondelivery", () => new CashOnDeliveryPaymentStrategy() },
            { "cash on delivery", () => new CashOnDeliveryPaymentStrategy() },
            { "cod", () => new CashOnDeliveryPaymentStrategy() }
        };
    }

    public IPaymentStrategy CreatePaymentStrategy(string paymentMethod)
    {
        if (string.IsNullOrWhiteSpace(paymentMethod))
            throw new ArgumentException("Payment method cannot be null or empty", nameof(paymentMethod));

        if (_strategies.TryGetValue(paymentMethod, out var strategyFactory))
        {
            return strategyFactory();
        }

        throw new NotSupportedException($"Payment method '{paymentMethod}' is not supported");
    }

    public IEnumerable<string> GetAvailablePaymentMethods()
    {
        return new[] { "Credit Card", "Bank Transfer", "Cash on Delivery" };
    }
}