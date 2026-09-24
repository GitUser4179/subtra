using Subtra.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Subtra.Api.Features.BillingIntervals;

public class BillingIntervalsService
{
    private readonly AppDbContext _context;

    public BillingIntervalsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<BillingIntervalResponse>> GetAllAsync()
    {
        var intervals = await _context.BillingIntervals.Select(interval => new BillingIntervalResponse
        {
            Id = interval.Id,
            Name = interval.Name,
            Months = interval.Months
        }).ToListAsync();

        return intervals;
    }
}
