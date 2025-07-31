using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;
    private readonly IProductRepository _productRepository;

    public CartService(ICartRepository cartRepository, IProductRepository productRepository)
    {
        _cartRepository = cartRepository;
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<CartItem>> GetCartItemsAsync(int userId)
    {
        return await _cartRepository.GetCartItemsByUserIdAsync(userId);
    }

    public async Task<CartItem> AddToCartAsync(AddToCartDTO dto, int userId)
    {
        // Check if product exists
        var product = await _productRepository.GetByIdAsync(dto.ProductId);
        if (product == null)
            throw new ArgumentException("Product not found");

        // Check stock availability
        if (product.Stock < dto.Quantity)
            throw new InvalidOperationException("Insufficient stock");

        // Check if item already exists in cart
        var existingItem = await _cartRepository.GetCartItemAsync(userId, dto.ProductId);
        if (existingItem != null)
        {
            existingItem.Quantity += dto.Quantity;
            await _cartRepository.UpdateCartItemAsync(existingItem);
            return existingItem;
        }

        // Create new cart item
        var cartItem = new CartItem
        {
            UserId = userId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };

        return await _cartRepository.AddToCartAsync(cartItem);
    }

    public async Task UpdateCartItemQuantityAsync(int userId, int productId, int quantity)
    {
        var cartItem = await _cartRepository.GetCartItemAsync(userId, productId);
        if (cartItem == null)
            throw new ArgumentException("Cart item not found");

        // Check stock availability
        var product = await _productRepository.GetByIdAsync(productId);
        if (product != null && product.Stock < quantity)
            throw new InvalidOperationException("Insufficient stock");

        cartItem.Quantity = quantity;
        await _cartRepository.UpdateCartItemAsync(cartItem);
    }

    public async Task RemoveFromCartAsync(int userId, int productId)
    {
        await _cartRepository.RemoveFromCartAsync(userId, productId);
    }

    public async Task ClearCartAsync(int userId)
    {
        await _cartRepository.ClearCartAsync(userId);
    }

    public async Task<int> GetCartItemCountAsync(int userId)
    {
        return await _cartRepository.GetCartItemCountAsync(userId);
    }

    public async Task<decimal> GetCartTotalAsync(int userId)
    {
        return await _cartRepository.GetCartTotalAsync(userId);
    }
}