using CoursesWebApi.Models;
using CoursesWebApi.ViewModels;
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
    public class StudentController : ControllerBase
    {
        private readonly CourseDbContext _studentDbContext;
        public StudentController(CourseDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        //Get: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            if (_studentDbContext.Students == null)
            {
                return NotFound();
            }

            return await _studentDbContext.Students.ToListAsync();
        }
        //Get: api/Students/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            if (_studentDbContext.Students == null)
            {
                return NotFound();
            }
            var student = await _studentDbContext.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }



        //Post: api/Students
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            if (_studentDbContext.Students == null)
            {
                return Problem("Entity set 'StudentDbContext.Student'  is null.");
            }

            _studentDbContext.Students.Add(student);
            await _studentDbContext.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        //Put: api/Students/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            _studentDbContext.Entry(student).State = EntityState.Modified;

            try
            {
                await _studentDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        //Delete: api/Students/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (_studentDbContext.Students == null)
            {
                return NotFound();
            }
            var student = await _studentDbContext.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            _studentDbContext.Remove(student);
            await _studentDbContext.SaveChangesAsync();

            return NoContent();

        }

        private bool StudentExists(int id)
        {
            return (_studentDbContext.Students?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        //Get student courses
        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentCourses>>> GetStudentCourses()
        {
            if (_studentDbContext.StudentCourses == null)
            {
                return NotFound();
            }



            return await _studentDbContext.StudentCourses.ToListAsync();
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocatedCourses>>> StudentCoursefilter(String? student, String? course)
        {
            var studentcourses = (from StudentCourses in _studentDbContext.StudentCourses
                    join Students in _studentDbContext.Students
                        on StudentCourses.Student equals Students.Id
                    join Courses in _studentDbContext.Courses
                 on StudentCourses.Course equals Courses.Id
                    select new AllocatedCourses
                    {
                        Id = StudentCourses.Id,
                        studentid = Students.Id,
                        Student = Students.Name,
                        courseid = Courses.Id,
                        Course = Courses.Title
                    }).AsQueryable();
            try
            {
                if (!String.IsNullOrEmpty(student))
                {
                    studentcourses = studentcourses.Where(sc => sc.Student == student);

                }
                if (!String.IsNullOrEmpty(course))
                {
                    studentcourses = studentcourses.Where(sc => sc.Course == course);
                }

            }
            catch (Exception ex)
            {

            }
            return studentcourses.ToList();

        }

        






        [Route("[action]/{id}")]
        [HttpGet]
        public async Task<ActionResult<StudentCourses>> GetStudentCourse(int id)
            {
                if (_studentDbContext.StudentCourses == null)
                {
                    return NotFound();
                }
                var studentCourse = await _studentDbContext.StudentCourses.FindAsync(id);

                if (studentCourse == null)
                {
                    return NotFound();
                }

                return studentCourse;
            }

        [Route("[action]")]
        //POST: api/Students/{id}
        [HttpPost]
        public async Task<ActionResult<StudentCourses>> PostStudentCourse(StudentCourses sc)
        {
            if (_studentDbContext.StudentCourses == null)
            {
                return Problem("Entity set 'StudentDbContext.StudentCourses'  is null.");
            }
            _studentDbContext.StudentCourses.Add(sc);

            await _studentDbContext.SaveChangesAsync();

            return CreatedAtAction("GetStudentCourses", new { id = sc.Id }, sc);
        }

        [Route("[action]/{id}")]
        [HttpPut]
        public async Task<IActionResult> PutStudentCourse(int id, StudentCourses sc)
        {
            if (id != sc.Id)
            {
                return BadRequest();
            }

            _studentDbContext.Entry(sc).State = EntityState.Modified;

            try
            {
                await _studentDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentCourseExists(id))
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

        [Route("[action]/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteStudentCourse(int id)
        {
            if (_studentDbContext.StudentCourses == null)
            {
                return NotFound();
            }
            var studentcourse = await _studentDbContext.StudentCourses.FindAsync(id);
            if (studentcourse == null)
            {
                return NotFound();
            }
            _studentDbContext.Remove(studentcourse);
            await _studentDbContext.SaveChangesAsync();

            return NoContent();

        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> filter(String? name, int? age, String? email)
        {
            var students = _studentDbContext.Students.AsQueryable();
            try
            {
                if (!String.IsNullOrEmpty(name))
                {
                    students = students.Where(s => s.Name == name);

                }
                if (age != null)
                {
                    students = students.Where(s => s.Age == age);
                }
                if (!String.IsNullOrEmpty(email))
                {
                    students = students.Where(s => s.Email == email);
                }
                
            }
            catch (Exception ex)
            {

            }

            return students.ToList();
        }

        

        private bool StudentCourseExists(int id)
        {
            return (_studentDbContext.StudentCourses?.Any(e => e.Id == id)).GetValueOrDefault();
        }




    }
    }
