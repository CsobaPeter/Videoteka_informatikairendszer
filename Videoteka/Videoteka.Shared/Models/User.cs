        using System;
        using System.Collections.Generic;
        using System.ComponentModel.DataAnnotations;
        using System.ComponentModel.DataAnnotations.Schema;
        using System.Linq;
        using System.Text;
        using System.Threading.Tasks;

        namespace Videoteka.Shared.Models
        {
            public class User
            {
                [Key]
                [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
                public Guid UserId { get; set; }
                [Required]
                public string Username { get; set; }
                public string? Password { get; set; }
                public Role? RoleOfUser { get; set; }
            }

            public enum Role
            {
                Admin,
                RegisteredUser,
                SuperAdmin
            }
        }
