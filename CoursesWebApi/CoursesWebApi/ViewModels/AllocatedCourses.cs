namespace CoursesWebApi.ViewModels
{
    public class AllocatedCourses
    {
        public int Id { get; set; }
        public int studentid { get; set; }
        public string Student { get; set; }
        public int courseid { get; set; }
        public string Course { get; set; }
    }
}
