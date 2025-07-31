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

        var dto = await _userService.GetUserByIdAsync(userId);
        return dto is null ? NotFound() : Ok(dto);
    }

    // PUT /api/users/me
    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe([FromBody] UserUpdateDTO dto)
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        try
        {
            await _userService.UpdateUserAsync(userId, dto);
            return NoContent();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    // DELETE /api/users/me
    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMe()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        try
        {
            await _userService.DeleteUserAsync(userId);
            return NoContent();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}