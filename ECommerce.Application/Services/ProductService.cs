using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductDetailDTO?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdWithCategoryAsync(id);
        if (product == null) return null;

        return new ProductDetailDTO(
            product.Id,
            product.Name,
            product.Description,
            product.Price,
            product.Stock,
            product.CategoryId,
            product.Category.Name,
            product.ImageUrl
        );
    }

    public async Task<IEnumerable<ProductListDTO>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return products.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
    }

    public async Task<IEnumerable<ProductListDTO>> GetProductsByCategoryAsync(int categoryId)
    {
        var products = await _productRepository.GetByCategoryAsync(categoryId);
        return products.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
    }

    public async Task<IEnumerable<ProductListDTO>> SearchProductsAsync(string searchTerm)
    {
        var products = await _productRepository.SearchAsync(searchTerm);
        return products.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
    }

    public async Task<IEnumerable<ProductListDTO>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice)
    {
        var products = await _productRepository.GetByPriceRangeAsync(minPrice, maxPrice);
        return products.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
    }

    public async Task<IEnumerable<ProductListDTO>> GetFilteredProductsAsync(int? categoryId, string? search, decimal? minPrice, decimal? maxPrice)
    {
        var products = await _productRepository.GetAllAsync();
        var query = products.AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search, StringComparison.OrdinalIgnoreCase));

        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice);

        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice);

        return query.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
    }

    public async Task<Product> CreateProductAsync(ProductCreateDTO dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };

        return await _productRepository.CreateAsync(product);
    }

    public async Task UpdateProductAsync(int productId, ProductUpdateDTO dto)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product == null) throw new ArgumentException("Product not found");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.CategoryId = dto.CategoryId;
        product.ImageUrl = dto.ImageUrl;

        await _productRepository.UpdateAsync(product);
    }

    public async Task DeleteProductAsync(int productId)
    {
        await _productRepository.DeleteAsync(productId);
    }

    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _productRepository.ExistsAsync(id);
    }

    public async Task UpdateStockAsync(int productId, int quantity)
    {
        await _productRepository.UpdateStockAsync(productId, quantity);
    }
}