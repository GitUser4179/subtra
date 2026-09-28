using Microsoft.AspNetCore.Mvc;

namespace Subtra.Api.Features.BillingIntervals;

[ApiController]
[Route("api/billingIntervals")]
public class BillingIntervalsController : ControllerBase
{
    private readonly BillingIntervalsService _billingIntervalsService;
    public BillingIntervalsController(BillingIntervalsService billingIntervalService)
    {
        _billingIntervalsService = billingIntervalService;
    }

    [HttpGet]
    public async Task<ActionResult<List<BillingIntervalResponse>>> GetAllAsync()
    {
        List<BillingIntervalResponse> billingIntervals = await _billingIntervalsService.GetAllAsync();

        return Ok(billingIntervals);
    }
}
