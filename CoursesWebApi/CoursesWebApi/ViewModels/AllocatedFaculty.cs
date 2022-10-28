namespace CoursesWebApi.ViewModels
{
    public class AllocatedFaculty
    {
        public int Id { get; set; }
        public int instructorid { get; set; }
        public String Instructor { get; set; }
        public int courseid { get; set; }
        public String Course { get; set; }
    }
}
