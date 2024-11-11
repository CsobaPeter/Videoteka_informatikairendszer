using Videoteka.Shared.Models;
using Microsoft.EntityFrameworkCore;


namespace Videoteka.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly AppContext _context;
        private readonly ILogger<IMediaRepository> _logger;

        public MediaRepository(ILogger<MediaRepository> logger, AppContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task Add(Media media)
        {
            await _context.Medias.AddAsync(media);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Media added");
        }

        public async Task Delete(Guid id)
        {
            var media = await Get(id);

            _context.Medias.Remove(media);

            await _context.SaveChangesAsync();
        }

        public async Task<Media> Get(Guid id)
        {
            var media = await _context.Medias.FindAsync(id);
            _logger.LogInformation("Media retrieved: {@media}", media);
            return media;
        }

        public async Task<List<Media>> GetAll()
        {
            return await _context.Medias.ToListAsync();
        }

        public async Task Update(Media newMedia)
        {
            var media = await Get(newMedia.MediaId);
            media.Name = newMedia.Name;
            media.Duration = newMedia.Duration;
            media.Genre = newMedia.Genre;
            media.Stock = newMedia.Stock;
            media.Description = newMedia.Description;
            media.Rating = newMedia.Rating;
            media.Type = newMedia.Type;

            await _context.SaveChangesAsync();
        }
    }
}
