// Middleware/ActiveUserMiddleware.cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace Videoteka
{
    public class ActiveUserMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly HashSet<string> ActiveUsers = new HashSet<string>();

        private readonly List<string> _whitelistedPaths = new()
        {
            "/auth/login",
            "/auth/register",
            "/auth/logout",
            "/media/getall",
            "/client/add"
        };

        public ActiveUserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            foreach (var item in ActiveUsers)
            {
                Console.WriteLine(item);
            }
            var path = context.Request.Path.Value;

            if (_whitelistedPaths.Any(path.StartsWith))
            {
                await _next(context);
                return;
            }

            string username = context.Request.Headers["Identity"].FirstOrDefault();

            if (!string.IsNullOrEmpty(username) && !username.Equals(default) && ActiveUsers.Contains(username)) 
            {
                await _next(context);
                return;
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("User is not active");
                return;
            }
        }

        public static void AddActiveUser(string username)
        {
            if (!ActiveUsers.Contains(username))
            {
                ActiveUsers.Add(username);
            }
        }

        public static void RemoveActiveUser(string username)
        {
            ActiveUsers.Remove(username);
        }
    }
}
