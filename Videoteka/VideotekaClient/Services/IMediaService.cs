using Videoteka.Shared.Models;

namespace VideotekaClient.Services
{
    public interface IMediaService
    {
        Task<List<Media>> GetAllMedia();
        Task<Media> GetMedia(Guid mediaId);
        Task AddMedia(Media media);
        Task UpdateMedia(Media media);
        Task DeleteMedia(Guid mediaId);
    }
}
