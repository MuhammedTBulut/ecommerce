using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Services;

public interface ICartService
{
    Task<IEnumerable<CartItem>> GetCartItemsAsync(int userId);
    Task<CartItem> AddToCartAsync(AddToCartDTO dto, int userId);
    Task UpdateCartItemQuantityAsync(int userId, int productId, int quantity);
    Task RemoveFromCartAsync(int userId, int productId);
    Task ClearCartAsync(int userId);
    Task<int> GetCartItemCountAsync(int userId);
    Task<decimal> GetCartTotalAsync(int userId);
}