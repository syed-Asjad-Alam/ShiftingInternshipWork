using Microsoft.AspNetCore.Identity;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TokenBasedAuthentication.Models
{
    public class UserInfo
    {
        public int UserInfoId { get; set; }
        [Required]
        public string Username { get; set; } = string.Empty;


        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }


    }
}
