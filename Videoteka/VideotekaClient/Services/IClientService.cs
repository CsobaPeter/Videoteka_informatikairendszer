using Videoteka.Shared.Models;

namespace VideotekaClient.Services
{
    public interface IClientService
    {
        Task<List<Client>> GetAllClients();
        Task<Client> GetClient(Guid clientId);
        Task AddClient(Client client);
        Task UpdateClient(Client client);
        Task DeleteClient(Guid clientId);
    }

}
