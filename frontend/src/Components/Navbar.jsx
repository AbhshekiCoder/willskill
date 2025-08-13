import React, { useState, useEffect, useContext, useReducer } from 'react';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../profilecontext';
import axios from 'axios'

import { auth } from '../firebase/firebase';
import { signOut } from '../firebase/firebase';
import Profile from './Navbar/Profile';
import Sidebar from '../Components/Sidebar'
import { useSelector } from 'react-redux';

export default function Navbar({sidebar_open}) {
	let url = import.meta.env.VITE_URL
	let user = useSelector((state) =>  state.name.value);
	console.log(user)
  	const [ishovered, setIshovered] = useState(false)

	const [courses, setCourses] = useState();
   
	const [login, setLogin]  = useState(false);
	
	const [filter, setFilter] = useState();
	const[courses1, setCourses1] = useState();
	const[course, setCourse] = useState()
	
    const Navigate = useNavigate()
	const name = useContext(ProfileContext)
  function hovered(){
    setIshovered(true)
  }
  function unhovered(){
	setIshovered(false)
  }
  function showProfile(){
	document.querySelector('.profile').style.display = "block"

  }

 
  
  

  
  
	useEffect( ()=>{
		data();
		let token = localStorage.getItem("token");
		if(token){
			
			setLogin(true)
		}
		else{
			
			setLogin(false)
		}
		console.log(name)
		

	
	
	  
	},[])
	useEffect( ()=>{
		data();
		let token = localStorage.getItem("token");
		if(token){
			
			setLogin(true)
		}
		else{
			
			setLogin(false)
		}
		console.log(name)
		

	
	
	  
	},[sidebar_open])
	
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
			array1.push({"name": array[i].type, "id": array[i]._id});
			console.log(array1)
		}
	   }
	   
	 
	   let array2 = [];
	   for(let i = 0; i< array1.length; i++){
		let match = false;
		for(let j = 0; j< array2.length; j++){
			if(array1[i].name == array2[j].name){
				match = true;
				break;
			}
		}
		if(!match){
			array2.push({"name": array1[i].name, "id": array1[i].id});
		}
	   }
	 console.log(array2)
	  setCourses(array2);
	  
	  
	  
	}
	let courses_type = (e) =>{
		let array2= [];
		
	 for(let i = 0; i<filter.length; i++){
		
	  if(filter[i].type == e){
		  array2.push({"title":filter[i].title, "id": filter[i]._id})
		
		  
	  }
	  console.log(array2)
   }
   console.log(array2)
   setCourses1(array2)
		document.querySelector('.coursetype').style.display = "block";
	}
  
	function logout(){
		console.log("hello")
		localStorage.removeItem("token");
	  
		
		setLogin(false)
		document.querySelector('.profile').style.display = "none"
	
		
	
	
	
	  }
	function courses_detail(e){
		localStorage.setItem('id', e);
		Navigate('/courses')

	}
	function input(e){
	  setCourse(e.target.value)
	}
	let  search = async()=>{
	
		let result =  await axios.get(`${url}searchcourses/${course}/searchcourses/${course}`);
		if(result.data.success){
			localStorage.setItem("id", result.data.id)
			Navigate('/courses')
		}
	    else{
			localStorage.removeItem("id")
			Navigate('/courses')
		}
		
	}
  return (
   <>
      <div className='navbar sticky-top z-10 flex items-center justify-between font-sans text-black' style={{backgroundColor:'white',boxShadow:'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px'}}>

        {/* Frame-1 */}
        <div className='flex justify-between h-full items-center ml-8'>

            {/* Logo */}
            <div className= 'logo mr-7 '>
             <Link to = "/">   <img src={logo} alt = "" className='w-full object-cover'/></Link>
            </div>
	
			<div className='h-12 relative max-xl:hidden '>
			{/* courses and hovered div */}
			<div className='relative ' onMouseOver={hovered}  style={{marginTop:'10px'}}>
        		{/*hoveredDiv*/}
		        	{(ishovered && 
					<div className='flex absolute text-lg text-white ' onMouseLeave={unhovered}  style={{top:'175%', borderRadius:'3px',fontWeight:'500',zIndex:9999,boxShadow:'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px'}}>
					<div className='' style={{width: '300px'}}>
                

					{/*Section 2 */}
					{courses?courses.map(Element =>(
						<div className=' group flex border-b border-gray-900  hover:border-none justify-between items-center pl-6 pr-6 hover:bg-gray-200  bg-purple-50 hover:cursor-pointer' style={{height:'50px'}} onMouseOver={()=>courses_type(Element.name)}>
		        		    <div className=''>
		        			  	<a className='hover:no-underline  text-gray-700 group-hover:text-purple-600' href="">{Element.name}</a>
		        		  	</div>
		        			<div>
		        				<i className='fa-solid fa-angle-right text-black '></i>
		        			</div>
		        		</div>

					)):''}
		            	

					
		           
		    		</div>
					<div className='hidden    h-fit w-80 z-10    text-gray-700   coursetype' onMouseLeave={()=>{document.querySelector('.coursetype').style.display = "none"}} >
					{courses1?courses1.map(Element =>(
						<div className='w-full  text-lg  border-b-2 pl-3 pr-3 h-12 flex items-center hover:bg-gray-200  hover:text-purple-600  bg-purple-50 hover:cursor-pointer' onClick={()=>courses_detail(Element.id)} id={Element.id}>{Element.title}</div>

					)):''}
	                </div>
					</div>
					)}
					
					

            {/* Courses */}
              <div className='w-24 text-lg flex items-center font-inter relative cursor-pointer' style={{fontWeight:'500'}} >

              	<div className={`${ishovered?'text-purple-900':'text-white'}`}> {/*headline*/}
                	<Link to ="/Courses"><p className=' mr-2 text-black' >Courses</p></Link>
                  </div>

                  <div> {/*arrow icon*/}
                      <i className= {`fa-solid text-white fa-angle-right transition-transform duration-200 ${ishovered?'rotate-90 ':''} `}></i>
                  </div>
              </div>
			  {/* div to be used for hovering
			  {(ishovered && <div className='h-4 border '></div>)} */}
			
			</div>
			</div>
        </div>


        {/* Search Bar*/}
		
        <div className=' w-fit flex justify-around items-center rounded-full font-inter  max-xl:hidden' style={{backgroundColor:'#ECE6F0'}}>
          
          <div className=''> {/*Input box */}
            <input className = 'w-64 h-11 rounded-tl-full rounded-bl-full pl-5 pr-3 text-base placeholder-gray-500 outline-none'type="text" style={{backgroundColor:'#ECE6F0'}} placeholder='Search' onChange={input}/>
          </div>

          <div className=' search-bar w-fit text-lg mr-5'>
            <i className=" magnify rounded-full fa-solid fa-magnifying-glass cursor-pointer text-black" onClick = {search}></i>
          </div>
        </div>

		{/* Category */}
        <div className='Category flex justify-between items-center  from-neutral-900 font-inter text-lg max-xl:hidden' style={{fontWeight:'500'}}>
          <div className='mr-7'>
            {/* <p className='cursor-pointer hover:text-purple-900'>Plan & Pricing</p>*/}
			<Link to ="/resume" className ='cursor-pointer hover:no-underline hover:text-purple-900 hover:font-medium' >Edit Resume</Link>
          </div>

          <div className='mr-7'>
			<Link to = "/quiz" className='hover:no-underline cursor-pointer hover:text-purple-900 hover:font-medium' >Quiz</Link>
            {/* <p className='cursor-pointer hover:text-purple-800 hover:font-medium'>Tech Temple Bussiness</p> */}
          </div>

          <div  className='mr-7'>
			<Link to="/successtories" className='hover:no-underline cursor-pointer hover:text-purple-900 hover:font-medium' >Success Stories</Link>
            {/* <p className='cursor-pointer hover:text-purple-800 hover:font-medium'>Success Stories</p> */}
          </div>
        </div>

        {/* Porfile Login Signup */}
        <div className='flex justify-between  items-center h54-12 font-normal text-purple-600  text-lg mr-8  max-xl:hidden  '>
          {login? 	  <div className='flex items-center'>
          <div className='text-purple-900'>
			<button className=' h-10 rounded-lg bg-gray-300 hover:bg-purple-600 border-2 border-purple-700 hover:border-gray-300 font-semibold  mr-8 hover:text-white font-sans' style= {{fontSize:'17px',width:'90px'}}onClick={logout}>Log out</button>
          </div>

          <div className='h-full flex items-center mr-3'>
        <i className=" cursor-pointer fa-regular fa-circle-user bg-gray-300 hover:bg-gray-200 rounded-circle  " style={{fontSize:'39px'}}  onMouseOver={showProfile}></i>
		  
          </div>

          </div>:<div className='flex'>
			<div className='text-purple-800'>
          <Link to = "/login">  <button className='signin-n transition-all  ease-in-out  h-10 rounded-lg  border-2 border-purple-600 hover:border-purple-300  mr-8 hover:text-white font-sans bg-purple-300 hover:bg-purple-500 'style={{width:'90px',fontWeight:'500'}}>Log In</button> </Link>
          </div>

          <div className=' rounded-lg bg-gray-200'><div>

          <Link to = "/Signup" > <button className=' h-10 rounded-lg transition-all duration-200 ease-in-out  border-2 border-purple-600 hover:border-purple-300  text-purple-500 hover:text-white font-sans hover:bg-purple-600'style={{width:'90px',fontWeight:'500'}}>Sign up</button></Link>
		  </div>
          </div>
          </div>
	
          }
         
			{/* Profile Section */}

			 <Profile/>
				
			{/* ------------------ */}
        </div>
		<div className='hidden items-center max-xl:flex mr-6 text-2xl' >
		<i class="fa-solid fa-bars" onClick={sidebar_open}></i>

		</div>
		</div>
		
		

   </>
  )
}