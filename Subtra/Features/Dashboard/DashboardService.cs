using Subtra.Api.Features.Subscriptions;

namespace Subtra.Api.Features.Dashboard;

public class DashboardService
{
    private readonly SubscriptionService _subscriptionService;

    public DashboardService(SubscriptionService subscriptionService)
    {
        _subscriptionService = subscriptionService;
    }

    public async Task<DashboardResponse> GetSummaryAsync(string userId)
    {
        var subscriptions = await _subscriptionService.GetAllAsync(userId);

        var total = subscriptions.Sum(subscription =>
            subscription.Price / subscription.BillingIntervalMonths);

        var categoryCosts = subscriptions
            .GroupBy(subscription => new
            {
                subscription.CategoryId,
                subscription.CategoryName
            })
            .Select(group => new CategoryMonthlyCostResponse
            {
                CategoryId = group.Key.CategoryId,
                CategoryName = group.Key.CategoryName,
                MonthlyCost = decimal.Round(
                    group.Sum(subscription =>
                        subscription.Price / subscription.BillingIntervalMonths), 2)
            })
            .OrderByDescending(c => c.MonthlyCost).ToList();

        return new DashboardResponse
        {
            TotalMonthlyCost = decimal.Round(total, 2),
            CategoryCosts = categoryCosts
        };
    }
}
