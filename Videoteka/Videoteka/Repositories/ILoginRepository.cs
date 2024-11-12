using System.Collections.Concurrent;
using Videoteka.Shared.Models;

namespace Videoteka.Repositories
{
    public interface ILoginRepository
    {

        Task Add(User user);

        Task Delete(Guid id);

        Task<User> Get(Guid id);

        Task<List<User>> GetAll();

        Task Update(User user);
    }
}
