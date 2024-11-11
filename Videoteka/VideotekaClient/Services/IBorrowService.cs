using Videoteka.Shared.Models;

namespace VideotekaClient.Services
{
    public interface IBorrowService
    {
        Task<List<Borrow>> GetAllBorrows();
        Task<Borrow> GetBorrow(Guid borrowId);
        Task AddBorrow(Borrow borrow);
        Task UpdateBorrow(Borrow borrow);
        Task DeleteBorrow(Guid borrowId);
        Task<List<Media>> GetMediasOfClient(Guid clientId);
    }
}
