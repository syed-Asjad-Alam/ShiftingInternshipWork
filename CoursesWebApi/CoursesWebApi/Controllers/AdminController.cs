using CoursesWebApi.Models;
using CoursesWebApi.ViewModels;
using CoursesWebApi.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text.Json.Nodes;

namespace CoursesWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CourseDbContext _adminDbContext;

        public AdminController(CourseDbContext adminDbContext)
        {
            _adminDbContext = adminDbContext;
        }

        [HttpGet("Department")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            if (_adminDbContext.Department == null)
            {
                return NotFound();
            }

            return await _adminDbContext.Department.ToListAsync();
        }

        [HttpGet("Department/{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            if (_adminDbContext.Department == null)
            {
                return NotFound();
            }
            var department = await _adminDbContext.Department.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }



        [HttpPost("Department")]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            if (_adminDbContext.Department == null)
            {
                return Problem("Entity set 'adminDbContext.Department'  is null.");
            }

            _adminDbContext.Department.Add(department);
            await _adminDbContext.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
        }

        [HttpPut("Department/{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }

            _adminDbContext.Entry(department).State = EntityState.Modified;

            try
            {
                await _adminDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("Department/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if (_adminDbContext.Department == null)
            {
                return NotFound();
            }
            var department = await _adminDbContext.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            _adminDbContext.Remove(department);
            await _adminDbContext.SaveChangesAsync();

            return NoContent();

        }

        [Route("Department/[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> filter(String? name)
        {
            var departments = _adminDbContext.Department.AsQueryable();
            try
            {
                if (!String.IsNullOrEmpty(name))
                {
                    departments = departments.Where(d => d.Name == name);

                }
              
            }
            catch (Exception ex)
            {

            }

            return departments.ToList();
        }

        private bool DepartmentExists(int id)
        {
            return (_adminDbContext.Department?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        //***************************************BREAK**********************************

        [HttpGet("Instructor")]
        public async Task<ActionResult<IEnumerable<Instructor>>> GetInstructors()
        {
            if (_adminDbContext.Instructor == null)
            {
                return NotFound();
            }

            return await _adminDbContext.Instructor.ToListAsync();
        }

        [HttpGet("Instructor/{id}")]
        public async Task<ActionResult<Instructor>> GetInstructor(int id)
        {
            if (_adminDbContext.Instructor == null)
            {
                return NotFound();
            }
            var instructor = await _adminDbContext.Instructor.FindAsync(id);

            if (instructor == null)
            {
                return NotFound();
            }

            return instructor;
        }



        [HttpPost("Instructor")]
        public async Task<ActionResult<Instructor>> PostInstructor(Instructor instructor)
        {
            if (_adminDbContext.Instructor == null)
            {
                return Problem("Entity set 'adminDbContext.Instructor'  is null.");
            }

            _adminDbContext.Instructor.Add(instructor);
            await _adminDbContext.SaveChangesAsync();

            return CreatedAtAction("GetInstructor", new { id = instructor.Id }, instructor);
        }

        [HttpPut("Instructor/{id}")]
        public async Task<IActionResult> PutInstructor(int id, Instructor instructor)
        {
            if (id != instructor.Id)
            {
                return BadRequest();
            }

            _adminDbContext.Entry(instructor).State = EntityState.Modified;

            try
            {
                await _adminDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("instructor/{id}")]
        public async Task<IActionResult> DeleteInstructor(int id)
        {
            if (_adminDbContext.Instructor == null)
            {
                return NotFound();
            }
            var instructor = await _adminDbContext.Instructor.FindAsync(id);
            if (instructor == null)
            {
                return NotFound();
            }
            _adminDbContext.Remove(instructor);
            await _adminDbContext.SaveChangesAsync();

            return NoContent();

        }

        [Route("Instructor/[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocatedInstructors>>> AllocatedInstructor(String? department, String? name, int? age,
            String? email, int? salary, String? course)
        {
            var allocatedinstructors = (from Instructor in _adminDbContext.Instructor
                                  join Department in _adminDbContext.Department
                                      on Instructor.Department equals Department.Id
                                  join Courses in _adminDbContext.Courses
                               on Instructor.Course equals Courses.Id
                                  select new AllocatedInstructors
                                  {
                                      Id = Instructor.Id,
                                      departmentid = Department.Id,
                                      Department = Department.Name,
                                      Name = Instructor.Name,
                                      Age = Instructor.Age,
                                      Email = Instructor.Email,
                                      Salary = Instructor.Salary,
                                      courseid = Courses.Id,
                                      Course = Courses.Title
                                  }).AsQueryable();
            try
            {
                if (!String.IsNullOrEmpty(department))
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Department == department);

                }
                if (!String.IsNullOrEmpty(name))
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Name == name);
                }
                if (age != null)
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Age == age);
                }
                if (!String.IsNullOrEmpty(email))
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Email == email);
                }
                if (salary  != null)
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Salary == salary);
                }
                if (!String.IsNullOrEmpty(course))
                {
                    allocatedinstructors = allocatedinstructors.Where(ai => ai.Course == course);
                }

            }
            catch (Exception ex)
            {

            }
            return allocatedinstructors.ToList();

        }

        private bool InstructorExists(int id)
        {
            return (_adminDbContext.Instructor?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        //***************************************BREAK**********************************

        [HttpGet("Faculty")]
        public async Task<ActionResult<IEnumerable<Faculty>>> GetFacultys()
        {
            if (_adminDbContext.Faculty == null)
            {
                return NotFound();
            }

            return await _adminDbContext.Faculty.ToListAsync();
        }

        [HttpGet("Faculty/{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(int id)
        {
            if (_adminDbContext.Faculty == null)
            {
                return NotFound();
            }
            var faculty = await _adminDbContext.Faculty.FindAsync(id);

            if (faculty == null)
            {
                return NotFound();
            }

            return faculty;
        }



        [HttpPost("Faculty")]
        public async Task<ActionResult<Instructor>> PostFaculty(Faculty faculty)
        {
            if (_adminDbContext.Faculty == null)
            {
                return Problem("Entity set 'adminDbContext.Faculty'  is null.");
            }

            _adminDbContext.Faculty.Add(faculty);
            await _adminDbContext.SaveChangesAsync();

            return CreatedAtAction("GetFaculty", new { id = faculty.Id }, faculty);
        }

        [HttpPut("Faculty/{id}")]
        public async Task<IActionResult> PutFaculty(int id, Faculty faculty)
        {
            if (id != faculty.Id)
            {
                return BadRequest();
            }

            _adminDbContext.Entry(faculty).State = EntityState.Modified;

            try
            {
                await _adminDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("Faculty/{id}")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            if (_adminDbContext.Faculty == null)
            {
                return NotFound();
            }
            var faculty = await _adminDbContext.Faculty.FindAsync(id);
            if (faculty == null)
            {
                return NotFound();
            }
            _adminDbContext.Remove(faculty);
            await _adminDbContext.SaveChangesAsync();

            return NoContent();

        }

        [Route("Faculty/[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocatedFaculty>>> AllocatedFaculties(String? instructor, String? course)
        {
            var allocatedfaculties = (from Faculty in _adminDbContext.Faculty
                                        join Instructor in _adminDbContext.Instructor
                                            on Faculty.Instructor equals Instructor.Id
                                        join Courses in _adminDbContext.Courses
                                     on Faculty.Course equals Courses.Id
                                        select new AllocatedFaculty
                                        {
                                            Id = Faculty.Id,
                                            instructorid = Instructor.Id,
                                            Instructor = Instructor.Name,
                                            courseid = Courses.Id,
                                            Course = Courses.Title
                                        }).AsQueryable();
            try
            {
                if (!String.IsNullOrEmpty(instructor))
                {
                    allocatedfaculties = allocatedfaculties.Where(af => af.Instructor == instructor);

                }
                if (!String.IsNullOrEmpty(course))
                {
                    allocatedfaculties = allocatedfaculties.Where(af => af.Course == course);
                }
               

            }
            catch (Exception ex)
            {

            }
            return allocatedfaculties.ToList();

        }


        private bool FacultyExists(int id)
        {
            return (_adminDbContext.Faculty?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        //***************************************BREAK**********************************
        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<viewTotalEntities>>> GetTotalEntities()
        {
            return _adminDbContext.TotalEntities.ToList();
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TotalStudents>>> GetTotalStudents()
        {
            return _adminDbContext.TotalStudents.ToList();
        }


    }
}
