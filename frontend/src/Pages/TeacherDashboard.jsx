import { useEffect, useState } from "react";
import '../CSS/courses.css';
import axios from "axios";
import logo from '../assets/logo.png'
import { Loader } from 'rsuite';
import {Link} from 'react-router-dom'

let url = import.meta.env.VITE_URL

function TeacherDashboard(){
    let [count, setCount] = useState();
    let [courses, setCourses] = useState();
    let [id, setId] = useState();
    let [module, setModule] = useState();
    let [topic, setTopic] = useState();
    let [file, setFile] = useState();
    let [loading, setLoading] = useState(false);

    useEffect(()=>{},[])

    function course_fetch(){
        axios.post(`${url}course_detail`).then(result =>{
            setCourses(result.data);
            console.log(courses);
        })
    }

    function form(){
        document.querySelector('.course-form').style.display = "block";
    }

    function topics(e){
        document.querySelector('.syllabus').style.display = "block";
        let num = e.target.value;
        setCount(num)
    }

    function course_modal(){
        document.querySelector('.course-form').style.display = "none";
    }

    function course_submit(e){
        setLoading(true);
        let from = document.getElementById("courses")
        let formData = new FormData()
        let name = from.title.value;
        let price = from.price.value;
        let detail = from.detail.value;
        let duration = from.duration.value;
        let project = from.project.value;
        let type = from.type.value;

        formData.append('name', name)
        formData.append('price', price)
        formData.append('detail', detail)
        formData.append('duration', duration)
        formData.append('project', project)
        formData.append('type', type)
        formData.append('file', file)

        axios.post(`${url}courses/courses`, formData).then(result =>{
            setLoading(false);
            if(result.data.success){
                alert(result.data.message);
                course_fetch();
            }
            else{
                alert(result.data.message)
            }
        }).catch(() => setLoading(false));
    }

    function topic_modal(){
        document.querySelector('.topic_form').style.display = "none";
    }

    useEffect(()=>{
        course_fetch();
    },[])

    function modules_form(id, name){
        document.querySelector('.topic_form').style.display = "block";
        alert(`add modules related to course:${name}`);
        setId(id);
    }

    function topics_submit(){
        setLoading(true);
        let form = document.forms['topic-form'];
        let name = form.title.value;
        let obj = { id: id, name: name }
        axios.post(`${url}module_submit/module_submit`, obj).then((result)=>{
            setLoading(false);
            alert(result.data.success);
            setModule(result.data.data[0].topic_id)
            setTopic(name)
            document.querySelector('.syllabus-form').style.display = 'block';
        }).catch(() => setLoading(false));
    }

    function syllabus_submit(){
        setLoading(true);
        let form = document.getElementById("topic");
        let title = form.title.value;

        let formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("topic_id", topic);
        formData.append("type", file.type);
        formData.append("course_id", id);

        axios.post(`${url}topic_submit/topic_submit`, formData).then((result)=>{
            setLoading(false);
            alert(result.data);
        }).catch(() => setLoading(false));
    }

    function img(e){
        let file = e.target.files[0];
        setFile(file);
        console.log(file);
    }

    function syllabus_modal(){
        document.querySelector('.syllabus-form').style.display = "none"
    }

    return(
        <>
        {loading && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"><Loader size="lg" speed="fast" backdrop content="Loading..." /></div>}

        <div className='modal w-44 h-16 btn z-10'>
            <button className='flex justify-around w-full h-full text-white items-center'><i className="cursor-pointer fa-solid fa-headset"></i><div>Support</div><i className ="cursor-pointer fa-solid fa-angle-up"></i></button>
        </div>

           <div className="containerss">
           {/* Navbar */}
       <div className="headbar border-2 flex items-center h-16 mb-9" style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
           <div className="text-grey-400 w-36 h-full ml-36 max-lg:ml-28 max-md:ml-11 text-gray-500 flex items-center ">
             <Link to = "/"> <img src={logo} alt="" className="w-full h-full" /></Link>
           </div>
           <div className="flex justify-end w-full ">
               {/* <button className="rounded-xl text-white bg-purple-500" onClick={form} >export csv</button> */}
               <button  className=' h-10 max-sm:w-24 max-sm:h-8 signin-n transform bg-purple-300 transition-all duration-300 ease-in-out max-sm:text-sm max-sm:text-gray-700 border-purple-600 max-sm:border-gray-700 border-2 hover:border-purple-300 mr-8 hover:text-white hover:bg-purple-500 font-sans bg-custom-light-purple rounded-lg hover:bg-purple-5000  w-28'style={{fontWeight:'500'}}>Export CSV</button>
               <button onClick={form} className=' h-10 max-sm:w-24 max-sm:h-8 signin-n transform transition-all bg-purple-300 duration-300 ease-in-out max-sm:text-sm max-sm:text-gray-700 border-purple-600  max-sm:border-gray-700 border-2 hover:border-purple-300 mr-4 hover:text-white font-sans bg-custom-light-purple hover:bg-purple-500 rounded-lg w-28 'style={{fontWeight:'500'}}>Add Courses</button>
           </div>

       </div>



       <div className="content p-3 max-w-6xl m-auto">
           <table className="w-full ">
               <tr className="break-words text-orange-700 text-base " >
                   <th className="border-2 border-orange-500 p-2 bg-orange-100">Name</th>
                   <th className="border-2 border-orange-500 p-2 bg-orange-100">Details</th>
                   <th className="border-2 border-orange-500 p-2 text-center w-28 max-sm:w-20 bg-orange-100">Price</th>
                 
                   <th className="border-2 border-orange-500 bg-orange-100 p-2 w-32 text-center">Add Syllabus</th>
               </tr>
               {courses?courses.map((Element) =>(
                 <tr className="  border-2 border-orange-100">
                   <td className="break-words border-2 border-orange-100 pl-2 hover:bg-orange-50">{Element.title}</td>
                   <td className="text-xs border-2 border-orange-100 break-words p-2 hover:bg-orange-50">{Element.description.substr(40) +'...'}</td>
                   <td className="text-center border-2 border-orange-100 hover:bg-orange-50">{Element.price}</td>

                   <td className="flex justify-center p-2 hover:bg-orange-50 text-white"><button className="bg-orange-500 hover:bg-orange-400 hover:text-orange-700  w-fit p-2 h-9 rounded" id = {Element._id} onClick={()=>modules_form(Element._id, Element.name)} >Add topics</button></td>
                 </tr>
               )):''}
           </table>
       </div>
       
     
      

           </div>
       {
         
       }

       <div className="course-form modal w-screen h-screen z-10 ">
           
           {/* Courses Form */}
   <div className = " m-auto bg-gray-100 rounded-lg pl-24 pr-20 pt-8 pb-12 max-lg:pl-16 max-lg:pr-16" style={{width:'90%',fontSize:'18px'}}>
       <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl cursor-pointer text-orange-600' onClick={course_modal}></i></div>

           <div className="font-bold text-orange-700 text-5xl m-auto pt-6 pb-5 w-fit max-md:text-3xl">
               <p>Enter Course Details</p>
           </div>

           
           {/* Courses details form */}
           <form name= "courses " id = "courses">
               <div className="flex max-md:block mt-5">
                   <div className="mr-20">
                       <label htmlFor="" className=" text-orange-700 ">Enter the Course Title</label><br />
                       <input className="" type="text" name = "title"  id = "formInput" placeholder="Title"    />
                   </div>

                   <div>
                       <label htmlFor="" className="text-orange-700" >Enter Course Price</label><br />
                       <input type="number" name = "price" id = "formInput" placeholder='Price' />
                   </div>
               </div>

               {/*  */}
               <div className="flex max-md:block mt-3 mb-3">

               <div className="mr-20">
                   <label htmlFor="" className="text-orange-600" >Enter Course Projects</label><br />
                   <input type="number" name = "project" id = "formInput" placeholder='Project' />
               </div>
               <div>
                   <label htmlFor="" className="text-orange-600">Choose the Duration of the course</label><br />
                   <select  name = "duration" id = "formInput">
                       <option value="2 Weeks">2 Weeks</option>
                       <option value="4 Weeks">4 Weeks</option>
                       <option value="6 Weeks">6 Weeks</option>
                       <option value="8 Weeks">8 Weeks</option>
                       <option value="12 Weeks">12 Weeks</option>
                       <option value="16 Weeks">16 Weeks</option>
                   </select>
               </div>
               </div>

               <div className="">
               <label htmlFor="" className="text-orange-600 " >Enter Course Description</label><br />
               <textarea className="p-2 w-7/12" type=" " name = "detail" id = "formInput" placeholder='Description' />

               </div>
               
               <div className="mb-3">
                       <label className="text-orange-600 mr-5">Choose type of Course</label>
                       <select className="cursor-pointer mr-2" name = "type" id = "formInput">
                       <option value="It & Development">It & Development</option>
                       <option value="ML">ML</option>
                       <option value="Data Science">Data Science</option>
                       <option value="Programming">Programming</option>
                       <option value="Digital Marketing">Digital Marketing</option>
                       <option value="Ethikal Hacking">Ethikal Hacking</option>
                   </select>
               </div>

               <div className="mb-4 flex max-md:block cursor-pointer">
                   <label htmlFor="" className="mr-8 min-w-10 max-md:mb-4 text-orange-600 ">Upload the Image of Course</label>
                   <input type="file" className="w-fit text-orange-400  rounded-sm " onChange={img}/>
               </div>
           
           </form>
       <div className="mt-3  cursor-pointer w-40 h-12 border-2 rounded-md font-bold text-2xl border-orange-800 hover:border-orange-400 bg-orange-400 hover:bg-orange-200 text-gray-100 hover:text-orange-500 flex justify-center items-center " onClick={course_submit} >
           <button className="">Submit</button>
       </div>
   </div>
   

       </div>
      
     
   <div className="topic_form modal ">
       <div className="m-auto h-fit max-w-96 rounded-xl" style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}>
       
           <form id = "topic-form1 " className="w-full h-fit bg-orange-50 p-8 rounded-lg" name="topic-form">  
               <div className="flex justify-end">
                   <i className='fa-solid fa-circle-xmark hover:text-xl cursor-pointer text-orange-600' onClick={topic_modal}></i>
               </div>

               <div className="mt-3 ">
                   <label className="font-semibold text-2xl text-orange-500 mb-3">Add Module title</label>

                   <div className="mb-4 mt-1">
                       <input type = "text" className=" rounded-md w-full h-9 border-2 border-gray-400 pl-2 pr-3 text-" name = "title"  required/>
                   </div>

               </div >
               <div id = "" className="cursor-pointer border rounded-md bg-orange-500 hover:bg-orange-400 border-orange-800 text-lg m-auto p-1 flex justify-center items-center text-white font-bold" onClick={topics_submit}>Submit</div>
           </form>

       </div>

   </div>


   <div className="syllabus-form modal " >
   

   <div className="m-auto h-fit "style={{width:"450px"}}>
       <form className="w-full p-8 bg-white " id = "topic" name = "topic">
       <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl cursor-pointer text-orange-600' onClick={syllabus_modal}></i></div>
           <div  className="mt-2">
               <label className="text-xl font-semibold text-orange-400 mb-3">Add Topic Related to {topic}</label>
               <input type="text" name="title" className="w-72 h-10 p-2 rounded-md border "/>
           </div>
       <div className="mt-4">
           <label className="text-xl font-semibold text-orange-400 mb-3 ">Add any document and video related to topic</label>
           <input type = "file" className="text-orange-400" name = "img" onChange={img} />
       </div>

           <div className="mt-4 font-inter text-center cursor-pointer border rounded-md text-white hover:text-gray-500 bg-orange-500 hover:bg-orange-400 border-orange-800 text-lg font-bold m-auto p-1 " onClick={syllabus_submit}>Submit</div>
       </form>
   </div>


   </div>
   
       </>
    )
}
export default TeacherDashboard;