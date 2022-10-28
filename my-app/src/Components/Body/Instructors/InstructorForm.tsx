import React, { useEffect, useState } from "react";
import "../Form.css"
import axios from 'axios'


interface props {
    setIsFormOpen(arg:boolean): void,
    fetchdata():any,
    params:any,
    setparams(arg:any):void
    

}
function InstructorForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    
    const [Departments,setDepartments] = useState([])
    const [Courses,setCourses] = useState([])
    
    const [Department,setDepartment] = useState<number>(params === undefined? "": params.departmentid)
    const [Name,setName] = useState<string>(params === undefined? "": params.name)
    const [Age,setAge] = useState<number>(params === undefined? "": params.age)
    const [Email,setEmail] = useState<string>(params === undefined? "": params.email)
    const [Salary,setSalary] = useState<number>(params === undefined? "": params.salary)
    const [Course,setCourse] = useState<number>(params === undefined? "": params.courseid)

    const fetchDepartments = () => {
        fetch('https://localhost:7034/api/Admin/Department').then((res)=>res.json())
        .then((json)=> {
            setDepartments(json)
        })

    }

    const fetchCourses = () => {
        fetch('https://localhost:7034/api/Courses').then((res)=>res.json())
        .then((json)=> {
            setCourses(json)
        })
    }

    useEffect(() => {
        fetchDepartments()
        fetchCourses()

    },[])
    

    


    function addInstructor ()  {
        const InstructorData = {
            department:Department,
            name:Name,
            age:Age,
            email:Email,
            salary:Salary,
            course:Course

        }
        axios.post('https://localhost:7034/api/Admin/Instructor',InstructorData)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))

        setIsFormOpen(false)
        
    }

    function updateInstructor(id:number) {

        const InstructorData = {
            id:id,
            department:Department,
            name:Name,
            age:Age,
            email:Email,
            salary:Salary,
            course:Course
        }
        axios.put(`https://localhost:7034/api/Admin/Instructor/${id}`, InstructorData)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    }
    

   



    return (
        <div className="form">
            <section className="innerform">
                <header>{params === undefined?<text>Add Instructor</text>:<text>Update Instructor</text>}</header>
                <form onSubmit={() => {
                    params === undefined?addInstructor():updateInstructor(params.id)                    
                    }} className="belowheader">
                    <div className="firstdiv">
                        <label>Department</label>
                        <select value = {Department} onChange={(text) => setDepartment(Number(text.target.value))}  placeholder="Department Names" name="Department">
                        <option value="" disabled selected hidden>Department Names</option>
                        {Departments.map(({ id,name }) => (
                            <option key={name} value={id}>
                            {name}
                            </option>
                        ))}
                    </select>
                        <label>Name</label>
                        <input value={Name} placeholder="Instructor's Name" onChange={(text) => setName(text.target.value)}></input>
                    </div>
                    <div className="firstdiv">
                        <label>Age</label>
                        <input value={Age} placeholder="Instructor's Age" onChange={(text) => setAge(Number(text.target.value))}></input>
                        <label>Email</label>
                        <input value={Email} placeholder="Instructor's Email" onChange={(text) => setEmail(text.target.value)}></input>
                    </div>
                    <div className="firstdiv">
                        <label>Salary</label>
                        <input value={Salary} placeholder="Instructor's Salary" onChange={(text) => setSalary(Number(text.target.value))}></input>
                        <label>Course</label>
                        <select value = {Course} onChange={(text) => setCourse(Number(text.target.value))}  placeholder="Courses Names" name="Course">
                        <option value="" disabled selected hidden>Courses Names</option>
                        {Courses.map(({ id,title }) => (
                            <option key={title} value={id}>
                            {title}
                            </option>
                        ))}
                    </select>
                    </div>
                    <footer>
                        <button type="submit" className="save">{params === undefined?<text>Save</text>:<text>Update</text>}</button>
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

export default InstructorForm