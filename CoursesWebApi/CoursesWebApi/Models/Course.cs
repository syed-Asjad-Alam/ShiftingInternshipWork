using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace CoursesWebApi.Models
{
    public class Course
    {
        public int Id { set; get; }
        [Required]

        public string Title { set; get; }
        [Required]

        public CourseType Type { set; get; }
        [Required]
        public string Code { set; get; }
        public string Description { set; get; }
        public int NoOfLectures { set; get; }

       

    }


    public enum CourseType
    {
        online, onsite
    }
}
