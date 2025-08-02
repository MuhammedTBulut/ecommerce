using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
   public record ProductCommentDTO(
    int Id,
    string Content,
    int Rating,
    bool IsApproved,
    string UserFullName,
    DateTime CreatedAt
);
}