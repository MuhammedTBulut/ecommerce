using ECommerce.Application.DTOs;
using ECommerce.Domain.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<ProductDetailDTO?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
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

    public async Task<IEnumerable<ProductListDTO>> GetProductsByPriceRangeAsync(decimal? minPrice, decimal? maxPrice)
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
        var allProducts = await _productRepository.GetAllAsync();
        var query = allProducts.AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search));
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

    public async Task<ProductDetailDTO> CreateProductAsync(ProductCreateDTO dto)
    {
        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new ArgumentException("Category not found");

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };

        var createdProduct = await _productRepository.CreateAsync(product);
        var productWithCategory = await _productRepository.GetByIdAsync(createdProduct.Id);

        return new ProductDetailDTO(
            productWithCategory!.Id,
            productWithCategory.Name,
            productWithCategory.Description,
            productWithCategory.Price,
            productWithCategory.Stock,
            productWithCategory.CategoryId,
            productWithCategory.Category.Name,
            productWithCategory.ImageUrl
        );
    }

    public async Task<ProductDetailDTO> UpdateProductAsync(int id, ProductUpdateDTO dto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
            throw new ArgumentException("Product not found");

        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new ArgumentException("Category not found");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.CategoryId = dto.CategoryId;
        product.ImageUrl = dto.ImageUrl;

        await _productRepository.UpdateAsync(product);
        var updatedProduct = await _productRepository.GetByIdAsync(id);

        return new ProductDetailDTO(
            updatedProduct!.Id,
            updatedProduct.Name,
            updatedProduct.Description,
            updatedProduct.Price,
            updatedProduct.Stock,
            updatedProduct.CategoryId,
            updatedProduct.Category.Name,
            updatedProduct.ImageUrl
        );
    }

    public async Task DeleteProductAsync(int id)
    {
        await _productRepository.DeleteAsync(id);
    }

    public async Task<bool> HasSufficientStockAsync(int productId, int quantity)
    {
        return await _productRepository.HasSufficientStockAsync(productId, quantity);
    }
}