using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces.Services;

public interface IUserService
{
    Task<UserDTO?> GetUserByIdAsync(int id);
    Task<UserDTO?> GetUserByEmailAsync(string email);
    Task UpdateUserAsync(int userId, UserUpdateDTO updateDto);
    Task DeleteUserAsync(int userId);
    Task<bool> UserExistsAsync(int id);
}