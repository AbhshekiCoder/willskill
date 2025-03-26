import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
let url = import.meta.env.VITE_URL
import { Loader, Message } from 'rsuite';

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
               if(result.data.role == "admin"){
                Navigate('/admin')
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
      <div className='Signup flex  w-full h-screen  '>
	   
      
     <div className='m-auto pl-4 pr-4 SignupFrame2 border p-3 ' style={{maxWidth: '600px'}} >
   <div id = "SignupFrame2">
     <div className='text-center'>
     <p className='font-semibold text-3xl mt-16 mb-12 text-purple-700 '>Sign In to Continue Learning</p>
     </div>
     
     <div>
     <form action="" name = "form" onSubmit={login}>
      
       <div>
       <input type="email" className='w-full h-10 border border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Email' name="email" required />
       </div>

       <div>
       <input type="password" className='w-full border h-10 border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Password' name="password" required/>
       </div>
       <div>
      <select className='w-full h-10 border mt-3' name="role">
      <option>
        role
      </option>
        <option value="students">
        Students

        </option>
        <option value="teacher">
        Teachers

        </option>
        <option value="admin">
          Admin
        </option>
      </select>
       </div>

       <div>
         <button className='w-full text-white h-10 mt-8  text-lg font-bold ' style={{backgroundColor:'#920DE3'}}>Sign in</button>
       </div>

       
   
     </form>
     </div>

     </div>
     </div>
      </div>
     
</>
  )
}
