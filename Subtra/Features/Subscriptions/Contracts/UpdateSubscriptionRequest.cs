using System.ComponentModel.DataAnnotations;

namespace Subtra.Api.Features.Subscriptions.Contracts;

public class UpdateSubscriptionRequest : IValidatableObject
{
    [Required]
    [StringLength(120)]
    public string Name { get; set; } = string.Empty;
    [Required]
    [Range(typeof(decimal), "0", "1000000")]
    public required decimal Price { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int BillingIntervalId { get; set; }

    // data annotations tool that allows us to set a custom ruleset on price that only accepts 2 decimals
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Price is decimal price && decimal.Round(price, 2) != price)
        {
            yield return new ValidationResult(
                "Price must have at most two decimal places.",
                new[] { nameof(Price) });
        }
    }
}
