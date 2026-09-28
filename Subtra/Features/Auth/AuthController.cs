using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Subtra.Api.Features.Auth.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Antiforgery;

namespace Subtra.Api.Features.Auth;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IAntiforgery _antiForgery;

    public AuthController(AuthService authService, IAntiforgery antiForgery)
    {
        _authService = authService;
        _antiForgery = antiForgery;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegisterRequest registerRequest)
    {
        IdentityResult result = await _authService.RegisterAsync(registerRequest);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginRequest loginRequest)
    {
        var result = await _authService.LoginAsync(loginRequest);

        if(!result.Succeeded){
            return Unauthorized();
        }

        return NoContent();
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> LogoutAsync()
    {
        await _authService.LogoutAsync();

        return NoContent();
    }

    [HttpGet("csrf")]
    [AllowAnonymous]
    public ActionResult<CsrfTokenResponse> GetCsrfToken()
    {
        var tokens = _antiForgery.GetAndStoreTokens(HttpContext);

        return Ok( new CsrfTokenResponse { RequestToken = tokens.RequestToken! });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<CurrentUserResponse>> GetCurrentUserAsync()
    {
        var currentUser = await _authService.GetCurrentUserAsync(User);

        if (currentUser == null) return Unauthorized();

        return Ok(currentUser);
    }

}
