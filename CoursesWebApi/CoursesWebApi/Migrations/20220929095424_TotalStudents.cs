using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesWebApi.Migrations
{
    public partial class TotalStudents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"Create view TotalStudents
					as Select Title, Count(Title) as Students from Courses
                    left join StudentCourses
                    on Courses.Id = StudentCourses.Course
                    group by Title");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"drop view TotalStudents");
        }
    }
}
