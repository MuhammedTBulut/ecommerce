using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCommentsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductCommentsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/ProductComments
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<ProductCommentDTO>>> GetComments(
            [FromQuery] int? productId,
            [FromQuery] bool? isApproved = true)
        {
            try
            {
                var query = _db.ProductComments
                    .Include(c => c.User)
                    .Include(c => c.Product)
                    .AsNoTracking()
                    .AsQueryable();

                if (productId.HasValue)
                    query = query.Where(c => c.ProductId == productId);

                if (isApproved.HasValue)
                    query = query.Where(c => c.IsApproved == isApproved);

                var comments = await query
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ProductCommentDTO(
                        c.Id,
                        c.Content,
                        c.Rating,
                        c.IsApproved,
                        c.User.FullName,
                        c.CreatedAt
                    ))
                    .ToListAsync();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving comments", error = ex.Message });
            }
        }

        // GET: api/ProductComments/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCommentDTO>> GetComment(int id)
        {
            try
            {
                var comment = await _db.ProductComments
                    .Include(c => c.User)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (comment == null)
                {
                    return NotFound(new { message = "Comment not found" });
                }

                var commentDto = new ProductCommentDTO(
                    comment.Id,
                    comment.Content,
                    comment.Rating,
                    comment.IsApproved,
                    comment.User.FullName,
                    comment.CreatedAt
                );

                return Ok(commentDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving comment", error = ex.Message });
            }
        }

        // GET: api/ProductComments/product/5
        [AllowAnonymous]
        [HttpGet("product/{productId}")]
        public async Task<ActionResult<List<ProductCommentDTO>>> GetProductComments(int productId)
        {
            try
            {
                var comments = await _db.ProductComments
                    .Include(c => c.User)
                    .Where(c => c.ProductId == productId && c.IsApproved)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new ProductCommentDTO(
                        c.Id,
                        c.Content,
                        c.Rating,
                        c.IsApproved,
                        c.User.FullName,
                        c.CreatedAt
                    ))
                    .ToListAsync();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving product comments", error = ex.Message });
            }
        }

        // GET: api/ProductComments/product/5/rating-summary
        [AllowAnonymous]
        [HttpGet("product/{productId}/rating-summary")]
        public async Task<ActionResult> GetProductRatingSummary(int productId)
        {
            try
            {
                var comments = await _db.ProductComments
                    .Where(c => c.ProductId == productId && c.IsApproved)
                    .AsNoTracking()
                    .ToListAsync();

                if (!comments.Any())
                {
                    return Ok(new
                    {
                        averageRating = 0,
                        totalComments = 0,
                        ratingDistribution = new Dictionary<int, int>()
                    });
                }

                var averageRating = comments.Average(c => c.Rating);
                var totalComments = comments.Count;
                var ratingDistribution = comments
                    .GroupBy(c => c.Rating)
                    .ToDictionary(g => g.Key, g => g.Count());

                return Ok(new
                {
                    averageRating = Math.Round(averageRating, 1),
                    totalComments,
                    ratingDistribution
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving rating summary", error = ex.Message });
            }
        }

        // POST: api/ProductComments
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProductCommentDTO>> CreateComment([FromBody] ProductCommentCreateDTO commentDto, [FromQuery] int productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                // Check if product exists
                var productExists = await _db.Products.AnyAsync(p => p.Id == productId);
                if (!productExists)
                {
                    return BadRequest(new { message = "Product not found" });
                }

                // Check if user already commented on this product
                var existingComment = await _db.ProductComments
                    .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == userId);

                if (existingComment != null)
                {
                    return BadRequest(new { message = "You have already commented on this product" });
                }

                var comment = new ProductComment
                {
                    ProductId = productId,
                    UserId = userId,
                    Content = commentDto.Content,
                    Rating = commentDto.Rating,
                    IsApproved = false, // Requires admin approval
                    CreatedAt = DateTime.UtcNow
                };

                _db.ProductComments.Add(comment);
                await _db.SaveChangesAsync();

                // Load user info for response
                await _db.Entry(comment).Reference(c => c.User).LoadAsync();

                var responseDto = new ProductCommentDTO(
                    comment.Id,
                    comment.Content,
                    comment.Rating,
                    comment.IsApproved,
                    comment.User.FullName,
                    comment.CreatedAt
                );

                return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating comment", error = ex.Message });
            }
        }

        // PUT: api/ProductComments/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductCommentDTO>> UpdateComment(int id, [FromBody] ProductCommentCreateDTO commentDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var comment = await _db.ProductComments
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (comment == null)
                {
                    return NotFound(new { message = "Comment not found" });
                }

                // Only allow user to edit their own comments
                if (comment.UserId != userId)
                {
                    return Forbid("You can only edit your own comments");
                }

                comment.Content = commentDto.Content;
                comment.Rating = commentDto.Rating;
                comment.IsApproved = false; // Re-require approval after edit

                await _db.SaveChangesAsync();

                var responseDto = new ProductCommentDTO(
                    comment.Id,
                    comment.Content,
                    comment.Rating,
                    comment.IsApproved,
                    comment.User.FullName,
                    comment.CreatedAt
                );

                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating comment", error = ex.Message });
            }
        }

        // DELETE: api/ProductComments/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var comment = await _db.ProductComments.FirstOrDefaultAsync(c => c.Id == id);

                if (comment == null)
                {
                    return NotFound(new { message = "Comment not found" });
                }

                // Only allow user to delete their own comments or admin
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (comment.UserId != userId && userRole != "Admin" && userRole != "SuperAdmin")
                {
                    return Forbid("You can only delete your own comments");
                }

                _db.ProductComments.Remove(comment);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Comment deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting comment", error = ex.Message });
            }
        }
    }
}