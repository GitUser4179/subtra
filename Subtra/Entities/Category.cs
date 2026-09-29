using Microsoft.AspNetCore.Identity;

namespace Subtra.Api.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;
    public IdentityUser User { get; set; } = null!;
}
