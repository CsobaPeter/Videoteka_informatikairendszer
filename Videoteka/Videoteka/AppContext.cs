using Microsoft.EntityFrameworkCore;
using Videoteka.Shared.Models;

namespace Videoteka
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {
        }

        public AppContext(){}

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Media> Medias { get; set; }
        public virtual DbSet<Borrow> Borrows { get; set; }
    }
}
