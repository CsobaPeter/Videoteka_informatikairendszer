using Videoteka.Shared.Models;

namespace Videoteka.Repositories
{
    public interface IBorrowRepository
    {
        Task Add(Borrow borrow);

        Task Delete(Guid id);

        Task<Borrow> Get(Guid id);

        Task<Borrow> GetClosestByMediaId(Guid mediaId);

        Task<List<Borrow>> GetAll();

        Task<List<Borrow>> GetBorrowsByClientId(Guid clientId);

        Task Update(Borrow borrow);

        Task<List<Media>> GetMediasOfClient(Guid clientId);
    }
}
