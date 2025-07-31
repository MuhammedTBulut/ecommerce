using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Factories;

public interface IProductFactory
{
    Product CreateProduct(ProductCreateDTO dto);
    Product CreateProductWithDefaults(string name, decimal price, int categoryId);
}