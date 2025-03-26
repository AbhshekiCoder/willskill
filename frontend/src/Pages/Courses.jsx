import CoursesBanner from "./Courses/CoursesBanner";
import Navbar from "../Components/Navbar";
import '../CSS/course.css'
import CoursesCriteria from "./Courses/CoursesCriteria";
import { useEffect, useState } from "react";
import axios from "axios";
function Courses({sidebar_open, profile, logout}){
    let url = import.meta.env.VITE_URL
    let [data, setData] = useState()
    let course = async() =>{
        let id = localStorage.getItem('id')
        let result = await axios.get(`${url}course_detail/${id}/course_detail/${id}`);
        setData(result.data);
        console.log(data)
        
    }
    useEffect(()=>{
        course()

    },[])
    return(
        <>
        <Navbar sidebar_open={sidebar_open } profile={profile} logout={logout}/>
        <CoursesBanner data={data}/>
        <CoursesCriteria data={data}/>
        </>
    )
}
export default Courses;