using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Factories;

public interface IUserFactory
{
    User CreateUser(UserRegisterDTO dto);
    User CreateAdminUser(AdminCreateUserDTO dto);
    User CreateUser(string fullName, string email, string password, int roleId, bool? gender = null, DateTime? birthDate = null);
}