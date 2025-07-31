using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Services;

public interface IOrderService
{
    Task<OrderListDTO?> GetOrderByIdAsync(int id);
    Task<IEnumerable<OrderListDTO>> GetOrdersByUserIdAsync(int userId);
    Task<IEnumerable<AdminOrderListDTO>> GetAllOrdersAsync();
    Task<Order> CreateOrderAsync(int userId);
    Task UpdateOrderAsync(int orderId, Order order);
    Task DeleteOrderAsync(int orderId);
    Task<bool> OrderExistsAsync(int id);
}