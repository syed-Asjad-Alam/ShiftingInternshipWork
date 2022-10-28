import React, { useState } from "react";

interface props {
    setFilterOpen(arg:boolean): void
    filterresult(arg1:string,arg2:string):void
    fetchdata():any
}


function StudentCourseFilter ({setFilterOpen,filterresult,fetchdata}:props) {

    const [Student,setStudent] = useState<string>()
    const [Course,setCourse] = useState<string>()

    return (
        <div className="parentdivfilter">
            <div className="inputs">
                <div>
                    <input value={Student} placeholder="Student Name" onChange={(text) => setStudent(text.target.value)} ></input>
                </div>
                <div>
                    <input value={Course} placeholder="Course Title" onChange={(text) => setCourse(text.target.value)}></input>
                </div>    
            </div>
            <div className="buttons">
                <div>
                    <button onClick={() => {
                                    filterresult(Student!,Course!)
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

export default StudentCourseFilter