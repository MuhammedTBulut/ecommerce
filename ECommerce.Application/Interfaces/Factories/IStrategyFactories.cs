using ECommerce.Domain.Interfaces.Strategies;

namespace ECommerce.Application.Interfaces.Factories;

public interface IPaymentStrategyFactory
{
    IPaymentStrategy CreatePaymentStrategy(string paymentMethod);
    IEnumerable<string> GetAvailablePaymentMethods();
}

public interface IShippingStrategyFactory
{
    IShippingStrategy CreateShippingStrategy(string shippingMethod);
    IEnumerable<string> GetAvailableShippingMethods(string destination);
}