using Videoteka.Shared.Models;

namespace Videoteka.Repositories
{
    public interface IClientRepository
    {
        Task Add(Client client);

        Task Delete(Guid id);

        Task<Client> Get(Guid id);

        Task<Client> GetByUserId(Guid userId);

        Task<List<Client>> GetAll();

        Task Update(Client client);
    }
}
