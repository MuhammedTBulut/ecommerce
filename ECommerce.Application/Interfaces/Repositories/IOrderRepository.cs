using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Repositories;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(int id);
    Task<IEnumerable<Order>> GetByUserIdAsync(int userId);
    Task<Order> CreateAsync(Order order);
    Task UpdateAsync(Order order);
    Task DeleteAsync(Order order);
    Task<bool> ExistsAsync(int id);
    Task<bool> UserOwnsOrderAsync(int orderId, int userId);
}