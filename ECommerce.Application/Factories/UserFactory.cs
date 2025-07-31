using BCrypt.Net;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Factories;

public class UserFactory : IUserFactory
{
    public User CreateUser(UserCreateDTO dto)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        
        return new User
        {
            FullName = dto.FullName,
            Email = dto.Email.ToLowerInvariant(),
            PasswordHash = hashedPassword,
            RoleId = 2, // Default to regular user role
            Gender = null,
            BirthDate = null
        };
    }

    public User CreateUser(UserRegisterDTO dto, int roleId = 2)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        
        return new User
        {
            FullName = dto.FullName,
            Email = dto.Email.ToLowerInvariant(),
            PasswordHash = hashedPassword,
            RoleId = roleId, // Default to regular user
            Gender = dto.Gender,
            BirthDate = dto.BirthDate
        };
    }
}