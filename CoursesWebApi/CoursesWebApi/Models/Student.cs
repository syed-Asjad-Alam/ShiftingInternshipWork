using System.ComponentModel.DataAnnotations;

namespace CoursesWebApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required]

        public string Name  { get; set; }
        public int Age { get; set; }
        public string Email  { get; set; }

        




    }
}
