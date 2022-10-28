import React, { useState } from "react";
import '../Form.css'

interface props {
    setFilterOpen(arg:boolean): void
    filterresult(arg1:string,arg2:number,arg3:string,arg4:number):void
    fetchdata():any
}


function CourseFilter ({setFilterOpen,filterresult,fetchdata}:props) {

    const [Title,setTitle] = useState<string>()
    const [Type,setType] = useState<number>()
    const [Code,setCode] = useState<string>()
    const [Lectures,setLectures] = useState<number>()

    return (
        <div className="parentdivfilter">
                <div className="inputs">
                    <div>
                        <input value={Title} placeholder="Course Title" onChange={(text) => setTitle(text.target.value)} ></input>
                    </div>
                    <div>
                        <input value={Type} type='number' placeholder="Course Type" onChange={(text) => setType(Number(text.target.value))}></input>
                    </div>
                    <div>
                        <input value={Code} placeholder="Course Code" onChange={(text) => setCode(text.target.value)}></input>
                    </div>
                    <div>
                        <input value={Lectures} type='number' placeholder="No. of Lectures" onChange={(text) => setLectures(Number(text.target.value))}></input>
                    </div>
                    
                </div>
                <div className="buttons">
                        <div>
                            <button onClick={() => {
                                filterresult(Title!,Type!,Code!,Lectures!)
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

export default CourseFilter