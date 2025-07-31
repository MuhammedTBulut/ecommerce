using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Services;

namespace ECommerce.API.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    // Herkes erişebilir (login olmak şart değil)
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<ProductListDTO>>> GetProducts(
        [FromQuery] int? categoryId,
        [FromQuery] string? search,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice)
    {
        var products = await _productService.GetFilteredProductsAsync(categoryId, search, minPrice, maxPrice);
        return Ok(products.ToList());
    }

    // Herkes erişebilir
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDetailDTO>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    // Admin'e özel
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDTO dto)
    {
        var product = await _productService.CreateProductAsync(dto);
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.Id);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateDTO dto)
    {
        if (!await _productService.ProductExistsAsync(id))
            return NotFound();

        await _productService.UpdateProductAsync(id, dto);
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        if (!await _productService.ProductExistsAsync(id))
            return NotFound();

        await _productService.DeleteProductAsync(id);
        return NoContent();
    }
}