namespace Subtra.Api.Entities;

public class Subscription
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Connections
    public int BillingIntervalId { get; set; }
    public BillingInterval? BillingInterval { get; set; }
}
