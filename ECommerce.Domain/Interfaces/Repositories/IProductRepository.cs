using ECommerce.Domain.Models;

namespace ECommerce.Domain.Interfaces.Repositories;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> SearchAsync(string searchTerm);
    Task<IEnumerable<Product>> GetByPriceRangeAsync(decimal? minPrice, decimal? maxPrice);
    Task<Product> CreateAsync(Product product);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<bool> HasSufficientStockAsync(int productId, int quantity);
    Task UpdateStockAsync(int productId, int quantity);
}