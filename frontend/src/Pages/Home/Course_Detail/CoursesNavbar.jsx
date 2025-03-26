import {React, useEffect, useState} from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import {Autoplay, EffectCards, Thumbs, Pagination, Navigation, EffectCube} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import CourseImage from '../../../assets/CourseImage.png'
import HidebarImg from '../../../assets/Hidebar.png'
import axios from 'axios';
let url = import.meta.env.VITE_URL
import '../../../CSS/coursenavbar.css'
import {Loader} from 'rsuite';
import { useNavigate } from 'react-router-dom';

export default function CoursesNavbar() {
    let Navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [courses, setCourses] = useState();
    const [courses1, setCourses1] = useState();
    const [courses2, setCourses2] = useState();
    const [form, setForm] = useState();
    const array3 = [];
    function ShowBar(){
        setShow(true)
        document.querySelector('.search1').style.display = 'none'
        document.querySelector('.search2').style.display = 'block'
    }
    function Hidebar(){
        setShow(false)
         document.querySelector('.search1').style.display = 'block'
        document.querySelector('.search2').style.display = 'none'
    }
   
        
    let data = async()=>{
        let result = await axios.post(`${url}course_detail`);
        
         let array = result.data;
         setCourses1(array);
         setCourses2(array);
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
        console.log(courses)
        
        
      }
      useState(()=>{
        data();

      },[])
     let prev;
     let next;
    let course_filter1 = (e) =>{
           let match = false;
           for(let  i = 0; i<courses.length; i++){
            if(courses[i] == e){
                   document.getElementById(e).style.backgroundColor= "#c084fc";
            }
            else{
                document.getElementById(courses[i]).style.backgroundColor = "transparent";
                
            }
           

           }
     
            let array = courses2.filter(Element => Element.type == e);
            setCourses1(array);
            
          
       
       
       
      
     
        prev = e;
    }     
    let search = (e) =>{
        let data = e.target.value.toUpperCase();
        setForm(data);

    }
    let Search = (e)=>{
        let array = courses2.filter(function(e){
            if(e.type.toUpperCase().includes(form)){
              return e;
            }
      });
       setCourses1(array)
       
       
      
    }
    let enter = (e)=>{
        if(e.key == "Enter"){
            let array = courses2.filter(function(e){
                if(e.type.toUpperCase().includes(form)){
                  return e;
                }
            })
            setCourses1(array)

        }
    }
    setTimeout(()=>{
        data()

    },120000)
   
   let course = (e)=>{
    localStorage.setItem("id", e);
    Navigate('/courses')

   }
  
   
  return (
    
    <div>
    
      <div className='w-full mt-12 '>
            <div className={`w-11/12 h-10 flex items-center  ${show?'justify-between':'justify-evenly'} pl-3 m-auto rounded-full`} style={{boxShadow:' rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'}}>
                {/* Nav Feilds */}
                {(!show && <div className='Nav-Fields flex  w-full justify-evenly   text-gray-600 font-bold flex-nowrap whitespace-nowrap max-sm:justify-between ' style={{fontSize:'16px'}}>
                   {courses?courses.map(Element =>(
                    <div className='course_type rounded-full hover:bg-purple-400 hover:text-black ' onClick={() =>course_filter1(Element)} id={Element} >
                        <a className='hover:no-underline h-fit hover:text-black'>{Element}</a>
                    </div>

                   )):<div className='loading absolute text-2xl w-full h-full z-10 opacity-50 flex justify-center items-center modal' id = "loading">

                    <Loader className='fixed ' size='md'/>
                   </div>}
                    
                   
                </div>)}

                <div className='flex items-center h-full border-blue-700 ' >
                    {/* Hide/Show Search Bar */}
                {(  show && <div className='ml-1 '>
                    <img src={HidebarImg} className='h-6 w-6' onClick={Hidebar} alt="" />
                </div>     
                )}
                {(  show && <div className='ml-10 '>
                    <div className='input'>
                        <input type="text"  className='pl-2 w-full placeholder-gray-500  rounded-md outline-none  ' placeholder='Search' style={{maxwidth:'900px',height:'33px'}} onInput={search} onKeyDown={enter}/>
                    </div>
                </div>

                )}
                </div>
                {/* Search Icon */}
                <div className={`C-nav-SearchBar flex items-center ${show?'mr-8':'ml-7 mr-5'}`}>
                    <i className='fa-solid fa-magnifying-glass cursor-pointer text-lg rounded-full hover:bg-purple-100 pl-2 pr-2 pb-0.5 pt-0.5 search1' onClick={ShowBar}></i>
                    <i className='fa-solid fa-magnifying-glass cursor-pointer text-lg rounded-full hover:bg-purple-100 pl-2 pr-2 pb-0.5 pt-0.5 search2 hidden' onClick={Search} ></i>
                </div>
            </div>
        </div>
        
        {/* Courses Info */}
        <div className='m-auto   mt-16' style={{maxWidth:'1400px'}}>
        <Swiper  modules={[ Autoplay, Thumbs,  Navigation]}       thumbs={true}   loop={true} followFinger={true} grabCursor={true} simulateTouch={true} spaceBetween={30} breakpoints = {{469: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1240: {slidesPerView:3}}} 
         autoplay={{ delay: 3000,  disableOnInteraction: false  }}   className="w-full  h-fit mt-6  z-0  max-lg:pl-6 max-lg:pr-6 "> 
          {courses1?courses1.map(Element =>(
            <SwiperSlide className='h-fit rounded-2xl'>
    
    {/*Selected Feild Course 1 */}
        <div className='border flex rounded-2xl h-60  max-lg:h-fit max-md:h-60 max-lg:pb-3 max-md:pb-0 font-sans' style={{maxwidth: '100%',backgroundColor:'#EDEDED',boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
            <div className='w-full h-full    '>
                <img src={CourseImage} className='w-full h-full  max-md:h-60 rounded-tl-2xl rounded-bl-2xl' alt="" style={{height:'100%'}} />
            </div>
                {/* details */}
            <div className='w-2/3 h-full '>
                <div className='ml-6 mt-4'>
                    <p className='text-lg font-bold  '>{Element.title}</p>
                </div>
                <div className='ml-6 mt-2 mr-3 mb-1 'style={{color:'#49454F'}}>
                    <p className=' max-sm:text-xs'>{Element.description.length > 129?Element.description.substr(0, 129) + '...':Element.description}
                    </p>
                </div>
                <div className='flex justify-end ml-6 mt-6 max-lg:mt-10 max-md:mt-5 max-sm:mt-6  max-sm:p-3 '>
                    <div>
                        <button className='w-20   rounded-full text-center text-black font-semibold bg-purple-300 mr-3 max-sm:w-16 text-base max-sm:text-xs' style={{height:'36px',fontWeight:'600'}}>Preview</button>
                    </div>
                    <div>
                        <button className='w-24 rounded-full text-center text-white bg-purple-700 mr-4 max-sm:w-16 text-base  max-sm:text-xs'style={{height:'36px',fontWeight:'600'}} onClick={() =>course(Element._id)}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div >

    {/*Selected Feild Course 2 */}
   </SwiperSlide>
  

          )):''}
          
        </Swiper>
        </div>
    </div>
  )
}
