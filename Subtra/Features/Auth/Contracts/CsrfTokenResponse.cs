namespace Subtra.Api.Features.Auth.Contracts;

public class CsrfTokenResponse
{
    public required string RequestToken { get; set; }
}
