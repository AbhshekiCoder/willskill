import  { useEffect } from 'react';
import i from '../Assets/Line (1).png';
import p from '../Assets/icon1.png';
import img from '../Assets/img2.png';
import img2 from '../Assets/img3.png';
import img3 from '../Assets/img4.png';
import img6 from '../Assets/img6.png';
import 'rsuite/dist/rsuite.min.css';
import {Message, Loader} from 'rsuite';
import axios from  'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { setDate } from 'rsuite/esm/internals/utils/date';
let Signup = ()=>{
    let [data, setData] = useState(false);
   useEffect(()=>{
    document.getElementById('Navbar').style.display = "none";


   },[])
    function next(e){
        let form1 = document.querySelector(".form-item");
      
        let name = form1.name.value;
        let email = form1.email.value;
        let role = form1.role1.value;
        if(name == "" || email == ""|| role == ""){
            document.querySelector('.message').style.display = "block";
            document.querySelector('#message').innerText = "this field is required";
            setTimeout(()=>{
                document.querySelector('.message').style.display = "none ";

            },2000)
            return;

        }
        if(role == 'Teacher' || 'Student'){
            setData(true);
            console.log("hello")

        }
        if(role == 'Admin'){
            setData(false);
        }
        document.getElementById("main-container1").style.display = "none";
        document.getElementById("main-container2").style.display = "block";
    }
    function next1(e){
       
        let form = document.querySelector(".form-item1");
        let form1 = document.querySelector(".form-item");
      
        let password = form.password.value;
        let password1 = form.password1.value;
        if(password == "" || password1 == ""){
            document.querySelector('.message').style.display = "block";
            document.querySelector('#message').innerText = "this field is required";
            setTimeout(()=>{
                document.querySelector('.message').style.display = "none ";

            },2000)
            return;

        }
        if(password1 != password){
          
            document.querySelector('.message').style.display = "block";
            document.querySelector('#message').innerText =  "Password Mismatch";
            setTimeout(()=>{
                document.querySelector('.message').style.display = "none ";

            },2000)
          
            return;
        }
     
        document.getElementById("main-container2").style.display = "none";
        document.getElementById("main-container3").style.display = "block";
        e.target.PreventDefault();

    }
    
    let Signup = (e)=>{
      
        let form1 = document.querySelector(".form-item");
        let form2 = document.querySelector(".form-item1");
        let form3 = document.querySelector(".form-item2");
        let name = form1.name.value;
        let email = form1.email.value;
        let role = form1.role1.value;
        let password = form2.password.value;
        let staff = form3.staff.value;
        let address = form3.address.value;
        let data = {
            name: name,
            email: email,
            role: role,
            password: password,
            staff: staff,
            address: address
        };
        let result =  axios.post("http://localhost:5000/Signup", data ).then(result =>{
            alert(result.data);
        });
       
    }
    return(
        <>
        <div className=' absolute w-fit   z-10  mt-6 message hidden  ' style={{marginLeft: "45%"}}>
        <Message type="">
            <strong id = "message"></strong>
         </Message>;
     

        </div>
        <div className='signup main-container  fixed' id = "main-container1">
        <h2 className=' max-sm:text-xl'>Welcome, create your school account</h2>
      
        
        <div> 
     
        <div className='signup-form'>
        <form className='form-item'>
        <p>its our great pleasure to have  you on board</p>
        <div className='admin-name form-item'>
            <input type = "text" placeholder='Enter the name of user' name = "name" required className=''/>
        </div>
      
        <div className='email form-item'>
            <input type = "email" placeholder='Enter the email' name = "email" required className=''/>
        </div>
        <div className='school-name form-item'>
        <label>select your role</label>
        <select className='w-full' name = "role1">
        <option value="Admin">Admin</option>
        <option value="Teacher">Teacher</option>
        <option value = "Student">Student</option>

        </select>
          
        </div>
        <div className='form-item'>
            <div type='submit'  onClick={next} className='w-full h-9 text-white flex justify-center items-center'style={{backgroundColor:"rgba(45, 136, 212, 1)"}}>Next</div>
        </div>
        <div className='flex justify-center  mt-5'>
            Already have an account?<Link to = "/Login" className='  text-blue-500'>Sign in</Link>
        </div>
        <div>

        </div>

        </form>

        </div>
       


        </div>

        </div>
        <div className='signup main-container  fixed hidden' id = "main-container2">
        <h2 className=' max-sm:text-xl'>Udemy School choose your password</h2>
      
        
        <div> 
     
        <div className='signup-form h-fit mt-10  border'>
        <form className='form-item1  pb-4 '>
      
      
        <div className='password1 item  '>
        <label>Choose a password</label>
            <input type = "password" name = "password" className='border mt-3' required/>
        </div>
        <div className='password2 item'>
        <label>Confirm password</label>
        <input type = "password"  name = "password1" className='border mt-3' required/>
        </div>
        <label>password atleast 6 characters</label>
        <div className='form-item'>
           {data?<div onClick={Signup} id = "btn1" className='w-full h-9 text-center text-white flex items-center justify-center ' style={{backgroundColor: "rgba(45, 136, 212, 1)"}}>Submit</div>:<div onClick={next1} id = "btn" className='w-full h-9 text-center text-white flex items-center justify-center ' style={{backgroundColor: "rgba(45, 136, 212, 1)"}}>Next</div>} 
        </div>
       
        <div>

        </div>

        </form>

        </div>
       


        </div>
        <div className='flex  mt-40   ' style={{maxWidth: "800px", marginTop: "100px"}}>
       
       <div> 
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "85px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "155px"}}/></div>
        <img src = {p} alt ="..." className='mt-2' />

        </div>
        
        <div className=''>
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "120px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "190px"}}/></div>
        <img src = {img} alt ="..." className=''/>

        </div>
        <div className=''>
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "133px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "170px"}}/></div>
        <img src = {img2} alt ="..." className='mt-1'/>

        </div>
        <div className=''>
       
        <img src = {img3} alt ="..." className='mt-1'/>

        </div>
        
        
        

        

      
        </div>
        </div>
        <div className='signup main-container  fixed hidden' id = "main-container3">
        <h2 className=' max-sm:text-xl'>Udemy school, Choose your staffs</h2>
      
        
        <div> 
     
        <div className='signup-form h-fit mt-10  border'>
        <form className='form-item2  pb-4 '>
      
      
        <div className='password1 item  '>
       
        <div className='border'>
        <select className=' text-slate-300' name = "staff">
           <option >Number of  staff</option>
           <option>2</option>
           <option>3</option>
           <option>4</option>
           <option>5</option>
           <option>6</option>
           <option>7</option>
           <option>8</option>
           <option>9</option>
           <option>10</option>

           </select>

        </div>
       
        </div>
        <div className='password2 item'>
        <div className='border'>
        <select className=' text-slate-300' name = "address">
           <option >School Address</option>
           <option value ="2">2</option>
           <option value = "3">3</option>
           <option value= "4">4</option>
           <option value = "5">5</option>
           <option value = "6">6</option>
           <option value = "7">7</option>
           <option value = "8">8</option>
           <option value = "9">9</option>
           <option value = "10">10</option>

           </select>

        </div>
        </div>
        <label>Must be atleast 9 characters</label>
        <div className='form-item'>
        <div onClick={Signup} id = "btn1" className='w-full h-9 text-center text-white flex items-center justify-center ' style={{backgroundColor: "rgba(45, 136, 212, 1)"}}>Submit</div>
        </div>
       
        <div>

        </div>

        </form>

        </div>
       


        </div>
        <div className='flex  mt-40   ' style={{maxWidth: "800px", marginTop: "100px"}}>
       
       <div> 
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "85px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "155px"}}/></div>
        <img src = {p} alt ="..." className='mt-2' />

        </div>
        
        <div className=''>
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "120px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "190px"}}/></div>
        <img src = {img} alt ="..." className=''/>

        </div>
        <div className=''>
        <div className='w-fit z-10  absolute  ' style={{marginLeft: "133px", marginTop: "15px"}}><img src = {i} alt = "..." style = {{width: "170px"}}/></div>
        <img src = {img6} alt ="..." className='mt-1'/>

        </div>
        <div className=''>
       
        <img src = {img3} alt ="..." className='mt-1'/>

        </div>
        
        
        

        

      
        </div>
        </div>
       
       
       

        </>
    )
}
export default Signup;