using System.Collections.ObjectModel;
using System.Text.Json.Serialization;

namespace TokenBasedAuthentication.Models
{
    public class Role
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<UserRole> UserRoles { get; set; }



    }
}
