using Subtra.Api.Features.Subscriptions.Contracts;

namespace Subtra.Api.Features.Subscriptions;

public sealed record SubscriptionWriteResult(
    SubscriptionWriteStatus Status,
    SubscriptionResponse? Subscription = null);
