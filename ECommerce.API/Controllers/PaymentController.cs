using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.Interfaces.Strategies;

namespace ECommerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IEnumerable<IPaymentStrategy> _paymentStrategies;

    public PaymentController(IEnumerable<IPaymentStrategy> paymentStrategies)
    {
        _paymentStrategies = paymentStrategies;
    }

    [HttpGet("methods")]
    public ActionResult<IEnumerable<string>> GetPaymentMethods()
    {
        var methods = _paymentStrategies.Select(p => p.PaymentMethod);
        return Ok(methods);
    }

    [HttpPost("process")]
    public async Task<IActionResult> ProcessPayment([FromBody] ProcessPaymentRequest request)
    {
        var strategy = _paymentStrategies.FirstOrDefault(p => p.PaymentMethod == request.PaymentMethod);
        if (strategy == null)
            return BadRequest("Unsupported payment method");

        var paymentDetails = new PaymentDetails
        {
            CardNumber = request.CardNumber,
            CardHolderName = request.CardHolderName,
            ExpiryDate = request.ExpiryDate,
            CVV = request.CVV,
            BankAccountNumber = request.BankAccountNumber,
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            CustomerAddress = request.CustomerAddress
        };

        var result = await strategy.ProcessPaymentAsync(request.Amount, paymentDetails);
        
        if (result.IsSuccessful)
            return Ok(result);
        else
            return BadRequest(result);
    }
}

public class ProcessPaymentRequest
{
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string? CardNumber { get; set; }
    public string? CardHolderName { get; set; }
    public string? ExpiryDate { get; set; }
    public string? CVV { get; set; }
    public string? BankAccountNumber { get; set; }
    public string? CustomerName { get; set; }
    public string? CustomerPhone { get; set; }
    public string? CustomerAddress { get; set; }
}