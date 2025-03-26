import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import url from '../misc/url';
import { ProfileContext } from '../profilecontext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';

export default function Sidebar({username, profile, logout}) {
  const [courses, setCourses] = useState();
  const [courses1, setCourses1] = useState();
  const [filter, setFilter] = useState();
  

	let data = async()=>{
	  let result = await axios.post(`${url}course_detail`);
	 
	   let array = result.data;
	   setFilter(result.data)
	   let array1 = [];
	   console.log(array)
	   for(let i = 0; i< array.length; i++){
		let match = false;
		for(let j = 0; j< array1.length; j++){
			if(array[i].type == array[j].type){
				match = true;
				break;
			}
		}
		if(!match){
			array1.push(array[i].type);
		}
	   }
	   
	 
	   let array2 = [];
	   for(let i = 0; i< array1.length; i++){
		let match = false;
		for(let j = 0; j< array2.length; j++){
			if(array1[i] == array2[j]){
				match = true;
				break;
			}
		}
		if(!match){
			array2.push(array1[i]);
		}
	   }
     console.log(array2)
     setCourses(array2)
    
     }
	
    
 
  useEffect(()=>{
   
    data();
   
   console.log(profile)



  },[])
  let courses_type = (e) =>{
		let array = [];
		
	 for(let i = 0; i<filter.length; i++){
	  if(filter[i].type == e){
		  array.push(filter[i].title)
		  
	  }
   }
   console.log(array)
   setCourses1(array)
   document.querySelector('.sidebar-details').style.display = "none"
   document.querySelector('.course-type').style.display = "block"
	
	}

  function course_modal(){
     document.querySelector('.sidebar-details').style.display = "block"
   document.querySelector('.course-type').style.display = "none"

  }
  

  return (
    <div className='sidebar modal border h-full w-full  hidden max-2xl:block    '>
    <div id = "sidebar" className=' opacity mt-0 '>
       <div className='sidebar-details'>
    
       
       <div className='sidebar-top p-3 border-b-2 border-gray-300'>
       {profile? <div className='  pl-3 text-purple-500 font-bold text-base title'>
        {username}
          
        </div>:<div className='  pl-3 text-purple-500 font-bold text-base'>
         <Link to = "/login">Login</Link> 
        </div>}
       {profile?<div className=' mt-3 pl-3 text-purple-500 font-bold text-base' onClick={logout}>
          Log out
        </div>:<div className=' mt-3 pl-3 text-purple-500 font-bold text-base'>
          Signup
        </div>}
        
        <div className=' mt-3 pl-3 text-purple-500 font-bold text-base'>
          Plan & Pricing
        </div>

       </div>
       <div className='sidebar-middel-section p-3 border-b'>
       <p className='text-gray-600 font-bold text-lg'>Most Popular</p>
       <div className='courses'>
       {courses?courses.map(Element =>(
        <div className=' mt-3 flex justify-between item-center ' >
       <div className='flex justify-start' onMouseOver={()=>courses_type(Element)}> 
        <i className='fa-solid fa-angle-left   text-gray-400 text-lg' ></i>


        </div>
       <div className='font-semibold text-base text-center flex justify-end'>
         {Element}
        </div>
      
       </div>

       )):''}
       

       </div>
      

       
       </div>
       <div className='sidebar-bottom p-3'>
       <div className='mt-3 font-bold text-lg text-gray-500'>
       More from Tech Temple

       </div>
       
       <div className='mt-3 text-gray-400 text-lg font-semibold'>
       Success Stories

       </div>
       <div className='mt-3 text-gray-400 text-lg font-semibold'>
       Help & Support

       </div>

       </div>
       </div>
      
       <div className='course-type hidden w-full h-full'>
       <div className='flex p-3 bg-purple-500'  onClick={course_modal}>
       <i className='fa-solid fa-angle-left   text-white text-lg'></i>
       <div className='ml-3 font-bold text-lg  text-white'>
        Menu
       </div>

       </div>
       <div className='mt-3 p-3'>
       {courses1?courses1.map(Element =>(
          <div className='mt-3'>
            {Element}
          </div>

         )):''}

       </div>
     
       </div>


       

       
    </div>
      
    </div>
  )
}
