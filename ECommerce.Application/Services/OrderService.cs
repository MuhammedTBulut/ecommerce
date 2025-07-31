using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public async Task<int> CreateOrderAsync(int userId, OrderCreateDTO createDto)
    {
        // Validate stock for all items
        foreach (var item in createDto.Items)
        {
            var hasStock = await _productRepository.HasSufficientStockAsync(item.ProductId, item.Quantity);
            if (!hasStock)
            {
                var product = await _productRepository.GetByIdAsync(item.ProductId);
                var productName = product?.Name ?? "Unknown";
                var currentStock = product?.Stock ?? 0;
                throw new InvalidOperationException($"Insufficient stock for {productName}. Available: {currentStock}, Requested: {item.Quantity}");
            }
        }

        // Create order
        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Items = createDto.Items.Select(x => new OrderItem
            {
                ProductId = x.ProductId,
                Quantity = x.Quantity
            }).ToList()
        };

        await _orderRepository.CreateAsync(order);

        // Update stock for all items
        foreach (var item in createDto.Items)
        {
            await _productRepository.UpdateStockAsync(item.ProductId, item.Quantity);
        }

        return order.Id;
    }

    public async Task<IEnumerable<OrderListDTO>> GetUserOrdersAsync(int userId)
    {
        var orders = await _orderRepository.GetByUserIdAsync(userId);
        
        return orders.Select(o => new OrderListDTO(
            o.Id,
            o.CreatedAt,
            o.Items.Sum(i => i.Quantity * i.Product.Price)
        ));
    }

    public async Task<OrderDetailDTO?> GetOrderDetailAsync(int orderId, int userId, bool isAdmin = false)
    {
        if (!isAdmin && !await _orderRepository.UserOwnsOrderAsync(orderId, userId))
            return null;

        var order = await _orderRepository.GetByIdAsync(orderId);
        if (order == null) return null;

        return new OrderDetailDTO(
            order.Id,
            order.CreatedAt,
            order.Items.Select(i => new OrderProductDTO(
                i.Product.Name,
                i.Product.Price,
                i.Quantity
            )).ToList(),
            order.Items.Sum(i => i.Quantity * i.Product.Price)
        );
    }

    public async Task<bool> OrderExistsAsync(int id)
    {
        return await _orderRepository.ExistsAsync(id);
    }

    public async Task<bool> UserOwnsOrderAsync(int orderId, int userId)
    {
        return await _orderRepository.UserOwnsOrderAsync(orderId, userId);
    }
}