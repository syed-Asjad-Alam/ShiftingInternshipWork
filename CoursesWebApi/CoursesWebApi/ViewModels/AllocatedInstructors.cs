namespace CoursesWebApi.ViewModels
{
    public class AllocatedInstructors
    {
        public int Id { get; set; }
        public int departmentid { get; set; }
        public String Department { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public int Salary { get; set; }
        public int courseid { get; set; }
        public String Course { get; set; }
    }
}
