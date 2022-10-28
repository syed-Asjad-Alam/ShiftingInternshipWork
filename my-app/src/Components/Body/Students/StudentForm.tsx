import React, { useEffect, useState } from "react";
import "../Form.css"
import axios from 'axios'


interface props {
    setIsFormOpen(arg:boolean): void,
    fetchdata():any,
    params:any,
    setparams(arg:any):void
    

}
function StudentForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    const [Name,setName] = useState<string>(params === undefined?"": params.name)
    const [Age,setAge] = useState<number>(params === undefined?"":params.age)
    const [Email,setEmail] = useState<string>(params === undefined?"":params.email)

    


    function addStudent ()  {
        const StudentData = {
            name:Name,
            age:Age,
            email:Email,

        }
        axios.post('https://localhost:7034/api/Student',StudentData)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))

        setIsFormOpen(false)
        
    }

    function updateStudent(id:number) {

        const StudentData = {
            id:id,
            name:Name,
            age:Age,
            email:Email
        }
        axios.put(`https://localhost:7034/api/Student/${id}`, StudentData)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    }
    return (
        <div className="form">
            <section className="innerform">
                <header>{params === undefined?<text>Add Student</text>:<text>Update Student</text>}</header>
                <form onSubmit={() => {
                    params === undefined?addStudent():updateStudent(params.id)                    
                    }} className="belowheader">
                    <div className="firstdiv">
                        <label>Name</label>
                        <input value={Name} placeholder="Student's Name" onChange={(text) => setName(text.target.value)}></input>
                        <label>Age</label>
                        <input value={Age} placeholder="Student's Age" onChange={(text) => setAge(Number(text.target.value))}></input>
                    </div>
                    <div className="firstdiv">
                        <label>Email</label>
                        <input value={Email} placeholder="Student's Email" onChange={(text) => setEmail(text.target.value)}></input>
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

export default StudentForm