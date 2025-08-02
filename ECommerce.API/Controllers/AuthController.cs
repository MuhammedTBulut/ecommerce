using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db, IConfiguration config) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        try
        {
            Console.WriteLine($"🔐 Login attempt for: {dto.Email}");

            var user = await db.Users
                .Include(u => u.Role) // 🔑 Rol bilgisi için Include
                .SingleOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
            {
                Console.WriteLine($"❌ User not found: {dto.Email}");
                return Unauthorized(ApiResponse<AuthResponseDTO>.CreateError("Invalid credentials."));
            }

            Console.WriteLine($"✅ User found: {user.FullName}, Role: {user.Role?.Name}");

            bool verifyResult = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!verifyResult)
            {
                Console.WriteLine($"❌ Password verification failed for: {dto.Email}");
                return Unauthorized(ApiResponse<AuthResponseDTO>.CreateError("Invalid credentials."));
            }

            Console.WriteLine($"✅ Password verified for: {dto.Email}");

            // JWT Claims oluştur
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Role claim'i ekle (null kontrolü ile)
            if (user.Role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Role.Name));
                Console.WriteLine($"🎭 Role added to token: {user.Role.Name}");
            }
            else
            {
                Console.WriteLine($"⚠️ User has no role assigned: {user.Email}");
            }

            // JWT ayarlarını logla
            var jwtKey = config["Jwt:Key"];
            var jwtIssuer = config["Jwt:Issuer"];
            var jwtAudience = config["Jwt:Audience"];

            Console.WriteLine($"🔧 JWT Config - Key Length: {jwtKey?.Length}, Issuer: {jwtIssuer}, Audience: {jwtAudience}");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(3),
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine($"✅ JWT Token created successfully");
            Console.WriteLine($"📏 Token length: {tokenString.Length}");
            Console.WriteLine($"🔤 Token preview: {tokenString.Substring(0, Math.Min(50, tokenString.Length))}...");

            // Create the response using standardized format
            var authResponse = new AuthResponseDTO
            {
                Token = tokenString,
                User = new UserDTO(
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.Role?.Name ?? "Customer",
                    user.Gender,
                    user.BirthDate
                )
            };

            return Ok(ApiResponse<AuthResponseDTO>.CreateSuccess(authResponse, "Login successful"));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🚫 Login error: {ex.Message}");
            Console.WriteLine($"📍 Stack trace: {ex.StackTrace}");
            return StatusCode(500, ApiResponse<AuthResponseDTO>.CreateError("Internal server error during login."));
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO dto)
    {
        try
        {
            bool emailExists = await db.Users.AnyAsync(u => u.Email == dto.Email);
            if (emailExists)
                return BadRequest(ApiResponse<AuthResponseDTO>.CreateError("Bu e-posta zaten kayıtlı."));

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // 👇 Rolü veritabanından çek
            var role = await db.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");
            if (role == null)
                return BadRequest(ApiResponse<AuthResponseDTO>.CreateError("Customer rolü bulunamadı. Lütfen bir admin tanımlasın."));

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = passwordHash,
                RoleId = role.Id,
                BirthDate = dto.BirthDate,
                Gender = dto.Gender
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            Console.WriteLine($"✅ New user registered: {dto.Email}");

            // Generate JWT token for the new user (same logic as login)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role.Name)
            };

            var jwtKey = config["Jwt:Key"];
            var jwtIssuer = config["Jwt:Issuer"];
            var jwtAudience = config["Jwt:Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(3),
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Create the response using standardized format
            var authResponse = new AuthResponseDTO
            {
                Token = tokenString,
                User = new UserDTO(
                    user.Id,
                    user.FullName,
                    user.Email,
                    role.Name,
                    user.Gender,
                    user.BirthDate
                )
            };

            return Ok(ApiResponse<AuthResponseDTO>.CreateSuccess(authResponse, "Registration successful"));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🚫 Registration error: {ex.Message}");
            return StatusCode(500, ApiResponse<AuthResponseDTO>.CreateError("Internal server error during registration."));
        }
    }
}