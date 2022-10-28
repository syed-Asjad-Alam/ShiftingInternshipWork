using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesWebApi.Migrations
{
    public partial class EmptyMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql(@"Create view viewTotalEntities
					as 
					Select (
						Select Count(*) from Courses
						)
						as courses,
						(
						Select Count(*) from Students
						)
						as students,
						(
						Select Count(*) from Department
						)
						as departments,
						(
						Select Count(*) from Instructor
						)
						as instructors");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql(@"drop view viewTotalEntities");

        }
    }
}
