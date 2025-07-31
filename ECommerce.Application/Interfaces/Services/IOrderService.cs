using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface IOrderService
{
    Task<OrderDetailDTO?> GetOrderByIdAsync(int id);
    Task<IEnumerable<OrderListDTO>> GetOrdersByUserIdAsync(int userId);
    Task<IEnumerable<OrderListDTO>> GetAllOrdersAsync();
    Task<OrderDetailDTO> CreateOrderAsync(int userId, OrderCreateDTO dto);
    Task<OrderDetailDTO> UpdateOrderAsync(int id, OrderCreateDTO dto);
    Task DeleteOrderAsync(int id);
}