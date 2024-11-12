using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Videoteka.Shared.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Role RoleOfUser { get; set; }
    }

    public enum Role
    {
        Admin,
        RegisteredUser
    }
}
