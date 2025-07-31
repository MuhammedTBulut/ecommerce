using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ShippingController : ControllerBase
{
    private readonly IEnumerable<IShippingStrategy> _shippingStrategies;

    public ShippingController(IEnumerable<IShippingStrategy> shippingStrategies)
    {
        _shippingStrategies = shippingStrategies;
    }

    [HttpGet("methods")]
    public ActionResult<IEnumerable<ShippingMethodInfo>> GetShippingMethods([FromQuery] decimal orderValue, [FromQuery] string destination = "")
    {
        var methods = _shippingStrategies.Select(s => new ShippingMethodInfo
        {
            Method = s.ShippingMethod,
            Cost = s.CalculateShippingCost(orderValue, destination),
            EstimatedDays = s.EstimateDeliveryTime(destination).Days
        });
        
        return Ok(methods);
    }

    [HttpPost("arrange")]
    public async Task<IActionResult> ArrangeShipping([FromBody] ArrangeShippingRequest request)
    {
        var strategy = _shippingStrategies.FirstOrDefault(s => s.ShippingMethod == request.ShippingMethod);
        if (strategy == null)
            return BadRequest("Unsupported shipping method");

        var shippingRequest = new ShippingRequest
        {
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            Address = request.Address,
            City = request.City,
            PostalCode = request.PostalCode,
            OrderValue = request.OrderValue,
            Weight = request.Weight
        };

        var result = await strategy.ArrangeShippingAsync(shippingRequest);
        
        if (result.IsSuccessful)
            return Ok(result);
        else
            return BadRequest(result);
    }
}

public class ShippingMethodInfo
{
    public string Method { get; set; } = string.Empty;
    public decimal Cost { get; set; }
    public int EstimatedDays { get; set; }
}

public class ArrangeShippingRequest
{
    public string ShippingMethod { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public decimal OrderValue { get; set; }
    public double Weight { get; set; }
}