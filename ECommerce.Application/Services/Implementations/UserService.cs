using BCrypt.Net;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Interfaces.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Services.Implementations;

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
        return users.Select(user => new UserDTO(
            user.Id,
            user.FullName,
            user.Email,
            user.Role.Name,
            user.Gender,
            user.BirthDate
        ));
    }

    public async Task<UserDTO> CreateUserAsync(UserCreateDTO dto)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        
        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = hashedPassword,
            RoleId = 2, // Default to regular user role
            Gender = null,
            BirthDate = null
        };

        var createdUser = await _userRepository.CreateAsync(user);
        var userWithRole = await _userRepository.GetByIdAsync(createdUser.Id);

        return new UserDTO(
            userWithRole!.Id,
            userWithRole.FullName,
            userWithRole.Email,
            userWithRole.Role.Name,
            userWithRole.Gender,
            userWithRole.BirthDate
        );
    }

    public async Task<UserDTO> UpdateUserAsync(int id, UserUpdateDTO dto)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            throw new ArgumentException("User not found");

        user.FullName = dto.FullName;
        user.Gender = dto.Gender;
        user.BirthDate = dto.BirthDate;

        if (!string.IsNullOrEmpty(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _userRepository.UpdateAsync(user);
        var updatedUser = await _userRepository.GetByIdAsync(id);

        return new UserDTO(
            updatedUser!.Id,
            updatedUser.FullName,
            updatedUser.Email,
            updatedUser.Role.Name,
            updatedUser.Gender,
            updatedUser.BirthDate
        );
    }

    public async Task DeleteUserAsync(int id)
    {
        await _userRepository.DeleteAsync(id);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _userRepository.EmailExistsAsync(email);
    }

    public async Task<User?> ValidateUserCredentialsAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return user;
    }
}