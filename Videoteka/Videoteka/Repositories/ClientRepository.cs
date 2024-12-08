using Videoteka.Shared.Models;
using Microsoft.EntityFrameworkCore;


namespace Videoteka.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppContext _context;
        private readonly ILogger<IClientRepository> _logger;

        public ClientRepository(ILogger<ClientRepository> logger, AppContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task Add(Client client)
        {
            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Client added");
        }

        public async Task Delete(Guid id)
        {
            var client = await Get(id);

            _context.Clients.Remove(client);

            await _context.SaveChangesAsync();
        }

        public async Task<Client> Get(Guid id)
        {
            var client = await _context.Clients.FindAsync(id);
            _logger.LogInformation("Client retrieved: {@client}", client);
            return client;
        }

        public async Task<Client> GetByUserId(Guid userId)
        {
            return await _context.Clients.FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task<List<Client>> GetAll()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task Update(Client newClient)
        {
            var client = await Get(newClient.ClientId);
            client.Name = newClient.Name;
            client.Address = newClient.Address;
            client.Email = newClient.Email;
            client.PhoneNumber = newClient.PhoneNumber;

            await _context.SaveChangesAsync();
        }
    }
}
