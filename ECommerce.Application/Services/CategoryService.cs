using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDTO?> GetCategoryByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return null;

        return new CategoryDTO(category.Id, category.Name);
    }

    public async Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(c => new CategoryDTO(c.Id, c.Name));
    }

    public async Task<CategoryDTO> CreateCategoryAsync(CategoryDTO dto)
    {
        var category = new Category
        {
            Name = dto.Name
        };

        var createdCategory = await _categoryRepository.CreateAsync(category);
        return new CategoryDTO(createdCategory.Id, createdCategory.Name);
    }

    public async Task UpdateCategoryAsync(int categoryId, CategoryDTO dto)
    {
        var category = await _categoryRepository.GetByIdAsync(categoryId);
        if (category == null) throw new ArgumentException("Category not found");

        category.Name = dto.Name;
        await _categoryRepository.UpdateAsync(category);
    }

    public async Task DeleteCategoryAsync(int categoryId)
    {
        await _categoryRepository.DeleteAsync(categoryId);
    }

    public async Task<bool> CategoryExistsAsync(int id)
    {
        return await _categoryRepository.ExistsAsync(id);
    }
}