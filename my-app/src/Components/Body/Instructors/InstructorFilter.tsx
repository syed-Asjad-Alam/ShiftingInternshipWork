import React, { useState } from "react";
import '../Form.css'

interface props {
    setFilterOpen(arg:boolean): void
    filterresult(arg1:string,arg2:string,arg3:number,arg4:string,arg5:number,arg6:string):void
    fetchdata():any
}


function InstructorFilter ({setFilterOpen,filterresult,fetchdata}:props) {

    const [Department,setDepartment] = useState<string>()
    const [Name,setName] = useState<string>()
    const [Age,setAge] = useState<number>()
    const [Email,setEmail] = useState<string>()
    const [Salary,setSalary] = useState<number>()
    const [Course,setCourse] = useState<string>()

    return (
        <div className="parentdivfilter">
                <div className="inputs">
                    <div>
                        <input value={Department} placeholder="Department Name" onChange={(text) => setDepartment(text.target.value)} ></input>
                    </div>
                    <div>
                        <input value={Name} placeholder="Instructor's Name" onChange={(text) => setName(text.target.value)} ></input>
                    </div>
                    <div>
                        <input value={Age} placeholder="Instructor's Age" onChange={(text) => setAge(Number(text.target.value))} ></input>
                    </div>
                    <div>
                        <input value={Email} placeholder="Instructor's Email" onChange={(text) => setEmail(text.target.value)} ></input>
                    </div>
                    <div>
                        <input value={Salary} placeholder="Instructor's Salary" onChange={(text) => setSalary(Number(text.target.value))} ></input>
                    </div>
                    <div>
                        <input value={Course} placeholder="Course Name" onChange={(text) => setCourse(text.target.value)} ></input>
                    </div>
                </div>
                <div className="buttons">
                        <div>
                            <button onClick={() => {
                                filterresult(Department!,Name!,Age!,Email!,Salary!,Course!)
                                }} className="filter">Filter</button>
                        </div>
                        <div>
                            <button onClick={() => {
                                fetchdata()
                                setFilterOpen(false)
                            }
                                } className="filtercancel">Cancel</button>
                        </div>
                </div>
                
        </div>
    )

}

export default InstructorFilter