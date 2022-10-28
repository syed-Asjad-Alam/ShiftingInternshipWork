import React, { useEffect, useState } from "react";
import '../Form.css'
import axios from 'axios'
import { useParams } from "react-router-dom";


interface props {
    setIsFormOpen(arg:boolean): void,
    fetchdata():any,
    params:any,
    setparams(arg:any):void

    

}

function StudentCoursesForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    const [students,setStudents] = useState([])
    const [courses,setCourses] = useState([])

    const [studentid,setStudentId] = useState<number>(params === undefined?"":params.studentid)
    const [courseid,setCourseId] = useState<number>(params === undefined?"":params.courseid)


    const fetchStudents = () => {
        fetch('https://localhost:7034/api/Student').then((res)=>res.json())
        .then((json)=> {
            setStudents(json)
        })

    }

    const fetchCourses = () => {
        fetch('https://localhost:7034/api/Courses').then((res)=>res.json())
        .then((json)=> {
            setCourses(json)
        })
        
    }
    useEffect(() => {
        fetchCourses()
        fetchStudents()
    },[])

    function addstudentcourse() {
        const studentcourse = {
            student: studentid,
            course:courseid
        }
        axios.post('https://localhost:7034/api/Student/PostStudentCourse',studentcourse)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))
        
        setIsFormOpen(false)

        setparams(undefined)


    }

    function updatestudentcourse(id:number) {
        const StudentCourse = {
            id:id,
            student:studentid,
            course:courseid
        }
        axios.put(`https://localhost:7034/api/Student/PutStudentCourse/${id}`, StudentCourse)
        .then((res) => fetchdata())
        .catch((err) => console.log(err))

        setIsFormOpen(false)

        setparams(undefined)

    }





    

    return (
    <div className="form">
        <section className="innerform">
            <header>{params === undefined?<text>Add Student Course</text>:<text>Update Student Course</text>}</header>
            <form onSubmit={() => {
                    params === undefined?addstudentcourse():updatestudentcourse(params.id)                    
                    }} className="belowheader">
                <div className="firstdiv1">
                    <select value = {studentid} onChange={(text) => setStudentId(Number(text.target.value))}  placeholder="Student Names" name="Student">
                        <option value="" disabled selected hidden>Student Names</option>
                        {students.map(({ id,name }) => (
                            <option key={name} value={id}>
                            {name}
                            </option>
                        ))}
                    </select>
                    <select value={courseid} onChange={(text) => setCourseId(Number(text.target.value))}  placeholder="Course Names" name="Course">
                        <option value="" disabled selected hidden>Courses Names</option>
                        {courses.map(({ id,title }) => (
                            <option key={title} value={id}>
                            {title}
                            </option>
                        ))}
                    </select>
                    
                </div>
                <footer>
                        <button onClick={() => {
                            params === undefined?addstudentcourse():updatestudentcourse(params.id)                    
                            }} type="submit" className="save">{params === undefined?<text>Save</text>:<text>Update</text>}</button>
                            <button onClick={() => {
                                    setparams(undefined)
                                    setIsFormOpen(false)
                                    }} className="cancel">Cancel</button>
                    </footer>
                
            </form>
            

        </section>

    </div>
    )

}

export default StudentCoursesForm