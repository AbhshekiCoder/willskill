import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
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
import axios from "axios";
import Course_details from '../Pages/Home/Course_detail';
import '../CSS/Home.css';
import { motion } from "framer-motion";
let url = import.meta.env.VITE_URL

function Home({sidebar_open, profile, logout}){ 
  let [file, setFile] = useState();
  
  //https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600
  //https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=600
  //https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png
  function Image(e){
    setFile(e.target.files[0])
   

  }
  let form = async()=>{
    let form = document.forms['form'];
    let name = form.name.value;
    let description = form.description.value;
    let technology = form.technology.value;
    let rating = form.rating.value;

    let formData = new FormData();


    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('technology', technology);
    formData.append('type', file.type)
    formData.append('rating', rating)
    console.log(formData)
    let result = await axios.post(`${url}user_review/user_review`, formData);
    alert(result.data)
    
  }
  useEffect(()=>{
    localStorage.removeItem('users')

  },[])
    return(
        <>
         
         <Navbar sidebar_open={sidebar_open } profile={profile} logout={logout}/>
         <Swiper modules={[ Autoplay, Thumbs]}  spaceBetween={30} centeredSlides={true} autoplay={{ delay: 3000,  disableOnInteraction: false,  }} pagination={{ clickable: true }}   className="w-full mb-3 h-fit  z-0"> 
         <SwiperSlide 
  className="carousel-item"
  style={{
    height: "500px",
    perspective: "1000px" // Adds 3D effect
  }}
>
  <motion.img 
    src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    className="w-full h-full object-cover"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
  />
</SwiperSlide>
        <SwiperSlide 
  className="carousel-item"
  style={{
    height: "500px",
    perspective: "1000px" // Adds 3D effect
  }}
>
  <motion.img 
    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    className="w-full h-full object-cover"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
  />
</SwiperSlide>
       <SwiperSlide 
  className="carousel-item"
  style={{
    height: "500px",
    perspective: "1000px" // Adds 3D effect
  }}
>
  <motion.img 
    src="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    className="w-full h-full object-cover"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
  />
</SwiperSlide>
         </Swiper>
          {/* Main Container */}
        
         <Course_details/>

       

        
         
        </>
    )
}
export default Home;