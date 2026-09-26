using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Subtra.Api.Features.Auth.Contracts;
using System.Security.Claims;

namespace Subtra.Api.Features.Auth;

public class AuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<IdentityResult> RegisterAsync(RegisterRequest request)
    {
        var user = new IdentityUser
        {
            Email = request.Email,
            UserName = request.Email
        };

        IdentityResult result = await _userManager.CreateAsync(user, request.Password);
        return result;
    }

    public async Task<SignInResult> LoginAsync(LoginRequest request)
    {
        IdentityUser? user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            return SignInResult.Failed;
        }

        return await _signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: true);
    }

    public async Task LogoutAsync()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task<CurrentUserResponse?> GetCurrentUserAsync(ClaimsPrincipal principal)
    {
        IdentityUser? user = await _userManager.GetUserAsync(principal);

        if (user == null || user.Email == null)
        {
            return null;
        }

        return (new CurrentUserResponse { Id = user.Id, Email = user.Email });
    }
}
