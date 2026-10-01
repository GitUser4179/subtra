using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Subtra.Api.Features.Subscriptions.Contracts;

namespace Subtra.Api.Features.Subscriptions;

[ApiController]
[Authorize]
[Route("api/subscriptions")]
public class SubscriptionsController : ControllerBase
{
    private readonly SubscriptionService _subscriptionService;
    private readonly UserManager<IdentityUser> _userManager;
    public SubscriptionsController(SubscriptionService SubscriptionService, UserManager<IdentityUser> userManager)
    {
        _subscriptionService = SubscriptionService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<SubscriptionResponse>>> GetAllAsync(int? categoryId = null)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        return Ok(await _subscriptionService.GetAllAsync(userId, categoryId));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SubscriptionResponse>> GetByIdAsync(int id)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var subscription = await _subscriptionService.GetByIdAsync(id, userId);
        if (subscription == null) return NotFound();

        return Ok(subscription);
    }

    [HttpPost]
    public async Task<ActionResult<SubscriptionResponse>> CreateAsync(CreateSubscriptionRequest request)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var result = await _subscriptionService.CreateAsync(userId, request);

        if (result.Status == SubscriptionWriteStatus.InvalidBillingInterval) return BadRequest("Selected BillingInterval is unavailable");
        if (result.Status == SubscriptionWriteStatus.InvalidCategory) return BadRequest("Selected Category is unavailable");
        if (result.Status != SubscriptionWriteStatus.Succeeded || result.Subscription is null) return StatusCode(500);

        return StatusCode(201, result.Subscription);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<SubscriptionResponse>> UpdateAsync(int id, UpdateSubscriptionRequest request)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var result = await _subscriptionService.UpdateAsync(id, userId, request);
        if (result.Status == SubscriptionWriteStatus.NotFound) return NotFound("Subscription could not be found");
        if (result.Status == SubscriptionWriteStatus.InvalidBillingInterval) return BadRequest("Selected BillingInterval is unavailable");
        if (result.Status == SubscriptionWriteStatus.InvalidCategory) return BadRequest("Selected Category is unavailable");
        if (result.Status != SubscriptionWriteStatus.Succeeded || result.Subscription is null) return StatusCode(500);

        return Ok(result.Subscription);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var result = await _subscriptionService.DeleteAsync(id, userId);
        if (result == false) return NotFound();

        return NoContent();
    }
}
