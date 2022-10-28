using Microsoft.EntityFrameworkCore;

namespace TokenBasedAuthentication.Models
{
    public class AppDbContext:DbContext
    {
        public DbSet<UserDto> UserDto {get; set;}

        public DbSet<UserInfo> UserInfo { get; set; }

        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }



        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            

        }
    }

    
}
