import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import '../../Body/Body.css'
// import "jquery-jvectormap.scss"
import ImageSlider from './ImageSlider'
import {SlidesData} from './SlidesData'
import {VectorMap} from "@react-jvectormap/core"
import {worldMill} from "@react-jvectormap/world"
import * as HiIcons from  "react-icons/hi"
import * as BiIcons from "react-icons/bi"
import * as FcIcons from "react-icons/fc"
import { Line,Bar } from "react-chartjs-2";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement }  from "chart.js";
import {ChartData} from "./Chart/ChartData"
import {DepartmentData} from "./Chart/DepartmentData"
import axios from 'axios'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
  );


 






function Dashboard() {

    const [coursesCount,setCoursesCount] = useState<number>()
    const [studentsCount,setStudentsCount] = useState<number>()
    const [depsCount,setDepsCount] = useState<number>()
    const [instructorsCount,setInstructorsCount] = useState<number>()

    const [Chart,setChart] = useState<any[]>([])



    const [data,setdata] = useState({
      labels: ChartData.map((data) => data.year),
      datasets: [{
        label:"Revenue Earned",
        data:ChartData.map((data) => data.revenue),
        // backgroundColor: [],
        fill:true,
        backgroundColor: 'lightblue',
        borderColor:["rgb(41, 156, 219)"],
      }]
    })

    var Depdata = {
        labels: Chart.map((data) => data.title) ,
        datasets: [{
          data: Chart.map((data) => data.students),
          // backgroundColor: [],
          fill:true,
          backgroundColor: ['rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'],
          borderColor:["rgb(41, 156, 219)"],
          
        }],
        
      }

    var chartoptions = {
        plugins: {
            legend:{
                display:false
            }
           
        },
        scales: {
            y:{
                title:{
                    display: true,
                    text:'STUDENTS'
                }
            },
            x:{
                title:{
                    display:true,
                    text:'COURSES',
                    
                },
            }
          }
      }

    

    useEffect(() => {
        GetEntities()
        GetChartData()
    },[])  

    function GetEntities() {
        fetch('https://localhost:7034/api/Admin/GetTotalEntities')
        .then((res) => res.json())
        .then((json) => {
            setCoursesCount(json[0].courses)
            setStudentsCount(json[0].students)
            setDepsCount(json[0].departments)
            setInstructorsCount(json[0].instructors)
        })
    }

    function GetChartData() {
        fetch('https://localhost:7034/api/Admin/GetTotalStudents').then((res)=>res.json())
        .then((json)=> {
           setChart(json)
            

        })
    }

    
    

    return (
        <div>
            <div className="ontop">
                <h4>Dashboard</h4>
            </div>
            <div>
                <div>
                    <div className='slider'>
                        <ImageSlider slides={SlidesData}/>
                    </div>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className='cardwithiconrow'>
                            <h5>Courses Offered</h5>
                            <div><BiIcons.BiBookReader /></div>
                        </div>
                        <div>
                            <h4><CountUp end={coursesCount!} duration={0.5} /></h4>
                        </div>
                        <div>
                            <h3><a>View all courses</a></h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className='cardwithiconrow'>
                            <h5>Students</h5>
                            <div><HiIcons.HiOutlineUsers /></div>
                        </div>
                        <div>
                            <h4><CountUp end={studentsCount!} duration={0.5} /></h4>
                        </div>
                        <div>
                            <h3><a>View students</a></h3>
                        </div>
                    </div>
                </div>
                <div className='cards'>
                  <div className="card">
                          <div className='cardwithiconrow'>
                              <h5>Departments</h5>
                              <div><FcIcons.FcDepartment /></div>
                          </div>
                          <div>
                              <h4><CountUp end={depsCount!} duration={0.5} /></h4>
                          </div>
                          <div>
                              <h3><a>View all Departments</a></h3>
                          </div>
                      </div>
                      <div className="card">
                          <div className='cardwithiconrow'>
                              <h5>Instructors</h5>
                              <div><FcIcons.FcGraduationCap /></div>
                          </div>
                          <div>
                              <h4><CountUp end={instructorsCount!} duration={0.5} /></h4>
                          </div>
                          <div>
                              <h3><a>View all instructors</a></h3>
                          </div>
                      </div>
                    </div>
                    <div className='cards'>
                    <div className='chart'>
                    <div className='chartheader'>
                        <h4 className='charttitle'>Our Progress</h4>
                    </div>
                        <Line data={data} />
                    </div>
                    <div className='chart'>
                    <div className='chartheader'>
                        <h4 className='charttitle'>Courses SOS</h4>
                    </div>
                        <Bar data={Depdata} options={chartoptions} />
                    </div>
                </div>
            </div>
            {/* <div className='worldmap'>
            <VectorMap
            map={worldMill} 
            backgroundColor="#FFF"
            style={{width:'100%',height:'100%'}}
            markerStyle={{
                initial: {
                  fill: "#FFFF",
                  stroke: "#383f47"
                }
              }}
              series={{
                markers: [
                  {
                    attribute: "r",
                    scale: [5, 20],
                    values: [60, 6, 54],
                    normalizeFunction: "polynomial"
                  }
                ]
              }}
              regionStyle={{
                initial: {
                  fill: "#128da7"
                },
                hover: {
                  fill: "#A0D1DC"
                }
              }}
              
              
              
              />


            </div> */}
            
        </div>

    )

}

export default Dashboard