using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface IOrderService
{
    Task<int> CreateOrderAsync(int userId, OrderCreateDTO createDto);
    Task<IEnumerable<OrderListDTO>> GetUserOrdersAsync(int userId);
    Task<OrderDetailDTO?> GetOrderDetailAsync(int orderId, int userId, bool isAdmin = false);
    Task<bool> OrderExistsAsync(int id);
    Task<bool> UserOwnsOrderAsync(int orderId, int userId);
}