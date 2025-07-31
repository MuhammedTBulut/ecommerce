using ECommerce.Application.Services.Interfaces;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.Services;

public class ActionLoggerService(AppDbContext db) : IActionLogger
{
    public async Task LogAsync(int userId, string action, string? description = null)
    {
        var log = new ActionLog
        {
            UserId = userId,
            ActionType = action,
            Description = description ?? string.Empty,
            Timestamp = DateTime.UtcNow
        };

        db.ActionLogs.Add(log);
        await db.SaveChangesAsync();
    }
}