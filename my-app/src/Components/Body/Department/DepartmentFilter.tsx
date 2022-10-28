import React, { useState } from "react";
import '../Form.css'

interface props {
    setFilterOpen(arg:boolean): void
    filterresult(arg1:string):void
    fetchdata():any
}


function DepartmentFilter ({setFilterOpen,filterresult,fetchdata}:props) {

    const [Name,setName] = useState<string>()

    return (
        <div className="parentdivfilter">
                <div className="inputs">
                    <div>
                        <input value={Name} placeholder="Department Name" onChange={(text) => setName(text.target.value)} ></input>
                    </div>
                </div>
                <div className="buttons">
                        <div>
                            <button onClick={() => {
                                filterresult(Name!)
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

export default DepartmentFilter