namespace Subtra.Api.Features.Subscriptions.Contracts;

public class SubscriptionResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;

    public int BillingIntervalId { get; set; }
    public string BillingIntervalName { get; set; } = string.Empty;
    public int BillingIntervalMonths { get; set; }
}
