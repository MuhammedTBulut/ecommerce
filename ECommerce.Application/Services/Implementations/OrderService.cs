using ECommerce.Application.DTOs;
using ECommerce.Domain.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public async Task<OrderDetailDTO?> GetOrderByIdAsync(int id)
    {
        var order = await _orderRepository.GetByIdAsync(id);
        if (order == null) return null;

        var products = order.Items.Select(oi => new OrderProductDTO(
            oi.Product.Name,
            oi.Product.Price,
            oi.Quantity
        )).ToList();

        return new OrderDetailDTO(
            order.Id,
            order.CreatedAt,
            products,
            order.Items.Sum(oi => oi.Quantity * oi.Product.Price)
        );
    }

    public async Task<IEnumerable<OrderListDTO>> GetOrdersByUserIdAsync(int userId)
    {
        var orders = await _orderRepository.GetByUserIdAsync(userId);
        return orders.Select(order => new OrderListDTO(
            order.Id,
            order.CreatedAt,
            order.Items.Sum(oi => oi.Quantity * oi.Product.Price)
        ));
    }

    public async Task<IEnumerable<OrderListDTO>> GetAllOrdersAsync()
    {
        var orders = await _orderRepository.GetAllAsync();
        return orders.Select(order => new OrderListDTO(
            order.Id,
            order.CreatedAt,
            order.Items.Sum(oi => oi.Quantity * oi.Product.Price)
        ));
    }

    public async Task<OrderDetailDTO> CreateOrderAsync(int userId, OrderCreateDTO dto)
    {
        // Validate stock for all items
        foreach (var item in dto.Items)
        {
            var product = await _productRepository.GetByIdAsync(item.ProductId);
            if (product == null)
                throw new ArgumentException($"Product not found (ID: {item.ProductId})");

            if (product.Stock < item.Quantity)
                throw new InvalidOperationException($"Insufficient stock for {product.Name} (available: {product.Stock})");
        }

        // Create order
        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Items = dto.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity
            }).ToList()
        };

        var createdOrder = await _orderRepository.CreateAsync(order);

        // Update stock for all items
        foreach (var item in dto.Items)
        {
            await _productRepository.UpdateStockAsync(item.ProductId, item.Quantity);
        }

        return await GetOrderByIdAsync(createdOrder.Id) ?? throw new InvalidOperationException("Failed to retrieve created order");
    }

    public async Task<OrderDetailDTO> UpdateOrderAsync(int id, OrderCreateDTO dto)
    {
        var existingOrder = await _orderRepository.GetByIdAsync(id);
        if (existingOrder == null)
            throw new ArgumentException("Order not found");

        // For simplicity, this implementation replaces the entire order
        // In a real-world scenario, you might want more sophisticated update logic
        
        var order = new Order
        {
            Id = id,
            UserId = existingOrder.UserId,
            CreatedAt = existingOrder.CreatedAt,
            Items = dto.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                OrderId = id
            }).ToList()
        };

        await _orderRepository.UpdateAsync(order);
        return await GetOrderByIdAsync(id) ?? throw new InvalidOperationException("Failed to retrieve updated order");
    }

    public async Task DeleteOrderAsync(int id)
    {
        await _orderRepository.DeleteAsync(id);
    }
}