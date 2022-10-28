import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../Sidebar/Sidebar.css"
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import {SidebarData} from "./SidebarData"
import Logo from '../../Images/logo-sm.png'
import { setAriaChecked } from 'ag-grid-community/dist/lib/utils/aria'


interface props {
    setcheck(arg:boolean):void
}


function Sidebar ({setcheck}:props) {

    

    const [isOpen,setIsOpen] = useState(false)



    return (
        <div className={isOpen?'sidebar':'collapsed'}>
            <span className={isOpen?'icon-closed':'icon'} onClick={() => {
                if(isOpen){
                    setIsOpen(false)
                    setcheck(false)
                }
                else{
                    setIsOpen(true)
                    setcheck(true)
                }
            }}>
                {isOpen?<FaIcons.FaBars />:<AiIcons.AiOutlineArrowRight />}
            </span>
            <img src={Logo} />
            {SidebarData.map(({ title,path,icon,classname }) => (
                            
                            isOpen?<a className={classname}>
                                <Link to={path}>
                                    {icon}
                                    <span>{title}</span>
                                </Link></a>:
                                <a className={classname}>
                                <Link to={path}>
                                    {icon}
                                </Link></a>
                        ))}
                
            
        </div>
    )

}
export default Sidebar