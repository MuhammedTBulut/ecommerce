using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Factories;

public class ProductFactory : IProductFactory
{
    public Product CreateProduct(ProductCreateDTO dto)
    {
        return new Product
        {
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim() ?? string.Empty,
            Price = Math.Round(dto.Price, 2), // Ensure 2 decimal places
            Stock = Math.Max(0, dto.Stock), // Ensure non-negative stock
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl?.Trim() ?? string.Empty
        };
    }

    public Product CreateProductWithDefaults(string name, decimal price, int categoryId)
    {
        return new Product
        {
            Name = name.Trim(),
            Description = $"Product: {name}",
            Price = Math.Round(price, 2),
            Stock = 0, // Default to no stock
            CategoryId = categoryId,
            ImageUrl = "/images/default-product.jpg" // Default image
        };
    }
}