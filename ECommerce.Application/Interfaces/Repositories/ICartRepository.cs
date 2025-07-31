using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Repositories;

public interface ICartRepository
{
    Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(int userId);
    Task<CartItem?> GetCartItemAsync(int userId, int productId);
    Task<CartItem> AddToCartAsync(CartItem cartItem);
    Task UpdateCartItemAsync(CartItem cartItem);
    Task RemoveFromCartAsync(int userId, int productId);
    Task ClearCartAsync(int userId);
    Task<int> GetCartItemCountAsync(int userId);
    Task<decimal> GetCartTotalAsync(int userId);
}