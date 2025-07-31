using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Factories;

public interface IProductFactory
{
    Product CreateProduct(ProductCreateDTO dto);
    Product CreateProduct(string name, string description, decimal price, int stock, int categoryId, string imageUrl);
    Product CreateSimpleProduct(string name, decimal price, int categoryId);
}