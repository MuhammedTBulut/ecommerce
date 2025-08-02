using System.Text.Json.Serialization;

namespace ECommerce.Application.DTOs;

public class ApiResponse<T>
{
    [JsonPropertyName("data")]
    public T? Data { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    // Static factory methods for convenience
    public static ApiResponse<T> CreateSuccess(T data, string? message = null)
    {
        return new ApiResponse<T>
        {
            Data = data,
            Message = message,
            Success = true
        };
    }

    public static ApiResponse<T> CreateError(string message, T? data = default)
    {
        return new ApiResponse<T>
        {
            Data = data,
            Message = message,
            Success = false
        };
    }
}

// Non-generic version for responses without data
public class ApiResponse
{
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    public static ApiResponse CreateSuccess(string? message = null)
    {
        return new ApiResponse
        {
            Message = message,
            Success = true
        };
    }

    public static ApiResponse CreateError(string message)
    {
        return new ApiResponse
        {
            Message = message,
            Success = false
        };
    }
}