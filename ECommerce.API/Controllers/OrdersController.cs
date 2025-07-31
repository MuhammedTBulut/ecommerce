using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces.Services;

namespace ECommerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(OrderCreateDTO dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        try
        {
            var orderId = await _orderService.CreateOrderAsync(userId, dto);
            return CreatedAtAction(nameof(GetDetail), new { id = orderId }, orderId);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderListDTO>>> GetMyOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var orders = await _orderService.GetUserOrdersAsync(userId);
        return Ok(orders.ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDetailDTO>> GetDetail(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var isAdmin = User.IsInRole("Admin");

        var order = await _orderService.GetOrderDetailAsync(id, userId, isAdmin);
        return order is null ? NotFound() : Ok(order);
    }
}