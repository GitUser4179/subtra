using System.ComponentModel.DataAnnotations;

namespace Subtra.Api.Features.Categories.Contracts;

public class CreateCategoryRequest
{
    [Required]
    [StringLength(50)]
    public required string Name { get; set; }
}
