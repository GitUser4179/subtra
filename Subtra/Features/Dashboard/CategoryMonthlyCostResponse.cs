namespace Subtra.Api.Features.Dashboard;

public class CategoryMonthlyCostResponse
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public decimal MonthlyCost { get; set; }
}
