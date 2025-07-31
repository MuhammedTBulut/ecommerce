using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Services;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    // GET /api/users/me
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDTO>> Me()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized("Geçersiz kullanıcı kimliği.");

        var userDto = await _userService.GetUserByIdAsync(userId);
        return userDto is null ? NotFound() : Ok(userDto);
    }

    // PUT /api/users/me
    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe([FromBody] UserUpdateDTO dto)
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        if (!await _userService.UserExistsAsync(userId))
            return NotFound();

        await _userService.UpdateUserAsync(userId, dto);
        return NoContent();
    }

    // DELETE /api/users/me
    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMe()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        if (!await _userService.UserExistsAsync(userId))
            return NotFound();

        await _userService.DeleteUserAsync(userId);
        return NoContent();
    }
}