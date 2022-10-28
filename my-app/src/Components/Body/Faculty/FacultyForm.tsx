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

function FacultyForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    const [instructors,setInstructors] = useState([])
    const [courses,setCourses] = useState([])

    const [instructorid,setInstructorId] = useState<number>(params === undefined?"":params.instructorid)
    const [courseid,setCourseId] = useState<number>(params === undefined?"":params.courseid)


    const fetchInstructors = () => {
        fetch('https://localhost:7034/api/Admin/Instructor').then((res)=>res.json())
        .then((json)=> {
            setInstructors(json)
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
        fetchInstructors()
    },[])

    function addFaculty() {
        const faculty = {
            instructor: instructorid,
            course:courseid
        }
        axios.post('https://localhost:7034/api/Admin/Faculty',faculty)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))
        
        setIsFormOpen(false)

        setparams(undefined)


    }

    function updateFaculty(id:number) {
        const faculty = {
            id:id,
            instructor:instructorid,
            course:courseid
        }
        axios.put(`https://localhost:7034/api/Admin/Faculty/${id}`, faculty)
        .then((res) => fetchdata())
        .catch((err) => console.log(err))

        setIsFormOpen(false)

        setparams(undefined)

    }





    

    return (
    <div className="form">
        <section className="innerform">
            <header>{params === undefined?<text>Add Faculty</text>:<text>Update Faculty</text>}</header>
            <form onSubmit={() => {
                    params === undefined?addFaculty():updateFaculty(params.id)                    
                    }} className="belowheader">
                <div className="firstdiv1">
                    <select value = {instructorid} onChange={(text) => setInstructorId(Number(text.target.value))}  placeholder="Student Names" name="Student">
                        <option value="" disabled selected hidden>Instructor's Names</option>
                        {instructors.map(({ id,name }) => (
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
                            params === undefined?addFaculty():updateFaculty(params.id)                    
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

export default FacultyForm