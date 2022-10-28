import React, { useState } from "react";

interface props {
    setFilterOpen(arg:boolean): void
    filterresult(arg1:string,arg2:number,arg3:string):void
    fetchdata():any
}


function StudentFilter ({setFilterOpen,filterresult,fetchdata}:props) {

    const [Name,setName] = useState<string>()
    const [Age,setAge] = useState<number>()
    const [Email,setEmail] = useState<string>()

    return (
        <div className="parentdivfilter">
            <div className="inputs">
                <div>
                    <input value={Name} placeholder="Student's Name" onChange={(text) => setName(text.target.value)} ></input>
                </div>
                <div>
                    <input value={Age} type='number' placeholder="Student's Age" onChange={(text) => setAge(Number(text.target.value))}></input>
                </div>
                <div>
                    <input value={Email} placeholder="Student's Email" onChange={(text) => setEmail(text.target.value)}></input>
                </div>
            </div>
            <div className="buttons">
            <div>
                <button onClick={() => {
                                    filterresult(Name!,Age!,Email!)
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

export default StudentFilter