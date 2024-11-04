using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Videoteka.Models
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
        [ReleaseDateNotInPast]
        public DateTime BorrowDate { get; set; }

        [Required]
        [ReturnDateAfterBorrowDate]
        public DateTime ReturnDate { get; set; }

        [Required]
        public bool Returned { get; set; }
    }
}
