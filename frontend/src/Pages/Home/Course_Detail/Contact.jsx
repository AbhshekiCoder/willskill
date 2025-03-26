import React from 'react'
import ContactUsImg from '../../../assets/ContactUsImg.png'
import axios from 'axios';
let url = import.meta.env.VITE_URL


let submit = async(e)=>{
    e.preventDefault();
    let form = document.forms['contact-form'];
    let name = form.name.value;
    let email = form.email.value;
    let description = form.description.value;
    let obj = {
        name: name,
        email: email,
        description: description
    }

    let result = await axios.post(`${url}customer_contact`, obj );
    if(result.data.success){
        document.getElementById('message').style.color = "green";
        
        document.getElementById('message').innerText = result.data.message;
        setTimeout(()=>{
            document.getElementById('message').style.display = "none";

        },4000)
        console.log(result.data)
    }
    else{
        document.getElementById('message').style.color = "black";
        document.getElementById('message').innerText = result.data.message;

    }
}


export default function Contact() {
  return (
    <div className='flex w-full  mt-10 max-sm:pl-10 max-sm:pr-10' style={{backgroundColor:'#F7F7F7'}}>
    <div className='lg:w-1/2 max-lg:w-full mb-16 md:w-5/12 max-md:w-8/12 max-sm:w-full '>
        <div id = "message" className=' absolute mt-9 ml-24 text-lg'></div>
        <div className='ml-16 max-md:ml-12 max-sm:ml-0 font-inter lg:text-5xl max-lg:text-4xl max-lg:font-semibold lg:font-semibold max-md:text-5xl' style={{marginTop:'13%'}}>
            <p text>Contact Us</p>
        </div>
        <div className='ml-16 max-md:ml-12 max-sm:ml-0' style={{marginTop:'6%'}}>
        <form name = "contact-form" onSubmit={submit}>
        <div className='darkmt-9 max-w-96'>
                <input className = 'min-w-full rounded-md h-10 border-2 text-base border-gray-300 placeholder:text-base placeholder:text-gray-400 pl-1.5 placeholder:pt-0.5 pr-2' style={{backgroundColor:'#DFDFDF',}} placeholder='📧 Email' type="email" name = "email" required/>
            </div>
            <div className='mt-9 max-w-96'>
                <input className = 'min-w-full rounded-md h-10 border-2 text-base border-gray-300 placeholder:text-base placeholder:text-gray-400 pl-1.5 pt-0.5 pr-2' style={{backgroundColor:'#DFDFDF'}} placeholder='👤 Name' type="text"  name = "name" required/>
                </div>
            <div className='mt-9 max-w-96'>
                <textarea name="description" className='min-w-full h-20 rounded-md border-2 text-base border-gray-300 placeholder:text-base placeholder:text-gray-400 pl-2.5 pt-2 resize-none' style={{backgroundColor:'#DFDFDF'}} placeholder='Message' type="text"  id="" required></textarea>    
            </div>
            <div className='mt-8 max-w-96' >
                <button className='w-full h-11 rounded-full bg-purple-600 text-white text-lg font-semibold ' type='submit'>Send Message</button>
            </div>

        </form>
          
        </div>
    </div>

    <div className='w-1/2 max-md:w-7/12 max-md:hidden block max-lg:flex max-lg:ml-8 items-center'>
        <div className='mt-4'style={{maxWidth:'540px'}}>
            <img className ='w-full'src={ContactUsImg} alt="" />
        </div>
    </div>
</div>
  )
}
