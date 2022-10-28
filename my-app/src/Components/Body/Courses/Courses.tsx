import React, { useMemo, useEffect, useRef, useState,useCallback } from "react";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact'
import '../../Body/Body.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CourseForm from "./CourseForm";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPenToSquare,faTrashCan,faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import {faFilter} from "@fortawesome/free-solid-svg-icons"
import CourseFilter from "./CourseFilter";




function Courses () {
    

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
        {field:'title'},
        {field:'type'},
        {field:'code'},
        {field:'description'},
        {field:'noOfLectures'},
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
        fetch('https://localhost:7034/api/Courses').then((res)=>res.json())
        .then((json)=> {
            setRowData(json)
        })
    }

    const deleteCourse = (id:number) => {
        axios.delete(`https://localhost:7034/api/Courses/${id}`).then((res) => {
            
        console.log(res.data)
        fetchdata()
    
    })
        .catch((error) => console.log(error))

    }

    const filterresult =(title:string,type:number,code:string,lectures:number) => {
             fetch(`https://localhost:7034/api/Courses/filter?title=${title == null?"":title}&type=${type == null?"":type}&code=${code == null?"":code}&lectures=${lectures == null?"":lectures}`).then((res) => res.json())
        .then((json) => {
            setRowData(json)
        })
        
    }


    function onCellClicked(params:any) {
        if (params.column.colId === "action" && params.event.path[0].className === "del" ) {
            deleteCourse(params.node.data.id)
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
                <h4>Courses</h4>
            </div>
            {isFormOpen?<CourseForm params={params} setparams={setparams} fetchdata={fetchdata} setIsFormOpen={setIsFormOpen}  />:
            <div className="ag-theme-alpine">
                {filteropen?<div className="filterform card">
                    <CourseFilter fetchdata={fetchdata} filterresult={filterresult} setFilterOpen={setFilterOpen} />
                    </div>:
                <div className="sep">
                    <div className="test">
                        <div>
                            <button onClick={() => setFilterOpen(true)}><FontAwesomeIcon color="" icon={faFilter} /></button>
                        </div>
                        <div>
                            <button onClick={() => setIsFormOpen(true)}><FontAwesomeIcon icon={faPlusSquare} /></button>
                        </div>
                    </div>
                </div>}
            <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout={'autoHeight'}
            onGridReady={onGridReady}
            onGridSizeChanged={onGridReady}
            onCellClicked={onCellClicked}
            >
        </AgGridReact>
        </div>
            }
            
        </div>

    )

}

export default Courses