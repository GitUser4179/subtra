namespace Subtra.Api.Features.Auth.Contracts;

public class CurrentUserResponse
{
    public required string Id { get; set; }
    public required string Email { get; set; }
}
