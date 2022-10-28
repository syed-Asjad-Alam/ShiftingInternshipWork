namespace CoursesWebApi.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public int Department { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public int Salary { get; set; }
        public int Course  { get; set; }
    }
}
