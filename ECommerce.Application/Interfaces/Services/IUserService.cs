using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Services;

public interface IUserService
{
    Task<UserDTO?> GetUserByIdAsync(int id);
    Task<UserDTO?> GetUserByEmailAsync(string email);
    Task<IEnumerable<UserDTO>> GetAllUsersAsync();
    Task<UserDTO> CreateUserAsync(UserCreateDTO dto);
    Task<UserDTO> UpdateUserAsync(int id, UserUpdateDTO dto);
    Task DeleteUserAsync(int id);
    Task<bool> EmailExistsAsync(string email);
    Task<User?> ValidateUserCredentialsAsync(string email, string password);
}