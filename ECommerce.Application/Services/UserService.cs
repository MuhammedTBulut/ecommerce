using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;
using BCrypt.Net;

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

    public async Task UpdateUserAsync(int userId, UserUpdateDTO updateDto)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            throw new ArgumentException("User not found", nameof(userId));

        user.FullName = updateDto.FullName;
        user.Email = updateDto.Email;
        user.BirthDate = updateDto.BirthDate;
        user.Gender = updateDto.Gender;

        if (!string.IsNullOrWhiteSpace(updateDto.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateDto.Password);

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            throw new ArgumentException("User not found", nameof(userId));

        await _userRepository.DeleteAsync(user);
    }

    public async Task<bool> UserExistsAsync(int id)
    {
        return await _userRepository.ExistsAsync(id);
    }
}