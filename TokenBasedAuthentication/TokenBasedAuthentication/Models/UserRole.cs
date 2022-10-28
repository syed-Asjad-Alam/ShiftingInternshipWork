using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace TokenBasedAuthentication.Models
{
    public class UserRole
    {
        public int UserRoleId { get; set; }

        public int UserId { get; set; }
        
        public UserInfo User { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }


        
        
    }
}
