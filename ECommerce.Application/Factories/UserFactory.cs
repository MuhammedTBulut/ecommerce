using BCrypt.Net;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Factories;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Factories;

public class UserFactory : IUserFactory
{
    public User CreateUser(UserRegisterDTO dto)
    {
        return new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = 2, // Default customer role
            Gender = dto.Gender,
            BirthDate = dto.BirthDate
        };
    }

    public User CreateAdminUser(AdminCreateUserDTO dto)
    {
        return new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = dto.RoleId,
            Gender = dto.Gender,
            BirthDate = dto.BirthDate
        };
    }

    public User CreateUser(string fullName, string email, string password, int roleId, bool? gender = null, DateTime? birthDate = null)
    {
        return new User
        {
            FullName = fullName,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            RoleId = roleId,
            Gender = gender,
            BirthDate = birthDate
        };
    }
}