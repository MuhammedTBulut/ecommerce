using ECommerce.Application.Services.Interfaces;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.Services;

public class ActionLoggerService : IActionLogger
{
    private readonly AppDbContext _context;

    public ActionLoggerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(int userId, string action, string? description = null)
    {
        var log = new ActionLog
        {
            UserId = userId,
            ActionType = action,
            Description = description ?? string.Empty,
            Timestamp = DateTime.UtcNow
        };

        _context.ActionLogs.Add(log);
        await _context.SaveChangesAsync();
    }
}