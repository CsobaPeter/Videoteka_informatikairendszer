using Videoteka.Shared.Models;
using Microsoft.EntityFrameworkCore;


namespace Videoteka.Repositories
{
    public class BorrowRepository : IBorrowRepository
    {
        private readonly AppContext _context;
        private readonly ILogger<IBorrowRepository> _logger;

        public BorrowRepository(ILogger<BorrowRepository> logger, AppContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task Add(Borrow borrow)
        {
            await _context.Borrows.AddAsync(borrow);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Borrow added");
        }

        public async Task Delete(Guid id)
        {
            var borrow = await Get(id);

            _context.Borrows.Remove(borrow);

            await _context.SaveChangesAsync();
        }

        public async Task<Borrow> Get(Guid id)
        {
            var borrow = await _context.Borrows.FindAsync(id);
            _logger.LogInformation("Borrow retrieved: {@borrow}", borrow);
            return borrow;
        }

        public async Task<Borrow> GetClosestByMediaId(Guid mediaId)
        {
            return await _context.Borrows
                .Where(b => b.MediaId == mediaId && b.Returned == false)
                .OrderBy(b => b.ReturnDate)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Borrow>> GetBorrowsByClientId(Guid clientId)
        {
            return await _context.Borrows
                .Where(b => b.ClientId == clientId)
                .ToListAsync();
        }

        public async Task<List<Borrow>> GetAll()
        {
            return await _context.Borrows.ToListAsync();
        }

        public async Task Update(Borrow newBorrow)
        {
            var borrow = await Get(newBorrow.BorrowId);
            borrow.ClientId = newBorrow.ClientId;
            borrow.MediaId = newBorrow.MediaId;
            borrow.BorrowDate = newBorrow.BorrowDate;
            borrow.ReturnDate = newBorrow.ReturnDate;
            borrow.Returned = newBorrow.Returned;
            borrow.HasBeenExtended = newBorrow.HasBeenExtended;

            await _context.SaveChangesAsync();
        }


        public async Task<List<Media>> GetMediasOfClient(Guid clientId)
        {
            return await _context.Medias
                .Where(m => _context.Borrows
                .Any(b => b.ClientId == clientId && b.MediaId == m.MediaId))
                .ToListAsync();
        }
    }
}
