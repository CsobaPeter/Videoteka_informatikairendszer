using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Videoteka.Shared.Models;

namespace Videoteka.Shared.Models
{
    public class Borrow
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BorrowId { get; set; }

        [Required]
        [ForeignKey("ClientId")]
        public Guid ClientId { get; set; }

        [Required]
        [ForeignKey("MediaId")]
        public Guid MediaId { get; set; }

        [Required]
        public DateTime BorrowDate { get; set; } = DateTime.Now;

        [Required]
        [ReturnDateAfterBorrowDate]
        public DateTime ReturnDate { get; set; }

        [Required]
        public bool Returned { get; set; } = false;

        [Required]
        public bool HasBeenExtended { get; set; } = false;

        [Required]
        public double Price { get; set; } = 0;

        public double CalculatePriceOfBorrow(Media.MediaType type)
        {
            var days = (ReturnDate - BorrowDate).Days;

            return days * 0.5 * type switch
            {
                Media.MediaType.DVD => 1.4,
                Media.MediaType.VHS => 1.5,
                Media.MediaType.BluRay => 2,
                Media.MediaType.CD => 1.3,
                Media.MediaType.Vinyl => 2.5,
                Media.MediaType.Cassette => 1.1,
                Media.MediaType.Digital => 1.05,
                Media.MediaType.Other => 1,
                _ => 0
            };
        }
    }
}
