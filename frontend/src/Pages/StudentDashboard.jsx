import React, { useEffect, useState } from 'react'
import '../CSS/StudentDashboard.css';
import axios from 'axios';
let url = import.meta.env.VITE_URL
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';


export default function StudentDashboard() {
  let Navigate = useNavigate();
  const [courses, setCourses] = useState();
  const [login, setLogin] = useState(false);
  let data = async()=>{
    let token = localStorage.getItem('token')
   
    if(token){
      setLogin(true)
      let result = await axios.post(`${url}enroll_courses/${token}/enroll_courses/${token}`);
      setCourses(result.data)
      console.log(result.data)
    }
    else{
      Navigate('/')
    }



  }
  useEffect(()=>{
    data();

  },[])
  function logout(){
    localStorage.removeItem("users");
    Navigate('/signin')
  }
  function syllabus(id){
    localStorage.setItem("topic_id", id);
    Navigate('/Video');


}
  return (
    <> 
    <div className='main-container mb-6'>
   
   <nav className='flex justify-between items-center sticky-top bg-gray-100 h-16 ' style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
    <div className='logo ml-3'>
    <Link to='/'>Will Skill</Link>

    </div>
    <div>
      <button className=' h-9  w-24 bg-purple-500 text-white mr-3 rounded-xl font-bold' onClick={logout}>Log out</button>
    </div>
   </nav>
    <div className=' mt-56 max-w-6xl m-auto '>
    <table className='w-full h-fit  mt-36'>
        <tr className='font-bold text-lg text-white bg-purple-600 h-10  max-sm:h-fit max-sm:block rounded-lg'>
            <th className='pl-3 max-sm:block'>Trainings</th>
            <th className='max-sm:block pl-3'>Start Date</th>
            <th className='max-sm:block pl-3'>End Date</th>
            <th className='max-sm:block pl-3'>Amount</th>
            <th className='max-sm:block pl-3'>Status</th>
        </tr>
        {courses?courses.map(Element =>(
          <tr className='font-bold h-16 border-b max-sm:h-fit max-sm:block'>
            <td className='max-sm:block p-3 max-sm:mt-3 bg-gray-200 '>{Element.name}</td>
            <td className='max-sm:block p-3 max-sm:mt-3  bg-gray-200'>{Element.start_date}</td>
            <td className='max-sm:block p-3 max-sm:mt-3  bg-gray-200'>{Element.end_date}</td>
            <td className='max-sm:block p-3 max-sm:mt-3  bg-gray-200'>{Element.price}</td>
            <td className='max-sm:block p-3 max-sm:mt-3  bg-gray-200'><button className='w-full h-full p-2 bg-purple-400 text-white rounded-md' id={Element.course_id} onClick={()=>syllabus(Element.course_id)}>Go to Training</button></td>
        </tr>

        )): <div className='loading  text-2xl w-full h-full z-10 opacity-50 flex justify-center items-center    border' id = "loading">

<Loader className=' ' size='md'/>
</div>
}
        
       
    </table>

    </div>
    </div>
    </>
  )
}
