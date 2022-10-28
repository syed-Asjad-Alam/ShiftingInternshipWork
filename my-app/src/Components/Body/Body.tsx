import React, {  useState } from "react";
import Courses from "./Courses/Courses";
import Students from "./Students/Students";
import StudentCourses from "./StudentCourses/StudentCourses";
import Dashboard from "./Dashboard/Dashboard";
import {Routes, Route, Link} from 'react-router-dom'
import '../Body/Body.css'
import Department from "./Department/Department";
import Instructors from "./Instructors/Instructors";
import Faculties from "./Faculty/Faculties";

// interface  props {
//     check:boolean
// }


function Body () {

    return(
        <div>
            <Routes>
                <Route path="/Department" element={<Department/>}/>
                <Route path="/Instructors" element={<Instructors/>}/>
                <Route path="/Faculty" element={<Faculties/>}/>
                <Route path="/Courses" element={<Courses/>}/>
                <Route path="/Students" element={<Students/>}/>
                <Route path="/StudentCourses" element={<StudentCourses/>}/>
                <Route path="/Dashboard" element={<Dashboard/>}/>
            </Routes>
        </div>

    )
}

export default Body