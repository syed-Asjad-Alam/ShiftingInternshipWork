using CoursesWebApi.ViewModels;
using CoursesWebApi.Views;
using Microsoft.EntityFrameworkCore;

namespace CoursesWebApi.Models
{
    public class CourseDbContext:DbContext
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentCourses> StudentCourses { get; set; }
        public DbSet<AllocatedCourses> AllocatedCourses { get; set; }
        public DbSet<AllocatedInstructors> AllocatedInstructors{ get; set; }
        public DbSet<AllocatedFaculty> AllocatedFaculties { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Faculty> Faculty { get; set; }
        public DbSet<Instructor> Instructor { get; set; }
        

        public DbSet<viewTotalEntities> TotalEntities { get; set; }
        public DbSet<TotalStudents> TotalStudents { get; set; }





        public CourseDbContext(DbContextOptions<CourseDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TotalStudents>(o =>
            {
                o.HasNoKey();
                o.ToView("TotalStudents");
            });
            modelBuilder.Entity<viewTotalEntities>(o =>
            {
                o.HasNoKey();
                o.ToView("viewTotalEntities");
            });
        }


    }
}
