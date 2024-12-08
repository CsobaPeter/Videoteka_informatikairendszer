using Microsoft.Extensions.DependencyInjection;
using Videoteka.Repositories;
using Videoteka.Shared.Models;

namespace Videoteka
{
    public class RoleBasedAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly List<string> _whitelistedPaths = new()
        {
            "/auth/login",
            "/auth/register",
            "/auth/logout",
            "/media/getall",
            "/client/add",
        };

        public RoleBasedAuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value;

            if (_whitelistedPaths.Any(path.StartsWith)) {
                await _next(context);
                return;
            }

            var username = context.Request.Headers["Identity"].FirstOrDefault();

            if (string.IsNullOrEmpty(username))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            using var scope = context.RequestServices.CreateScope();
            var loginRepo = scope.ServiceProvider.GetRequiredService<ILoginRepository>();

            var user = await loginRepo.GetByName(username);
            if (user == null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorizednev");
                return;
            }
            if (path.StartsWith("/admin") && (user.RoleOfUser != Role.Admin || user.RoleOfUser != Role.SuperAdmin))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden");
                return;
            }
            if ((path.StartsWith("/borrow/getall") ||
                path.StartsWith("/client/getall") ||
                path.StartsWith("/client/delete"))
                && user.RoleOfUser == Role.RegisteredUser)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden");
                return;
            }

            await _next(context);
        }
    }
}
