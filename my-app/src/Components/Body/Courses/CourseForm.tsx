import React, { useEffect, useState } from "react";
import "../Form.css"
import axios from 'axios'


interface props {
    setIsFormOpen(arg:boolean): void,
    fetchdata():any,
    params:any,
    setparams(arg:any):void
    

}
function CourseForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    const [Title,setTitle] = useState<string>(params === undefined? "": params.title)
    const [Type,setType] = useState<number>(params === undefined?"":params.type)
    const [Code,setCode] = useState<string>(params === undefined?"":params.code)
    const [Description,setDescription] = useState<string>(params === undefined?"":params.description)
    const [Lectures,setLectures] = useState<number>(params === undefined?"":params.noOfLectures)

    


    function addCourse ()  {
        const CourseData = {
            title:Title,
            type:Type,
            code:Code,
            description:Description,
            noOfLectures:Lectures

        }
        axios.post('https://localhost:7034/api/Courses',CourseData)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))

        setIsFormOpen(false)
        
    }

    function updateCourse(id:number) {

        const CourseData = {
            id:id,
            title:Title,
            type:Type,
            code:Code,
            description:Description,
            nOfLectures:Lectures
        }
        axios.put(`https://localhost:7034/api/Courses/${id}`, CourseData)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    }
    

   



    return (
        <div className="form">
            <section className="innerform">
                <header>{params === undefined?<text>Add Course</text>:<text>Update Course</text>}</header>
                <form onSubmit={() => {
                    params === undefined?addCourse():updateCourse(params.id)                    
                    }} className="belowheader">
                    <div className="firstdiv">
                        <label>Name</label>
                        <input value={Title} placeholder="Course Name" onChange={(text) => setTitle(text.target.value)}></input>
                        <label>Lectures</label>
                        <input value={Lectures} placeholder="No. of Lectures" onChange={(text) => setLectures(Number(text.target.value))}></input>
                    </div>
                    <div className="firstdiv">
                        <label>Type</label>
                        <input value={Type} placeholder="Course Type" onChange={(text) => setType(Number(text.target.value))}></input>
                        <label>Code</label>
                        <input value={Code} placeholder="Course Code" onChange={(text) => setCode(text.target.value)}></input>
                    </div>
                    <div className="firstdiv">
                        <label>Course Description</label>
                        <input value={Description} placeholder="Course Description" onChange={(text) => setDescription(text.target.value)}></input>
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

export default CourseForm