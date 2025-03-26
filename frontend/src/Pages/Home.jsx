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
         <SwiperSlide className="carousel-item " style={{height: "500px"}}><img src = "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600"  className="w-full h-full object-cover "/></SwiperSlide> 
         <SwiperSlide  className="carousel-item h-96" style={{height: "500px"}}><img src = "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=600"  className="w-full h-full object-cover "/></SwiperSlide> 
         <SwiperSlide  className="carousel-item h-96" style={{height: "500px"}}><img src = "https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png"  className="w-full h-full object-cover "/></SwiperSlide> 
         </Swiper>
          {/* Main Container */}
        
         <Course_details/>
        
         
        </>
    )
}
export default Home;