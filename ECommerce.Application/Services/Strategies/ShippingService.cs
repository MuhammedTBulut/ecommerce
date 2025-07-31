using ECommerce.Application.Interfaces.Strategies.Shipping;

namespace ECommerce.Application.Services.Strategies;

public interface IShippingService
{
    Task<ShippingResult> CalculateShippingAsync(string shippingMethod, ShippingRequest request);
    Task<string> CreateShipmentAsync(string shippingMethod, ShippingRequest request);
    Task<string> TrackShipmentAsync(string shippingMethod, string trackingNumber);
    Task<IEnumerable<ShippingResult>> GetAllShippingOptionsAsync(ShippingRequest request);
    IEnumerable<string> GetAvailableShippingMethods();
}

public class ShippingService : IShippingService
{
    private readonly Dictionary<string, IShippingStrategy> _shippingStrategies;

    public ShippingService(IEnumerable<IShippingStrategy> shippingStrategies)
    {
        _shippingStrategies = shippingStrategies.ToDictionary(
            strategy => strategy.ShippingMethodName,
            strategy => strategy,
            StringComparer.OrdinalIgnoreCase
        );
    }

    public async Task<ShippingResult> CalculateShippingAsync(string shippingMethod, ShippingRequest request)
    {
        if (!_shippingStrategies.TryGetValue(shippingMethod, out var strategy))
        {
            return new ShippingResult
            {
                IsSuccess = false,
                ErrorMessage = $"Shipping method '{shippingMethod}' is not supported"
            };
        }

        return await strategy.CalculateShippingAsync(request);
    }

    public async Task<string> CreateShipmentAsync(string shippingMethod, ShippingRequest request)
    {
        if (!_shippingStrategies.TryGetValue(shippingMethod, out var strategy))
        {
            throw new ArgumentException($"Shipping method '{shippingMethod}' is not supported");
        }

        return await strategy.CreateShipmentAsync(request);
    }

    public async Task<string> TrackShipmentAsync(string shippingMethod, string trackingNumber)
    {
        if (!_shippingStrategies.TryGetValue(shippingMethod, out var strategy))
        {
            throw new ArgumentException($"Shipping method '{shippingMethod}' is not supported");
        }

        return await strategy.TrackShipmentAsync(trackingNumber);
    }

    public async Task<IEnumerable<ShippingResult>> GetAllShippingOptionsAsync(ShippingRequest request)
    {
        var tasks = _shippingStrategies.Values.Select(async strategy =>
        {
            try
            {
                return await strategy.CalculateShippingAsync(request);
            }
            catch (Exception ex)
            {
                return new ShippingResult
                {
                    IsSuccess = false,
                    ShippingMethod = strategy.ShippingMethodName,
                    ErrorMessage = ex.Message
                };
            }
        });

        var results = await Task.WhenAll(tasks);
        return results.Where(r => r.IsSuccess);
    }

    public IEnumerable<string> GetAvailableShippingMethods()
    {
        return _shippingStrategies.Keys;
    }
}