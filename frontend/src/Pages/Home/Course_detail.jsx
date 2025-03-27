import React, { useState } from 'react'




import CoursesNavbar from './Course_Detail/CoursesNavbar'
import Review from './Course_Detail/Review'
import Contact from './Course_Detail/Contact'
import react from '../../assets/react.jpg'
import java from '../../assets/java.jpg'
import js from '../../assets/js.jpg'
import web from '../../assets/web.jpg'
import html from '../../assets/html.jpg'
import css from '../../assets/css.jpg'

export default function Course_detail() {
   
    
  return (
    <>
     <div className='MainContainer'>
    <div className='w-full bg-white'>
        <div className=' text-gray-600 font-sans font-bold text-4xl max-md:text-3xl max-sm:text-2xl'>
            <p>All The Skills You Need In One Place</p>
        </div>
        <div>
            <p className='text-gray-500 font-sans mt-2 text-2xl max-md:text-xl max-sm:text-lg'style={{fontWeight:'500'}}>From critical skills to technical topics, Tech Temple support your professional development</p>
        </div>
        <div className='border-b-2 border-gray-400 mt-4'></div>
    </div>

    {/* Courses */}
    <div className='w-full'>

      
        
        {/* Courses Info */}
        <CoursesNavbar/>
       
        
        {/*  */}
        <div className='w-full bg-white'>
            <div className=' mt-24 font-sans   text-gray-600 font-extrabold text-5xl  max-md:text-3xl max-sm:text-2xl' >
                <p>Accelerate growth — for you or your organization</p>
            </div>
            <div>
                <p className='text-gray-500 mt-2 text-xl font-sans max-sm:text-lg'style={{fontWeight:'500'}}>Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.</p>
            </div>
        </div>
        
        {/*  */}
        <div className='max-w-full'>
            {/* Cards */}
        </div>
          <div className="wrapper m-auto">
                <div class="track">
             
                    <div class="logo " ><img src={html} alt="HTML" /></div>
                    <div class="logo"><img src={css} alt="CSS" /></div>
                    <div class="logo"><img src={js} alt="JavaScript" /></div>
                    <div class="logo"><img src={react} alt="React" /></div>
                    <div class="logo"><img src={java} alt="Java" /></div>
                    <div class="logo"><img src={web} alt="Web Dev" /></div>
                    <div class="logo"><img src={js} alt="JavaScript" /></div>
                   
                    <div class="logo"><img src={html} alt="HTML" /></div>
                    <div class="logo"><img src={css} alt="CSS" /></div>
                    <div class="logo"><img src={js} alt="JavaScript" /></div>
                    <div class="logo"><img src={react} alt="React" /></div>
                    <div class="logo"><img src={java} alt="Java" /></div>
                    <div class="logo"><img src={web} alt="Web Dev" /></div>
                    <div class="logo"><img src={js} alt="JavaScript" /></div>
                </div>
                 </div>

        {/* Review */}
      <Review/>

        {/* Contact Us */}
       

    </div>
    </div>
    <Contact/>
    </>
  )
}
