import React, { useEffect, useState } from 'react'
import ReviewProfile from '../../../assets/ReviewProfile.png'
import ReviewProfile1 from '../../../assets/ReviewProfile1.png'
import ReviewProfile2 from '../../../assets/ReviewProfile2.png'
import ReviewProfile3 from '../../../assets/ReviewProfile3.png'
import axios from 'axios';
let url = import.meta.env.VITE_URL
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/swiper-bundle.css'; 
import SwiperCore from 'swiper';
import {Autoplay, EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import { Navigation, Pagination, Scrollbar, Thumbs} from 'swiper/modules';

export default function Review() {
    let [reviewdata, setReviewData] = useState()
    let review = async()=>{
        let result = await axios.post(`${url}review/review`)
        setReviewData(result.data);
        console.log(reviewdata)
     
       }
       useEffect(()=>{
        review();

       },[])
  return (
       <>   
        <div className='w-full  bg-white mt-10 '>
            <div className='reviewHeading'>
            <div className=' mt-24  text-purple-900 font-serif font-bold' style={{fontSize:'60px'}}>
                <p>Review</p>
            </div>
            <div className='h-0'></div>
            <div className='h-0'></div>

            </div>

           
                {/* Card 1 */}
                <Swiper modules={[Autoplay, Navigation, Thumbs]} grabCursor={true} thumbs={true} navigation={true} loop={true}  spaceBetween={30} centeredSlides={true} autoplay={{ delay: 3000,  disableOnInteraction: false,  }} pagination={{ clickable: true }}  breakpoints = {{469: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1240: {slidesPerView:3}}}  className="max-w-6xl  h-fit mt-6  z-0  " style={{maxWidth: "1100px"}}> 
                {reviewdata?reviewdata.map(Element =>(
                      
                   
                  
                     <SwiperSlide className=" review-card p-2 rounded-lg " style={{backgroundColor:'#EDEDED', width: "270px"}}  >
                    
                    <div className='flex ml-3 mt-4 '>
                        <div className='w-1/2 flex items-center '>
                            <img src={`data:${Element.type};base64,${Element.img}`} className = 'review-Img  w-16 h-16 rounded-circle ' alt="" />
                        </div>
                        <div className='w-1/2  font-inter  ' style={{color:'#7B7B7B'}}>
                            {/* Name */}
                            <div className= 'review-Name'>
                                <p>{Element.name}</p>
                            </div>
                            {/* Selected Feild */}
                            <div className ='selected-Feild'>
                                <p>{Element.technology} </p>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div className ='flex text-2xl h-12 mb-1 mt-3 pt-2 ml-3 mr-4 ' style={{color:'#F4D10B'}}>
                        {Array.from({length: Element.rating}).map((_, index)=>{
                                  return  <div>
                                    <i className='fa-solid fa-star mr-2'></i>
                                </div>
                                

                               })}
                               
                            </div>
                    </div>

                    <div className='review-Desc ' >
                        <p>{Element.description}</p>
                    </div>
                    


                     </SwiperSlide> 
                
       


                )):''}
                </Swiper>
                
              

    
                {/* Card 1 */}
                
    
        </div>
        
        </>
    
  )
}
