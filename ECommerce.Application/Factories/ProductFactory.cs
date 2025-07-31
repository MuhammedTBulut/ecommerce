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
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };
    }

    public Product CreateProduct(string name, string description, decimal price, int stock, int categoryId, string imageUrl)
    {
        return new Product
        {
            Name = name,
            Description = description,
            Price = price,
            Stock = stock,
            CategoryId = categoryId,
            ImageUrl = imageUrl
        };
    }

    public Product CreateSimpleProduct(string name, decimal price, int categoryId)
    {
        return new Product
        {
            Name = name,
            Description = $"Product: {name}",
            Price = price,
            Stock = 0, // Default stock
            CategoryId = categoryId,
            ImageUrl = "/images/default-product.jpg" // Default image
        };
    }
}