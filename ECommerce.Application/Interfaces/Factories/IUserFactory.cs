using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;

namespace ECommerce.Application.Interfaces.Factories;

public interface IUserFactory
{
    User CreateUser(UserCreateDTO dto);
    User CreateUser(UserRegisterDTO dto, int roleId = 2); // Default to regular user role
}