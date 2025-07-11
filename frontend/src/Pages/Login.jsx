import {React, useEffect, useReducer, useState} from 'react'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'

import axios from 'axios'
import { Message } from 'rsuite';
import {signInWithPopup} from 'firebase/auth';


import {auth} from '../firebase/firebase';

import {GoogleAuthProvider} from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
let url = import.meta.env.VITE_URL
import {Loader} from 'rsuite'
import { userinfo } from '../features/userinfo'
import { useDispatch } from 'react-redux'





export default function Login() {

	let [type, setType] = useState("success");
    let navigate = useNavigate();
	let dispatch = useDispatch()

	useEffect(()=>{
		document.querySelector('.modal').style.display = 'none'

	},[])
	let signin = async(e)=>{
		document.getElementById('loading').style.display = "flex";
		e.preventDefault();
		let form = document.forms['Signinform'];
		let email = form.email.value;
		let password = form.password.value;
		let obj = {
			email: email,
			password: password
		}

		let result = await axios.post(`${url}login/login`, obj);
		if(!result.data.success){

			setType("warning");
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById('loading').style.display = "none";

			},2000)

		}
		else{
			let result1 = await axios.post(`${url}token`, {token: result.data.token });

			if(!result1){
				setType("warning");
				document.getElementById('loading').style.display = "block";
				document.querySelector('.message').style.display = 'block';
				document.getElementById('loading').style.display = "none";

				document.getElementById("message").innerText = result1.data.message;
				setTimeout(()=>{
					document.querySelector('.message').style.display = 'none';
					document.getElementById('loading').style.display = "none";
	
				},2000)
			}
			else{
				setType("success");
				console.log(result.data.user)
				dispatch(userinfo(result.data.user.name.split(' ')[0]))
				
			
			document.querySelector('.message').style.display = 'block';
			
			document.getElementById("message").innerText = result.data.message;
			
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById('loading').style.display = "none";

			},2000)
			  
			localStorage.setItem("token", result.data.token);
			setTimeout(()=>{
				navigate('/')
				

			},4000)
		
			
			}
			
		}
	}
	
	let  google_authentication = async()=>{
		document.getElementById('loading').style.display = "flex";
		
		const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider).then(async(res)=>{
		let credentials = GoogleAuthProvider.credentialFromResult(res);
		let token = credentials.accessToken;
		console.log(res.user.displayName)
let obj ={
	name: res.user.displayName,
	email: res.user.email,
	token: token
}

let result = await axios.post(`${url}register_apps/register_apps`, obj);
		if(!result.data.success){
			setType("warning");
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById('loading').style.display = "none";

			},2000)

		}
		else{
			let result1 = await axios.post(`${url}token`, {token: result.data.token });
			if(!result1){
				setType("warning");
				document.querySelector('.message').style.display = 'block';
				document.getElementById("message").innerText = result1.data.message;
				setTimeout(()=>{
					document.querySelector('.message').style.display = 'none';
					document.getElementById('loading').style.display = "none";
	
				},2000)
			}
			else{
				setType("success");
				dispatch(userinfo(res.user.displayName.split(' ')[0]))
				
			
			document.querySelector('.message').style.display = 'block';
			document.getElementById("message").innerText = result.data.message;
			setTimeout(()=>{
				document.querySelector('.message').style.display = 'none';
				document.getElementById('loading').style.display = "none";

			},2000)
			  
			localStorage.setItem("token", result.data.token);
			setTimeout(()=>{
				navigate('/')

			},4000)
			
			}
			
		}
  console.log(obj)
	}).catch((err)=>{
	 console.log(err);
	})
	
	}

	
	let facebook_authentication = async()=>{
		const provider = new FacebookAuthProvider();
	    signInWithPopup(auth, provider).then(async(res)=>{
			console.log(res)
		
				}).catch((err)=>{
				 console.log(err);
				})
	}
	let github_authentication = async()=>{
		const provider = new GithubAuthProvider();
	    signInWithPopup(auth, provider).then(async(res)=>{
			console.log(res)
		
				}).catch((err)=>{
				 console.log(err);
				})

	}
  return (
	<> 
	<div className='loading  text-2xl w-full h-full z-10 opacity-50 flex justify-center items-center modal hidden' id = "loading">

<Loader className=' ' size='md'/>
</div>
	<div className='w-full h-fit flex justify-center  fixed '>
   <Message type={type} bordered showIcon    placement = "topCenter" className='mt-6 hidden message' >
	<strong id = "message">Success!</strong> 
   </Message>

   </div>
	
    <div className='Signup flex w-full h-screen overflow-hidden'>
      
      	<div className='m-auto pl-4 pr-4 SignupFrame2 ' style={{maxWidth: "600px"}} >
			<div id = "SignupFrame2">

				<div className='text-center font-inter mt-3'>
				<p className='font-semibold text-4xl mt-8 mb-1 leading-normal'>Log In To Continue Your Learning Journey</p>
				</div>
				
				<div>
				<form action="" name = "Signinform" onSubmit={signin}>

					<div className='w-8/12 m-auto  max-sm:w-10/12'>
					<input type="email" className='w-full h-10 border rounded-md pl-3 pr-3 mt-8' placeholder='Email' name="email" required />
					</div>

					<div className='w-8/12 m-auto max-sm:w-10/12'>
					<input type="password" className='w-full h-10 border rounded-md pl-3 pr-3 mt-8' placeholder='Password' name="password" required/>
					</div>

					<div className='w-8/12 m-auto max-sm:w-10/12'>
						<button className='w-full text-white h-10 mt-8 font-semibold text-xl ' style={{backgroundColor:'#920DE3'}}>Submit</button>
					</div>
					<div className='w-8/12 m-auto max-sm:w-10/12'>

					
					<div className='flex justify-evenly w-full items-center mt-11'>
                    <hr className='border-2 flex-grow' style={{borderColor:'#AEAEAE'}}/>
                    <p className='ml-2 mr-2 font-semibold' style={{color:'#AEAEAE'}}>Other Log In Options</p>
                    <hr className='border-2 flex-grow' style={{borderColor:'#AEAEAE'}}/>
                </div>

				<div className='flex justify-between w-8/12 m-auto pt-8 hover:cursor-pointer'>
					<img className = 'h-9 w-8' src ={google} onClick = {google_authentication}/>
					<img className = 'h-8 w-8 rounded-circle' src ={facebook} style={{backgroundColor:'#1877F2'}} onClick={facebook_authentication}/>
					<img className = 'h-8 w-8' src ={apple} onClick={github_authentication}/>
				</div>
				</div>


					
				</form>

               
				<div className='mt-8'>
					<div className='w-full h-10 flex justify-center items-center text-lg' >
						<p className='font-semibold mr-2'>Don't Have An Acoount?</p>
						<Link to = "/Signup" className='text-purple-800 font-semibold'>Sign Up</Link>
					</div>

					

                    <div className='w-full h-10 flex justify-center items-center text-purple-800' >
                        <p className='font-semibold text-lg' ><Link to = "/register">Login with your organization</Link></p>
                    </div>
				</div>

		
      			</div>
    		</div>
		</div>
	</div>
	</>
  )
}

