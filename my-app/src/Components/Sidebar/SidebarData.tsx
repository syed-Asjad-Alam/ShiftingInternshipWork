import React from "react"
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"
import * as MdIcons from "react-icons/md"
import * as FcIcons from "react-icons/fc"
import * as HiIcons from "react-icons/hi"

export const SidebarData = [
    {
        title:'Dashboard',
        path:'/Dashboard',
        icon:<MdIcons.MdOutlineSpaceDashboard/>,
        classname:'active'
    },
    {
        title:'Courses',
        path:'/Courses',
        icon:<FaIcons.FaBook />,
        classname:'active'
    },
    {
        title:'Students',
        path:'/Students',
        icon:<FaIcons.FaUserGraduate />,
        classname:'active'
    },
    {
        title:'StudentCourses',
        path:'/StudentCourses',
        icon:<GiIcons.GiGraduateCap />,
        classname:'active'
    },
    {
        title:'Departments',
        path:'/Department',
        icon:<FcIcons.FcDepartment />,
        classname:'active'
    },
    {
        title:'Instructors',
        path:'/Instructors',
        icon:<FaIcons.FaUserTie />,
        classname:'active'
    },
    {
        title:'Faculties',
        path:'/Faculty',
        icon:<HiIcons.HiUserGroup />,
        classname:'active'
    }
    

]