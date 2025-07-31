using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface IProductService
{
    Task<IEnumerable<ProductListDTO>> GetProductsAsync(int? categoryId, string? search, decimal? minPrice, decimal? maxPrice);
    Task<ProductDetailDTO?> GetProductByIdAsync(int id);
    Task<int> CreateProductAsync(ProductCreateDTO createDto);
    Task UpdateProductAsync(int productId, ProductUpdateDTO updateDto);
    Task DeleteProductAsync(int productId);
    Task<bool> ProductExistsAsync(int id);
}