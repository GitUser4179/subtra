namespace Subtra.Api.Entities;

public class BillingInterval
{
    public decimal Id { get; set; }
    public double Price { get; set; }
    public int Months { get; set; }
    public DateOnly NextPaymentDate { get; set; }
}
