using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Subtra.Api.Entities;

namespace Subtra.Api.Data;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();
    public DbSet<BillingInterval> BillingIntervals => Set<BillingInterval>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<BillingInterval>()
            .HasData
                (
                new BillingInterval { Id = 1, Months = 1, Name = "Monthly" },
                new BillingInterval { Id = 2, Months = 12, Name = "Yearly"}
                );

        builder.Entity<Subscription>()
            .Property(s => s.Price)
            .HasPrecision(18, 2);
    }
}