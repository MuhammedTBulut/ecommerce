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

    public async Task<IEnumerable<ProductListDTO>> GetProductsAsync(int? categoryId, string? search, decimal? minPrice, decimal? maxPrice)
    {
        IEnumerable<Product> products;

        if (categoryId.HasValue)
        {
            products = await _productRepository.GetByCategoryAsync(categoryId.Value);
        }
        else if (!string.IsNullOrWhiteSpace(search))
        {
            products = await _productRepository.SearchAsync(search);
        }
        else if (minPrice.HasValue || maxPrice.HasValue)
        {
            products = await _productRepository.GetByPriceRangeAsync(minPrice, maxPrice);
        }
        else
        {
            products = await _productRepository.GetAllAsync();
        }

        // Apply additional filters
        if (categoryId.HasValue && products.Any())
            products = products.Where(p => p.CategoryId == categoryId);

        if (!string.IsNullOrWhiteSpace(search) && products.Any())
            products = products.Where(p => p.Name.Contains(search));

        if (minPrice.HasValue && products.Any())
            products = products.Where(p => p.Price >= minPrice);

        if (maxPrice.HasValue && products.Any())
            products = products.Where(p => p.Price <= maxPrice);

        return products.Select(p => new ProductListDTO(
            p.Id,
            p.Name,
            p.Price,
            p.CategoryId,
            p.Category.Name,
            p.ImageUrl
        ));
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

    public async Task<int> CreateProductAsync(ProductCreateDTO createDto)
    {
        var product = new Product
        {
            Name = createDto.Name,
            Description = createDto.Description,
            Price = createDto.Price,
            Stock = createDto.Stock,
            CategoryId = createDto.CategoryId,
            ImageUrl = createDto.ImageUrl
        };

        await _productRepository.CreateAsync(product);
        return product.Id;
    }

    public async Task UpdateProductAsync(int productId, ProductUpdateDTO updateDto)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product == null)
            throw new ArgumentException("Product not found", nameof(productId));

        product.Name = updateDto.Name;
        product.Description = updateDto.Description;
        product.Price = updateDto.Price;
        product.Stock = updateDto.Stock;
        product.CategoryId = updateDto.CategoryId;
        product.ImageUrl = updateDto.ImageUrl;

        await _productRepository.UpdateAsync(product);
    }

    public async Task DeleteProductAsync(int productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product == null)
            throw new ArgumentException("Product not found", nameof(productId));

        await _productRepository.DeleteAsync(product);
    }

    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _productRepository.ExistsAsync(id);
    }
}