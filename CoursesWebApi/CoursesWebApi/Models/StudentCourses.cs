using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursesWebApi.Models
{
    public class StudentCourses
    {
        public int Id { get; set; }
        [Required]

        
        public int Student { get; set; }

 
        public int Course { get; set; }
    }
}
