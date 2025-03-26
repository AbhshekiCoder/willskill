import React, { useState, useEffect } from 'react'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'

import {signInWithPopup} from 'firebase/auth';
import axios from 'axios'
import { Message } from 'rsuite';
import {auth} from '../firebase/firebase';

import {GoogleAuthProvider} from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { PhoneAuthProvider } from 'firebase/auth'
import {Link, useNavigate} from "react-router-dom"

import {Loader} from 'rsuite';
let url = import.meta.env.VITE_URL
export default function Signup() {
	 
	let [type, setType] = useState("success");
	let navigate = useNavigate();
	let register = async(e)=>{
		document.getElementById("loading").style.display = "flex";
		e.preventDefault();
		let form = document.forms['Signupform'];
		console.log(form.name.value)

		let name = form.name.value;
		let email = form.email.value;
		let password = form.password.value;
		let obj = {
			name: name,
			email: email,
			password: password
		}
		
		let result = await axios.post("http://localhost:3000/register/register", obj);
		console.log(result.data)
		if(result.data.success){
			setType("success");
		
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			document.getElementById("loading").style.display = "none";
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById("loading").style.display = "none";

			},2000)
			setTimeout(()=>{
				navigate('/login')

			},4000)


		}
		else{
			setType("warning");
		
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById("loading").style.display = "none";

			},2000)


		}


		

	}

	let  google_authentication = async()=>{
		console.log("hello")
		const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider).then(async(res)=>{
let obj ={
	name: res.user.displayName,
	email: res.user.email
}
let result = await axios.post(`${url}register_apps`, obj);
		if(result.data.success){
			let result1 = await axios.post(`${url}token`, {token: result.data.token });
			if(!result1){
				setType("warning");
				document.querySelector('.message').style.display = 'block';
				document.getElementById("message").innerText = result1.data.message;
				setTimeout(()=>{
					document.querySelector('.message').style.display = 'none';
	
				},2000)
				
	
			}
			else{
				setType("success");
			
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';

			},2000)
			  
			localStorage.setItem("token", result.data.token);
			setTimeout(()=>{
				navigate('/')

			},4000)

		}
	}
		else{
			setType("warning");
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';

			},2000)


		}
  console.log(obj)
	}).catch((err)=>{
	 console.log(err);
	})
	
	}

	
	let facebook_authentication = async()=>{
		const provider = new PhoneAuthProvider();
	    signInWithPopup(auth, provider).then(async(res)=>{
			console.log(res)
		
				}).catch((err)=>{
				 console.log(err);
				})
	}
	
  return (
	<>
	<div className='loading absolute text-2xl w-full h-full z-10 opacity-50 flex justify-center items-center hidden' id = "loading">

<Loader className='fixed ' size='md'/>
</div>

   <div className='flex justify-center w-full h-fit   fixed'>
   <Message type={type} bordered showIcon    placement = "topCenter" className='mt-6 hidden message' >
	<strong id = "message">Success!</strong> 
   </Message>

   </div>
	
    <div className='Signup flex  w-full h-screen  '>
	   
      
      	<div className='m-auto pl-4 pr-4 SignupFrame2 ' style={{maxWidth: '600px'}} >
			<div id = "SignupFrame2">
				<div className='text-center'>
				<p className='font-semibold text-4xl mt-16 mb-12 text-purple-700 '>Sign Up And Start <br />Learning</p>
				</div>
				
				<div>
				<form action="" name = "Signupform" onSubmit={register}>
					<div>
					<input type="text" className='w-full h-10 border border-black border-1 rounded-md pl-3 pr-3 ' name = "name" placeholder='Full name'   required />
					</div>

					<div>
					<input type="email" className='w-full h-10 border border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Email' name="email" required />
					</div>

					<div>
					<input type="password" className='w-full border h-10 border-black border-1 rounded-md pl-3 pr-3 mt-8' placeholder='Password' name="password" required/>
					</div>

					<div>
						<button className='w-full text-white h-10 mt-8  text-lg font-bold ' style={{backgroundColor:'#920DE3'}}>Sign Up</button>
					</div>

					
					<div className='flex justify-around mt-10'> 
						<div className='w-fit'>
							<input type="checkbox" className='border-2 h-6 border-black' name='checkbox' />
						</div>

						<div className='pl-3  w-fit'>
							<p className='text-sm '>Send me special offer personalized recommendations, and learning tips.</p>
						</div>
					</div>
				</form>

				<div className='flex justify-between w-44 m-auto pt-8  items-center'>
					<img className = 'h-9 w-8 ' src ={google} onClick={google_authentication}/>
					<img className = 'h-8 w-8  rounded-circle' src ={facebook} style={{backgroundColor:'#1877F2'}} onClick={facebook_authentication}/>
					<img className = 'h-8 w-8 ' src ={apple}/>
				</div>

				<div>
					<div className='text-sm w-fit pt-5 flex justify-center flex-wrap m-auto '>
						<p className='mr-1 font-semibold  '>By Signing Up, You Agree To Our</p> 
						<a href="" className='font-semibold text-purple-700 '><u>Terms & Use</u></a>
						 <p className='w-fit font-semibold ml-1 mr-1'> and </p>
						<a href="" className='w-fit font-semibold text-purple-700 '> <u>Privacy Policy </u></a>
					</div>

					<div className='flex w-fit m-auto pt-3'>
						<p className='mr-2 font-semibold text-lg'>Already Have An Account?</p>
						<Link to = "/login" className='text-purple-700 text-lg'><u>Log In</u></Link>
					</div>
				</div>

		
      			</div>
    		</div>
		</div>
	</div>
	</>
  )
}

