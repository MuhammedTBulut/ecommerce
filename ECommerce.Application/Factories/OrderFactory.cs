using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Factories;

public class OrderFactory : IOrderFactory
{
    public Order CreateOrder(int userId, IEnumerable<CartItem> cartItems)
    {
        var orderItems = cartItems.Select(ci => new OrderItem
        {
            ProductId = ci.ProductId,
            Quantity = ci.Quantity,
            UnitPrice = ci.Product.Price
        }).ToList();

        var totalAmount = orderItems.Sum(oi => oi.Quantity * oi.UnitPrice);

        return new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            TotalAmount = totalAmount,
            Items = orderItems
        };
    }

    public Order CreateOrder(int userId, decimal totalAmount)
    {
        return new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            TotalAmount = totalAmount,
            Items = new List<OrderItem>()
        };
    }

    public OrderItem CreateOrderItem(int productId, int quantity, decimal unitPrice)
    {
        return new OrderItem
        {
            ProductId = productId,
            Quantity = quantity,
            UnitPrice = unitPrice
        };
    }
}