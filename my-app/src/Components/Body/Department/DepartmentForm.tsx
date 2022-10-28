import React, { useEffect, useState } from "react";
import "../Form.css"
import axios from 'axios'


interface props {
    setIsFormOpen(arg:boolean): void,
    fetchdata():any,
    params:any,
    setparams(arg:any):void
    

}
function DepartmentForm ({setIsFormOpen,fetchdata,params,setparams}:props) {

    const [Name,setName] = useState<string>(params === undefined? "": params.name)

    


    function addDepartment ()  {
        const DepartmentData = {
            name:Name,

        }
        axios.post('https://localhost:7034/api/Admin/Department',DepartmentData)
        .then((res) => { 
            fetchdata()    
        })
        .catch((error) => console.log(error))

        setIsFormOpen(false)
        
    }

    function updateDepartment(id:number) {

        const DepartmentData = {
            id:id,
            name:Name,
        }
        axios.put(`https://localhost:7034/api/Admin/Department/${id}`, DepartmentData)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    }
    

   



    return (
        <div className="form">
            <section className="innerform">
                <header>{params === undefined?<text>Add Course</text>:<text>Update Course</text>}</header>
                <form onSubmit={() => {
                    params === undefined?addDepartment():updateDepartment(params.id)                    
                    }} className="belowheader">
                    <div className="firstdiv">
                        <label>Name</label>
                        <input value={Name} placeholder="Department Name" onChange={(text) => setName(text.target.value)}></input>
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

export default DepartmentForm