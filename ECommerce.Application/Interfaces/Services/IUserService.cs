using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Services;

public interface IUserService
{
    Task<UserDTO?> GetUserByIdAsync(int id);
    Task<UserDTO?> GetUserByEmailAsync(string email);
    Task<IEnumerable<UserDTO>> GetAllUsersAsync();
    Task<User> CreateUserAsync(UserRegisterDTO dto);
    Task UpdateUserAsync(int userId, UserUpdateDTO dto);
    Task DeleteUserAsync(int userId);
    Task<bool> UserExistsAsync(int id);
    Task<bool> EmailExistsAsync(string email);
}