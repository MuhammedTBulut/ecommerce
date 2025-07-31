using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ICartRepository _cartRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _cartRepository = cartRepository;
        _productRepository = productRepository;
    }

    public async Task<OrderListDTO?> GetOrderByIdAsync(int id)
    {
        var order = await _orderRepository.GetByIdWithItemsAsync(id);
        if (order == null) return null;

        return new OrderListDTO(
            order.Id,
            order.CreatedAt,
            order.TotalAmount
        );
    }

    public async Task<IEnumerable<OrderListDTO>> GetOrdersByUserIdAsync(int userId)
    {
        var orders = await _orderRepository.GetByUserIdAsync(userId);
        return orders.Select(o => new OrderListDTO(
            o.Id,
            o.CreatedAt,
            o.TotalAmount
        ));
    }

    public async Task<IEnumerable<AdminOrderListDTO>> GetAllOrdersAsync()
    {
        var orders = await _orderRepository.GetAllAsync();
        return orders.Select(o => new AdminOrderListDTO(
            o.Id,
            $"ORD-{o.Id:D6}", // Create order number
            o.CreatedAt,
            o.TotalAmount
        ));
    }

    public async Task<Order> CreateOrderAsync(int userId)
    {
        // Get cart items
        var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
        if (!cartItems.Any())
            throw new InvalidOperationException("Cart is empty");

        // Calculate total amount
        var totalAmount = await _cartRepository.GetCartTotalAsync(userId);

        // Create order
        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            TotalAmount = totalAmount
        };

        // Create order items from cart items
        var orderItems = cartItems.Select(ci => new OrderItem
        {
            ProductId = ci.ProductId,
            Quantity = ci.Quantity,
            UnitPrice = ci.Product.Price
        }).ToList();

        order.Items = orderItems;

        // Save order
        var createdOrder = await _orderRepository.CreateAsync(order);

        // Update product stock
        foreach (var item in cartItems)
        {
            var product = await _productRepository.GetByIdAsync(item.ProductId);
            if (product != null)
            {
                await _productRepository.UpdateStockAsync(item.ProductId, product.Stock - item.Quantity);
            }
        }

        // Clear cart
        await _cartRepository.ClearCartAsync(userId);

        return createdOrder;
    }

    public async Task UpdateOrderAsync(int orderId, Order order)
    {
        await _orderRepository.UpdateAsync(order);
    }

    public async Task DeleteOrderAsync(int orderId)
    {
        await _orderRepository.DeleteAsync(orderId);
    }

    public async Task<bool> OrderExistsAsync(int id)
    {
        return await _orderRepository.ExistsAsync(id);
    }
}