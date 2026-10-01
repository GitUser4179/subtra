using Microsoft.EntityFrameworkCore;
using Subtra.Api.Data;
using Subtra.Api.Entities;
using Subtra.Api.Features.Subscriptions.Contracts;

namespace Subtra.Api.Features.Subscriptions;

public class SubscriptionService
{
    private readonly AppDbContext _context;

    public SubscriptionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SubscriptionResponse>> GetAllAsync(string userId, int? categoryId = null)
    {
        var query = _context.Subscriptions.Where(s => s.UserId == userId);
        if (categoryId.HasValue)
        {
            query = query.Where(s => s.CategoryId == categoryId.Value);
        }
        query = query.OrderBy(s => s.Name).ThenBy(s => s.Id);

        var subscriptions = await query
            .Select(s => new SubscriptionResponse
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                CategoryId = s.CategoryId,
                CategoryName = s.Category!.Name,
                BillingIntervalId = s.BillingIntervalId,
                BillingIntervalName = s.BillingInterval!.Name,
                BillingIntervalMonths = s.BillingInterval!.Months,
            })
            .ToListAsync();

        return subscriptions;
    }

    public async Task<SubscriptionResponse?> GetByIdAsync(int id, string userId)
    {
        return await _context.Subscriptions
            .Where(s => s.Id == id && s.UserId == userId)
            .Select(s => new SubscriptionResponse
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
                CategoryId = s.CategoryId,
                CategoryName = s.Category!.Name,
                BillingIntervalId = s.BillingIntervalId,
                BillingIntervalName = s.BillingInterval!.Name,
                BillingIntervalMonths = s.BillingInterval!.Months
            })
            .FirstOrDefaultAsync();
    }

    public async Task<SubscriptionWriteResult> CreateAsync(string userId, CreateSubscriptionRequest request)
    {
        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == request.CategoryId && c.UserId == userId);
        if (!categoryExists) return new SubscriptionWriteResult(SubscriptionWriteStatus.InvalidCategory);

        var billingIntervalExists = await _context.BillingIntervals.AnyAsync(b => b.Id == request.BillingIntervalId);
        if (!billingIntervalExists) return new SubscriptionWriteResult(SubscriptionWriteStatus.InvalidBillingInterval);

        var subscription = new Subscription
        {
            Name = request.Name.Trim(),
            Price = request.Price,
            CategoryId = request.CategoryId,
            BillingIntervalId = request.BillingIntervalId,
            UserId = userId
        };
        await _context.Subscriptions.AddAsync(subscription);
        await _context.SaveChangesAsync();

        var response = await GetByIdAsync(subscription.Id, userId);
        return new SubscriptionWriteResult(SubscriptionWriteStatus.Succeeded, response);
    }

    public async Task<SubscriptionWriteResult> UpdateAsync(int id, string userId, UpdateSubscriptionRequest request)
    {
        var subscription = await _context.Subscriptions.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (subscription == null) return new SubscriptionWriteResult(SubscriptionWriteStatus.NotFound);

        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == request.CategoryId && c.UserId == userId);
        if (!categoryExists) return new SubscriptionWriteResult(SubscriptionWriteStatus.InvalidCategory);

        var billingIntervalExists = await _context.BillingIntervals.AnyAsync(b => b.Id == request.BillingIntervalId);
        if (!billingIntervalExists) return new SubscriptionWriteResult(SubscriptionWriteStatus.InvalidBillingInterval);

        subscription.Name = request.Name.Trim();
        subscription.Price = request.Price;
        subscription.CategoryId = request.CategoryId;
        subscription.BillingIntervalId = request.BillingIntervalId;
        await _context.SaveChangesAsync();
        return new SubscriptionWriteResult(SubscriptionWriteStatus.Succeeded, await GetByIdAsync(subscription.Id, userId));
    }

    public async Task<bool> DeleteAsync(int id, string userId)
    {
        var subscription = await _context.Subscriptions.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (subscription == null) return false;

        _context.Subscriptions.Remove(subscription);
        await _context.SaveChangesAsync();

        return true;
    }
}
