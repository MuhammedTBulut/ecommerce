using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public record ProductCommentCreateDTO(
        [Required] string Content,
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")] int Rating
    );
}