using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Factories;

public interface IOrderFactory
{
    Order CreateOrder(int userId, IEnumerable<CartItem> cartItems);
    Order CreateOrder(int userId, decimal totalAmount);
    OrderItem CreateOrderItem(int productId, int quantity, decimal unitPrice);
}