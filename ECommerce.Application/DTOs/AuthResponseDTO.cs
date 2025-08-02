using System.Text.Json.Serialization;

namespace ECommerce.Application.DTOs;

public class AuthResponseDTO
{
    [JsonPropertyName("token")]
    public string Token { get; set; } = null!;

    [JsonPropertyName("user")]
    public UserDTO User { get; set; } = null!;
}

public class RoleDTO
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}