using Microsoft.AspNetCore.Identity;

namespace Subtra.Api.Entities;

public class Subscription
{
    // Properties
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateOnly? NextPaymentDate { get; set; }

    // Relations
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public string UserId { get; set; } = string.Empty;
    public IdentityUser User { get; set; } = null!;

    public int BillingIntervalId { get; set; }
    public BillingInterval? BillingInterval { get; set; }
}
