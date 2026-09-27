using Microsoft.EntityFrameworkCore;
using Subtra.Api.Data;
using Subtra.Api.Features.BillingIntervals;
using Subtra.Api.Features.Auth;
using Scalar.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Subtra;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection")));
        
        // service that registers user management, password hashing and validation
        builder.Services.AddIdentityCore<IdentityUser>(options =>
        {
            options.User.RequireUniqueEmail = true; // require every user to have a unique email, rejecting duplicates
        })
        .AddEntityFrameworkStores<AppDbContext>() // connects identity's user storage to my appdbcontext.
        .AddSignInManager(); // add identity's sign-in checks

        builder.Services
            .AddAuthentication(IdentityConstants.ApplicationScheme)
            .AddIdentityCookies();

        // configures the login cookie's security settings and expiration date
        builder.Services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite = SameSiteMode.Lax; // limits when the browser sends this cookie with requests from other sites.
            options.ExpireTimeSpan = TimeSpan.FromHours(1);
        });

        // configures the cookie and request-token header used for csrf protection
        // requests must also be configured to validate these tokens
        builder.Services.AddAntiforgery(options =>
        {
            options.HeaderName = "X-CSRF-TOKEN";
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite = SameSiteMode.Lax;
        });
        
        // scopes
        builder.Services.AddScoped<BillingIntervalsService>();
        builder.Services.AddScoped<AuthService>();

        // Add services to the container.

        builder.Services.AddControllersWithViews(options =>
        {
            options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
        });
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        // fetches the list of allowed origins from builder config
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>()
            ?? throw new InvalidOperationException("CORS origins are missing.");

        // adds the allowed origins to the policy, and permits credentials to be passed through it
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
            {
                policy.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        var app = builder.Build();

        app.MapOpenApi();
        app.MapScalarApiReference();
       
        app.UseHttpsRedirection();
        app.UseCors("Frontend");
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
