using Microsoft.EntityFrameworkCore;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.Repositories;

public class CartRepository : ICartRepository
{
    private readonly AppDbContext _context;

    public CartRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(int userId)
    {
        return await _context.CartItems
            .Include(ci => ci.Product)
            .AsNoTracking()
            .Where(ci => ci.UserId == userId)
            .ToListAsync();
    }

    public async Task<CartItem?> GetCartItemAsync(int userId, int productId)
    {
        return await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
    }

    public async Task<CartItem> AddToCartAsync(CartItem cartItem)
    {
        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();
        return cartItem;
    }

    public async Task UpdateCartItemAsync(CartItem cartItem)
    {
        _context.CartItems.Update(cartItem);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveFromCartAsync(int userId, int productId)
    {
        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
        
        if (cartItem != null)
        {
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
        }
    }

    public async Task ClearCartAsync(int userId)
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .ToListAsync();
        
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();
    }

    public async Task<int> GetCartItemCountAsync(int userId)
    {
        return await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .SumAsync(ci => ci.Quantity);
    }

    public async Task<decimal> GetCartTotalAsync(int userId)
    {
        return await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.UserId == userId)
            .SumAsync(ci => ci.Quantity * ci.Product.Price);
    }
}