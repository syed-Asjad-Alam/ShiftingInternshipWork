import React, { useMemo, useEffect, useRef, useState,useCallback } from "react";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact'
import '../../Body/Body.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridApi, GridReadyEvent } from "ag-grid-community";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPenToSquare,faTrashCan,faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FacultyForm from "./FacultyForm";
import FacultyFilter from "./FacultyFilter";



function Faculties () {
    type AgGridApi = {
        grid?: GridApi;

    }
    
    function actionCellRenderer() {
        return (
            <div className="action">
                <button className="edit"><span><FontAwesomeIcon display={'none'} icon={faPenToSquare}/></span></button>
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
        {field:'instructorid',hide:true},
        {field:'instructor'},
        {field:'courseid',hide:true},
        {field:'course'},
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


        filterresult()
    }
    
    const deleteFaculty = (id:number) => {
        axios.delete(`https://localhost:7034/api/Admin/Faculty/${id}`).then((res) => {
            
        console.log(res.data)
        fetchdata()
    
    })
        .catch((error) => console.log(error))

    }

    const filterresult =(instructor?:string,course?:string) => {
        fetch(`https://localhost:7034/api/Admin/Faculty/AllocatedFaculties?instructor=${instructor == null?"":instructor}&course=${course==null?"":course}`)
        .then((res) => res.json())
        .then((json) => setRowData(json) )
//         
   
}

    function onCellClicked(params:any) {
        if (params.column.colId === "action" && params.event.path[0].className === "del" ) {
            deleteFaculty(params.node.data.id)
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
                <h4>Faculties</h4>
            </div>
            {isFormOpen?<FacultyForm params={params} setparams={setparams} setIsFormOpen={setIsFormOpen} fetchdata={fetchdata} />:
            <div className="ag-theme-alpine">
                {filteropen?<div className="filterform card">
                        <FacultyFilter fetchdata={fetchdata} filterresult={filterresult} setFilterOpen={setFilterOpen} />
                    </div>:
                <div className="sep">
                    <div className="test">
                        <div>
                            <button onClick={() => setFilterOpen(true)}><FontAwesomeIcon icon={faFilter} /></button>
                        </div>
                        <div>
                            <button onClick={() => setIsFormOpen(true)}><FontAwesomeIcon icon={faPlusSquare} /></button>
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

export default Faculties