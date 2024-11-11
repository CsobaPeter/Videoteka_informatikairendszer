using Videoteka.Shared.Models;

namespace Videoteka.Repositories
{
    public interface IMediaRepository
    {
        Task Add(Media media);

        Task Delete(Guid id);

        Task<Media> Get(Guid id);

        Task<List<Media>> GetAll();

        Task Update(Media client);
    }
}
