import React, {  useEffect, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact'
import '../../Body/Body.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import studenticon from "../../../Images/studenticon.png"
import StudentForm from "../Students/StudentForm"
import { GridApi, GridReadyEvent } from "ag-grid-community";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPenToSquare,faTrashCan,faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import StudentFilter from "./StudentFilter";




function Students () {

    type AgGridApi = {
        grid?: GridApi;

    }
    
    function actionCellRenderer() {
        return (
            <div className="action">
                <button className="edit"><span><FontAwesomeIcon icon={faPenToSquare}/></span></button>
                <button className="del"><span><FontAwesomeIcon icon={faTrashCan} /></span></button>
            </div>
        )
    }

    const [filteropen,setFilterOpen] = useState(false)
    const [isFormOpen,setIsFormOpen] = useState(false)
    const [rowData,setRowData] = useState([])
    const [params,setparams] = useState()
    const [columnDefs,setColumnDefs] = useState([
        {field:'id'},
        {field:'name'},
        {field:'age'},
        {field:'email'},
        {
            headerName: "Action",
            minWidth: 150,
            cellRenderer: actionCellRenderer,
            editable: false,
            colId: "action",
            resizable:true,
            type:'rightAligned'
          }
    ])

    const fetchdata = () => {
        fetch('https://localhost:7034/api/Student').then((res)=>res.json())
        .then((json)=> {
            setRowData(json)
        })
    }

    const deleteStudent = (id:number) => {
        axios.delete(`https://localhost:7034/api/Student/${id}`).then((res) => {
            
        console.log(res.data)
        fetchdata()
    
    })
        .catch((error) => console.log(error))

    }

    const filterresult =(name:string,age:number,email:string) => {
        fetch(`https://localhost:7034/api/Student/filter?name=${name == null?"":name}&age=${age == null?"":age}&email=${email == null?"":email}`)
        .then((res) => res.json())
        .then((json) => {
            setRowData(json)
        })
   
}

    function onCellClicked(params:any) {
        if (params.column.colId === "action" && params.event.path[0].className === "del" ) {
            deleteStudent(params.node.data.id)
        }
        if (params.column.colId === "action" && params.event.path[0].className === "edit" ) {
            setparams(params.node.data)
            setIsFormOpen(true)
        }

            
    }


    useEffect(() => {
        fetchdata()
             
    },[])



    const gridRef = useRef<AgGridApi>({
        grid: undefined
    })

    const api = gridRef.current;

    const onGridReady =( params: GridReadyEvent) => {
        gridRef.current.grid = params.api
        params.api.sizeColumnsToFit()
    }


   
    

    
    
    

    


    return(
        <div className="tototo">
            <div className="ontop">
                <h4>Students</h4>
            </div>
            {isFormOpen?<StudentForm params={params} setparams={setparams} fetchdata={fetchdata} setIsFormOpen={setIsFormOpen}  />:
            <div className="ag-theme-alpine">
            {filteropen?<div className="filterform card">
                <StudentFilter fetchdata={fetchdata} filterresult={filterresult} setFilterOpen={setFilterOpen} />
                </div>:
            <div className="sep">
                    <div className="test">
                        <div>
                            <button onClick={() => setFilterOpen(true)}><FontAwesomeIcon icon={faFilter} /></button>
                        </div>
                        <div>
                            <button onClick={() => setIsFormOpen(true)}><FontAwesomeIcon icon={faPlusSquare}/></button>
                        </div>
                    </div>
            </div>
            }
            
            <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout={'autoHeight'}
            onGridReady={onGridReady}
            onGridSizeChanged={onGridReady}
            onCellClicked={onCellClicked}
            >
        </AgGridReact>
        </div>}
        </div>

    )

}

export default Students