import React from 'react'
import "../Header/Header.css"
import HeaderImage from '../../Images/Image.jpeg'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import Pakistan from "../../Images/pakistan.png"
import asjad from "../../Images/asjad.jpg"
import { IconBase } from 'react-icons/lib'

// interface  props {
//     check:boolean
// }


function Header() {

    return(
        <div className='header'>
            <div className='pakistan'><img src={Pakistan} /></div>
            <div><BiIcons.BiCategoryAlt /></div>
            <div>
                <AiIcons.AiOutlineShopping/>
                <span style={{backgroundColor:'lightskyblue'}}>5</span>
            </div>
            <div><BsIcons.BsBoundingBoxCircles /></div>
            <div><FaIcons.FaRegMoon /></div>
            <div>
                <IoIcons.IoMdNotificationsOutline/>
                <span style={{backgroundColor:'red'}}>6</span>
            </div>
            <div className='userprofile'>
                <div className='asjad'>
                    {/* <FaIcons.FaUser /> */}
                    <img src={asjad} />
                </div>
                <div className='upText'>
                        <h5>Syed Asjad Alam</h5>
                        <h6>Intern</h6>
                </div>

            </div>
            
            

           
        </div>
    )
}

export default Header;