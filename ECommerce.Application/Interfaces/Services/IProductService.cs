using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface IProductService
{
    Task<ProductDetailDTO?> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductListDTO>> GetAllProductsAsync();
    Task<IEnumerable<ProductListDTO>> GetProductsByCategoryAsync(int categoryId);
    Task<IEnumerable<ProductListDTO>> SearchProductsAsync(string searchTerm);
    Task<IEnumerable<ProductListDTO>> GetProductsByPriceRangeAsync(decimal? minPrice, decimal? maxPrice);
    Task<IEnumerable<ProductListDTO>> GetFilteredProductsAsync(int? categoryId, string? search, decimal? minPrice, decimal? maxPrice);
    Task<ProductDetailDTO> CreateProductAsync(ProductCreateDTO dto);
    Task<ProductDetailDTO> UpdateProductAsync(int id, ProductUpdateDTO dto);
    Task DeleteProductAsync(int id);
    Task<bool> HasSufficientStockAsync(int productId, int quantity);
}