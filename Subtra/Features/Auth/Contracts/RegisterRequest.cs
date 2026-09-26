using System.ComponentModel.DataAnnotations;

namespace Subtra.Api.Features.Auth.Contracts;

public class RegisterRequest
{
    // DataAnnotations provides validation attributes that ASP.NET Core will chjeck on incoming request data.
    // Required: Rejects a missing, empty, or whitespace-only value.
    // EmailAddress: Checks the email's format, not whether the address actually exists
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Enter a valid email address.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public required string Password { get; set; }
}
