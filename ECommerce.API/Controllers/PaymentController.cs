using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.Interfaces.Factories;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentStrategyFactory _paymentFactory;
    private readonly IShippingStrategyFactory _shippingFactory;

    public PaymentController(
        IPaymentStrategyFactory paymentFactory,
        IShippingStrategyFactory shippingFactory)
    {
        _paymentFactory = paymentFactory;
        _shippingFactory = shippingFactory;
    }

    [HttpGet("methods")]
    public ActionResult<IEnumerable<string>> GetAvailablePaymentMethods()
    {
        var methods = _paymentFactory.GetAvailablePaymentMethods();
        return Ok(methods);
    }

    [HttpGet("shipping-methods")]
    public ActionResult<IEnumerable<string>> GetAvailableShippingMethods([FromQuery] string destination = "Istanbul")
    {
        var methods = _shippingFactory.GetAvailableShippingMethods(destination);
        return Ok(methods);
    }

    [HttpPost("process")]
    public async Task<ActionResult> ProcessPayment([FromBody] PaymentRequest request)
    {
        try
        {
            var paymentStrategy = _paymentFactory.CreatePaymentStrategy(request.PaymentMethod);
            var result = await paymentStrategy.ProcessPaymentAsync(request.Amount, request.CustomerInfo);
            
            return Ok(new
            {
                Success = result.IsSuccess,
                TransactionId = result.TransactionId,
                Message = result.Message,
                ProcessedAt = result.ProcessedAt
            });
        }
        catch (NotSupportedException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("shipping-cost")]
    public ActionResult CalculateShippingCost([FromBody] ShippingRequest request)
    {
        try
        {
            var shippingStrategy = _shippingFactory.CreateShippingStrategy(request.ShippingMethod);
            var cost = shippingStrategy.CalculateShippingCost(request.OrderTotal, request.Destination);
            
            return Ok(new
            {
                Method = shippingStrategy.ShippingMethod,
                Cost = cost,
                EstimatedDays = shippingStrategy.EstimatedDeliveryDays,
                IsAvailable = shippingStrategy.IsAvailable(request.Destination)
            });
        }
        catch (NotSupportedException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class PaymentRequest
{
    public string PaymentMethod { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string CustomerInfo { get; set; } = string.Empty;
}

public class ShippingRequest
{
    public string ShippingMethod { get; set; } = string.Empty;
    public decimal OrderTotal { get; set; }
    public string Destination { get; set; } = string.Empty;
}