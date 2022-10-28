using System.Text.Json.Serialization;

namespace TokenBasedAuthentication.Models
{
    public class UserDto
    {
        public int UserDtoId { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

       
    }
}
