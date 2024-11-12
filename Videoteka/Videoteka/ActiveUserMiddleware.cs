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
        private static readonly ConcurrentBag<string> ActiveUsers = new ConcurrentBag<string>();

        public ActiveUserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var userId = context.User.Identity?.Name; // Assumes user ID is stored in the Identity Name
            if (!string.IsNullOrEmpty(userId) && ActiveUsers.Contains(userId)) 
            {
                await _next(context); // User is active, proceed
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
            }
        }

        public static void AddActiveUser(string userId)
        {
            if (!ActiveUsers.Contains(userId))
            {
                ActiveUsers.Add(userId);
            }
        }

        public static void RemoveActiveUser(string userId)
        {
            ActiveUsers.TryTake(out userId);
        }
    }
}
