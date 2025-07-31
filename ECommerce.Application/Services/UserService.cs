using BCrypt.Net;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDTO?> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return null;

        return new UserDTO(
            user.Id,
            user.FullName,
            user.Email,
            user.Role.Name,
            user.Gender,
            user.BirthDate
        );
    }

    public async Task<UserDTO?> GetUserByEmailAsync(string email)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null) return null;

        return new UserDTO(
            user.Id,
            user.FullName,
            user.Email,
            user.Role.Name,
            user.Gender,
            user.BirthDate
        );
    }

    public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users.Select(u => new UserDTO(
            u.Id,
            u.FullName,
            u.Email,
            u.Role.Name,
            u.Gender,
            u.BirthDate
        ));
    }

    public async Task<User> CreateUserAsync(UserRegisterDTO dto)
    {
        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = 2, // Default role (assuming 2 is customer)
            Gender = dto.Gender,
            BirthDate = dto.BirthDate
        };

        return await _userRepository.CreateAsync(user);
    }

    public async Task UpdateUserAsync(int userId, UserUpdateDTO dto)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null) throw new ArgumentException("User not found");

        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.BirthDate = dto.BirthDate;
        user.Gender = dto.Gender;

        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(int userId)
    {
        await _userRepository.DeleteAsync(userId);
    }

    public async Task<bool> UserExistsAsync(int id)
    {
        return await _userRepository.ExistsAsync(id);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _userRepository.EmailExistsAsync(email);
    }
}