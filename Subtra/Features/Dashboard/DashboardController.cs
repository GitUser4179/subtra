using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Subtra.Api.Features.Dashboard;

[ApiController]
[Authorize]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly DashboardService _dashboardService;
    private readonly UserManager<IdentityUser> _userManager;

    public DashboardController(DashboardService dashboardService, UserManager<IdentityUser> userManager)
    {
        _dashboardService = dashboardService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardResponse>> GetAsync()
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        return Ok(await _dashboardService.GetSummaryAsync(userId));
    }
}
