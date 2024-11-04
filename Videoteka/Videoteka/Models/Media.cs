using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Videoteka.Models
{
    public class Media
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MediaId { get; set; }

        [Required]
        [WhiteSpaceAndNullVerification]
        [MaxLength(15)]
        public string Name { get; set; }

        [Required]
        [WhiteSpaceAndNullVerification]
        public string Description { get; set; }

        [Required]
        [WhiteSpaceAndNullVerification]
        public string Genre { get; set; }

        [Required]
        [Range(1, 10)]
        public int Rating { get; set; }

        public enum MediaType
        {
            DVD,
            VHS,
            BluRay,
            CD,
            Vinyl,
            Cassette,
            Digital,
            Other
        }

        [Required]
        [EnumDataType(typeof(MediaType))]
        public MediaType Type { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        [Range(0, 100)]
        public int Stock { get; set; }
    }
}
