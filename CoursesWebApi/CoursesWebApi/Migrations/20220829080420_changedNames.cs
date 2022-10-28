using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesWebApi.Migrations
{
    public partial class changedNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "student",
                table: "StudentCourses",
                newName: "Student");

            migrationBuilder.RenameColumn(
                name: "course",
                table: "StudentCourses",
                newName: "Course");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Student",
                table: "StudentCourses",
                newName: "student");

            migrationBuilder.RenameColumn(
                name: "Course",
                table: "StudentCourses",
                newName: "course");
        }
    }
}
