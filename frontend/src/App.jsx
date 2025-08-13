import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './Pages/Signup'
import './App.css'
import './CSS/common.css'


import Login from './Pages/Login'

import 'rsuite/dist/rsuite.min.css';
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import { Loader } from 'rsuite';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import axios from 'axios';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoutes';
import Dashboard from './Pages/Dashboard';
import { ProfileProvider } from './profilecontext'
import CourseDetail from './Pages/CourseDetail'
import Sidebar from './Components/Sidebar'

import Singin from './Pages/Singin'
import StudentDashboard from './Pages/StudentDashboard'
import Quiz from './Pages/Quiz'
import Courses from './Pages/Courses'
import Register from './Pages/Register'
import dotenv from 'dotenv'
import TeacherDashboard from './Pages/TeacherDashboard'

import { useDispatch } from 'react-redux'
import { userinfo } from './features/userinfo'
import Video from './Pages/Video'
import PlanPricing from './Pages/PlanPricing'
import SuccessStories from './Pages/SuccessStories'
import Business from './Pages/Business'
import ResumeBuilder from './Pages/ResumeBuilder'


let url = import.meta.env.VITE_URL


// import Demo from './Components/demo'

function App() {


  
  let [username, setUserName] = useState();
  let [profile, setProfile] = useState(false);
  let [num, setNum] = useState(1);
  let dispatch = useDispatch()

let data = async()=>{
  let token = localStorage.getItem('token');
if(token){
 let result1 = await axios.post(`${url}user_detail/user_detail`, {token});
let data = result1.data.name.split(' ');

setUserName(data[0])
console.log(data[0])
setProfile(true);
dispatch(userinfo(data[0]))
}
else{
  setProfile(false)
}
}








  let sidebar_open =async()=>{
    let token = localStorage.getItem('token');
    setNum(num + 1);
    if(token){
      let result1 = await axios.post(`${url}user_detail/user_detail`, {token});
     let data = result1.data.name.split(' ');
     setUserName(data[0])
     console.log(data[0])
     setProfile(true);
     
     }
     else{
      setProfile(false)
     }
   
for (const key in object) {
  if (Object.prototype.hasOwnProperty.call(object, key)) {
    const element = object[key];
        console.log('click')
  }
}
    
  }
  function logout(){
    console.log("hello")
    localStorage.removeItem("token");

	
	setProfile(false);

	



  }
  





  useEffect(()=>{
    data();
  
   

  },[])
  useEffect(()=>{
    if(num % 2 == 0){
      document.querySelector('.sidebar').style.display = "block"; 
      console.log(num)
     

    }
    else{
      console.log(num)
      document.querySelector('.sidebar').style.display = "none"; 
    }

  },[num])
  

  return (
    <>
    

 
    <Sidebar username={username} profile={profile} logout={logout} />
  <ProfileProvider>
  <Routes>
    <Route element = {<PrivateRoute/>}>
    <Route path = "/Dashboard" element={<Dashboard/>}></Route>
    <Route path='/teacher' element={<TeacherDashboard/>}></Route>
  
    </Route>
     <Route element = {<PublicRoute/>}>
     <Route path = "/login" element={<Login/>}></Route>
      <Route path = "/Signup" element = {<Signup/>}></Route>
      <Route path='/' element ={<Home  sidebar_open={sidebar_open} profile={profile} logout={logout}/>}></Route>
      <Route path='/CourseDetail' element ={<CourseDetail />}></Route>
      <Route path='/signin' element ={<Singin/>}></Route>
      <Route path='/StudentDashboard' element ={<StudentDashboard/>}></Route>
      <Route path='/quiz' element ={<Quiz/>}></Route>
      <Route path='/courses' element ={<Courses sidebar_open={sidebar_open} profile={profile} logout={logout}/>}></Route> 
      <Route path= '/register' element={<Register/>}></Route>
      <Route path = '/teachers' element = {<TeacherDashboard/>}></Route>
      <Route path= '/Video' element= {<Video/>}></Route>
      <Route path='/planpricing' element={<PlanPricing/>}></Route>
      <Route path='/successtories' element={<SuccessStories/>}></Route>
      <Route path='/business' element={<Business/>}></Route>
      <Route path="/resume" element={<ResumeBuilder/>}></Route>
      
   
   
     </Route>
    </Routes>
    <Footer/>
    
 

  </ProfileProvider>
  
   
      

   
      
    
    
    </>
  )
}

export default App
