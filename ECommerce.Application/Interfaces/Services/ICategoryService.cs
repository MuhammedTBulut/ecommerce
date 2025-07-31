using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface ICategoryService
{
    Task<CategoryDTO?> GetCategoryByIdAsync(int id);
    Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
    Task<CategoryDTO> CreateCategoryAsync(CategoryDTO dto);
    Task UpdateCategoryAsync(int categoryId, CategoryDTO dto);
    Task DeleteCategoryAsync(int categoryId);
    Task<bool> CategoryExistsAsync(int id);
}