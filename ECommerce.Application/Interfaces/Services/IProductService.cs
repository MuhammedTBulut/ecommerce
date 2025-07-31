using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Services;

public interface IProductService
{
    Task<ProductDetailDTO?> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductListDTO>> GetAllProductsAsync();
    Task<IEnumerable<ProductListDTO>> GetProductsByCategoryAsync(int categoryId);
    Task<IEnumerable<ProductListDTO>> SearchProductsAsync(string searchTerm);
    Task<IEnumerable<ProductListDTO>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice);
    Task<IEnumerable<ProductListDTO>> GetFilteredProductsAsync(int? categoryId, string? search, decimal? minPrice, decimal? maxPrice);
    Task<Product> CreateProductAsync(ProductCreateDTO dto);
    Task UpdateProductAsync(int productId, ProductUpdateDTO dto);
    Task DeleteProductAsync(int productId);
    Task<bool> ProductExistsAsync(int id);
    Task UpdateStockAsync(int productId, int quantity);
}