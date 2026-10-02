namespace Subtra.Api.Features.Dashboard;

public class DashboardResponse
{
    public decimal TotalMonthlyCost { get; set; }
    public List<CategoryMonthlyCostResponse> CategoryCosts { get; set; } = new();
}
