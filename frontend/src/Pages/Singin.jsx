import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
let url = import.meta.env.VITE_URL
import { Loader, Message } from 'rsuite';
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'


export default function () {
    let Navigate = useNavigate()
    let[type, setType] = useState();
    let login = async(e)=>{
      e.preventDefault();
    
        let form = document.forms['form'];
        let email = form.email.value;
        let password = form.password.value;
        let role = form.role.value;
        let obj = {
            email: email,
            password: password,
            role: role
        }
        let result = await axios.post(`${url}signin/signin`, obj );
        if(result.data.success){
             setType("success")
            console.log(result.data.role)
            localStorage.setItem("users", result.data.token)
            document.querySelector('.loading').style.display = "none";
            document.querySelector('.message').style.display = "block";
            document.querySelector('.loading').style.display = "none";
            document.getElementById("message").innerText = result.data.message;
            setTimeout(()=>{
             document.querySelector('.message').style.display = "none";
             if(result.data.role == 'students'){
              Navigate('/StudentDashboard');
               }
               if(result.data.role == "teacher"){
                Navigate('/teachers')
               }
               
 
 
            },2000)
           
        }
        else{
          setType("warning")
          document.querySelector('.loading').style.display = "block";
           document.getElementById("message").innerText = result.data.message;
           document.querySelector('.loading').style.display = "none";
           document.querySelector('.message').style.display = "block";
           setTimeout(()=>{
            document.querySelector('.message').style.display = "none";

           },2000)
        }

    }

  return (
    <>   
    <div className='loading w-full h-full modal'>
    <div className='w-full h-full flex justify-center items-center'>
    <Loader/>

    </div>

    </div>
    <div className='flex justify-center w-full h-fit  fixed'>
   <Message type={type} bordered showIcon    placement = "topCenter" className='mt-6  message hidden' >
	<strong id = "message"></strong> 
   </Message>

   </div>
      
	   
      
     <div className='m-auto pt-20 pl-20 pr-20 max-sm:pl-12 max-sm:pr-12' style={{maxWidth: '650px'}} >
    	<div id = "SignupFrame2" className='mb-20'>
     	
		<div className='text-center pl-8 pr-8 max-sm:pl-1 max-sm:pr-1'>
     		<p className='font-semibold text-4xl mb-12 text-purple-700 '>Sign In to Continue Learning</p>
     	</div>
     
     <div className=''>
     	<form action="" name = "form" onSubmit={login}>
      
       <div>
       		<input type="email" className='w-full h-10 border border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Email' name="email" required />
       </div>

       <div>
       		<input type="password" className='w-full border h-10 border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Password' name="password" required/>
       </div>

       <div>
      		<select className='rounded-md pl-2 pr-5 w-full h-10 border mt-3' name="role">
      			<option>role</option>
        		<option value="students">Students</option>
        		<option value="teacher">Teachers</option>
        		<option value="admin">Admin</option>
      		</select>
       </div>

       <div>
         	<button className='w-full text-white h-10 mt-8  text-lg font-bold ' style={{backgroundColor:'#920DE3'}}>Sign In</button>
       </div>

	   <div className='flex justify-around  max-sm:w-fit mt-10 max-sm:pt-10 max-sm:m-auto'> 
			<div className='w-fit'>
				<input type="checkbox" className='cursor-pointer border-2 h-6 border-black' name='checkbox' />
			</div>

			<div className='pl-3 w-fit'>
				<p className='text-sm w-fit'>Send me special offer personalized recommendations, and learning tips.</p>
			</div>
		</div>
       
   
     	</form>
	
     </div>

     </div>
     </div>
      
     
</>
  )
}