using System.Collections.Concurrent;
using Videoteka.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace Videoteka.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly AppContext _context;
        private readonly ILogger<ILoginRepository> _logger;
        public static readonly ConcurrentBag<User> LoggedInUsers = new ConcurrentBag<User>();

        public LoginRepository(ILogger<LoginRepository> logger, AppContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task Add(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation("User added");
        }

        public async Task Delete(Guid id)
        {
            var user = await Get(id);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();
        }

        public async Task<User> Get(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            _logger.LogInformation("User retrieved: {@user}", user);
            return user;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task Update(User newUser)
        {
            var user = await Get(newUser.UserId);
            user.Username = newUser.Username;
            user.Password = newUser.Password;
            user.RoleOfUser = newUser.RoleOfUser;

            await _context.SaveChangesAsync();
        }
    }
}
