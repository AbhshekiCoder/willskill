import logo from '../assets/logo.png';
function Footer(){
  
    return(
        <>
        <div className="footer w-full   min-h-72 p-6  max-sm:p-0  mt-16    " style={{backgroundColor: "rgba(38, 38, 38, 1)"}}>
        <div className='w-full flex justify-center '>
        <div className='row  w-full  p-2'>

     
<div className="col-sm text-white   max-md:max-w-64 ">
<div className='logo'>
<img src = {logo} alt = "..."/>

</div>
<div className="flex justify-between mt-3">
<div className="text-2xl text-blue-500"><i class="fa-brands fa-facebook-f"></i></div>
<div className="text-2xl text-red-500"><i class="fa-brands fa-youtube"></i></div>
<div className="text-2xl text-sky-500"><i class="fa-brands fa-twitter"></i></div>
<div className="text-2xl text-green-500"><i class="fa-brands fa-whatsapp"></i></div>

</div>


</div>
<div className="col-sm   text-white flex justify-center max-md:text-sm  max-sm:justify-start max-sm:mt-3 max-sm:w-full ">
<div>
<div className=''>
Success Stories
</div>
<div className='mt-3'>
Our Team
</div>
<div className='mt-3'>
 About Us
</div>
<div className='mt-3'>
Talent Circle
</div>
<div className='mt-3'>
Contact Us
</div>
 

</div>

 </div>
 <div className="col-sm text-white  max-md:ml-3 max-md:text-sm max-sm:mt-3 max-sm:w-full max-sm:grid max-sm:justify-end  max-sm:m-0">
 <div className=''>
 Careers
</div>
<div className='mt-3'>
Blogs
</div>
<div className='mt-3'>
Help and Support
</div>
<div className='mt-3'>
Affilate

</div>
<div className='mt-3'>
Investor
</div>
<div className='mt-3'>
Hire From Us
</div>
<div className='mt-3'>
Become Coach
</div>
 
 
 </div>
 <div className="col-sm  text-white max-md:text-sm max-sm:mt-3 max-sm:w-full">
 <div className=''>
 Blog
</div>
<div className='mt-3'>
FAQ
</div>
<div className='mt-3'>
News Rooms
</div>
<div className='mt-3'>
Support
</div>
<div className='mt-3'>
 Learn
</div>
<div className='mt-3'>
 Industry Mentors
</div>
 
 
 </div>
         </div>
        
        </div>
        <div className='flex justify-center text-gray-500 mt-3 font-sans'>
         @copyright reserved by Will Skill

         </div>

       
            
        </div>

        </>
    )
}
export default Footer;