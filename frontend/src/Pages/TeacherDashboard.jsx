import { useEffect, useState } from "react";
import '../CSS/courses.css';
import axios from "axios";

let url = import.meta.env.VITE_URL

function TeacherDashboard(){
    let [count, setCount] = useState();
    let [courses, setCourses] = useState();
    let [id, setId] = useState();
    let [module, setModule] = useState();
    let [topic, setTopic] = useState();
    let [file, setFile] = useState();
    useEffect(()=>{
        
       

            
    },[])
    function course_fetch(){
        let result = axios.post(`${url}course_detail` ).then(result =>{
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
   
   function course(e){
  
    let from = document.forms['courses'];
    let name = from.title.value;
    let price = from.price.value;
    let detail = from.detail.value;
    let duration = from.duration.value;
    let project = from.project.value;
    let type = from.type.value;
 
    console.log(duration);
    let data = {
      name: name,
      price: price,
      detail: detail,
      duration: duration,
      projects: project,
      type: type
    }
    let result = axios.post(`${url}courses/courses`, data).then(result =>{
      alert(result.data);
      course_fetch();
     
     
      
     
     })



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
    let form = document.forms['topic-form'];
    let name = form.title.value;
    let obj = {
        id: id,
        name: name
    }
    let result = axios.post(`${url}module_submit/module_submit`, obj).then((result)=>{
       alert(result.data.success);
       setModule(result.data.data[0].topic_id)
       setTopic(name)
       document.querySelector('.syllabus-form').style.display = 'block';
    })
}
function syllabus_submit(){
    let form = document.forms['topic'];
    let title = form.title.value;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("topic_id", topic);
    formData.append("type", file.type);
    formData.append("course_id", id);
    let result = axios.post(`${url}topic_submit/topic_submit`, formData).then((result)=>{
        alert(result.data);
       
       
     })
    
}
function img(e){
    let file = e.target.files[0];
    setFile(file);
    console.log(file);


}
function syllabus_modal(){
    document.querySelector('.syllabus-form').style.display = "none"
}
function btn(){
    alert("hello")
}
    return(
        <>
       
         <div className='modal w-44 h-16 btn z-10'>
             <button  className='flex  justify-around w-full h-full text-white items-center'><i class="fa-solid fa-headset"></i><div>Support</div><i class="fa-solid fa-angle-up"></i></button>

            </div>
            <div className="containerss">
        <div className="headbar p-3 flex ">
        <div className="text-grey-400 w-fit text-gray-500 flex items-center ">
           Courses
        </div>
        <div className="flex justify-end w-full ">
        <button className=" border-none pr-3 text-purple-500 ml-5">
            Export csv
        </button>
        <button className="rounded-xl ml-3 p-2 text-white bg-purple-500" onClick={form} >
            Add Courses
        </button>

        </div>

        </div>
        <div className="content p-3 max-w-6xl m-auto">
            <table className="w-full ">
                <tr className="break-words " >
                    <th>name</th>
                    <th>details</th>
                    <th>Price</th>
                  
                    <th>Add syllabus</th>
                </tr>
                {courses?courses.map((Element) =>(
                  <tr className="mt-3 p-3 hover:bg-sky-500"  >
                  <td className=" break-words">{Element.title}</td>
                  <td className=" max-w-36 text-xs p-2 break-words">{Element.description.substr(40)+'...'}</td>
                  <td>{Element.price}</td>

                  <td><button className="bg-sky-600 text-white w-fit p-2 h-9 rounded max-sm:h-6 max-sm:text-xs" id = {Element._id} onClick={()=>modules_form(Element._id, Element.name)} >Add topics</button></td>
                  </tr>
                )):''}
            </table>
        </div>
        
      
       

            </div>
        {
            /**  
        <div className="course-form modal w-full h-full">
       
       <form class="row g-3 " id = "course-form" name="courses" >
       <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={course_modal}></i></div>
  <div class="col-md-4">
    <label for="validationDefault01" class="form-label">title</label>
    <input type="text" name = "title" class="form-control" id="validationDefault01"  required />
  </div>

  
  <div class="col-md-6">
    <label for="validationDefault03" class="form-label">details</label>
    <textarea  class="form-control" id="validationDefault03" name = "details" required/>
  </div>
 
  <div class="col-md-3">
    <label for="validationDefault05" class="form-label">Price</label>
    <input type="number" name="price" class="form-control" id="validationDefault05" required/>
  </div>
 
  <div className="w-full bg-sky-600 text-white " onClick={course} >
      submit
  </div>

 
    
       </form>
        </div>
        */
        }
        <div className="course-form modal w-screen h-screen z-10">
        <div className = "border mt-20 m-auto p-10 bg-white" style={{width:'400px',fontSize:'18px'}}>
        <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={course_modal}></i></div>

<form name="courses">
    <div>
    <label htmlFor="" > Enter the Course Title</label><br />
    <input type="text" name = "title"  id = "formInput" placeholder="Title"    />
    </div>

    <div>
    <label htmlFor=""  >Enter Course Description</label><br />
    <textarea type=" " name = "detail" id = "formInput" placeholder='Description' />
    </div>
    
    <div>
    <label htmlFor=""  >Enter Course Price</label><br />
    <input type="number" name = "price" id = "formInput" placeholder='Price' />
    </div>
    <div>
    <label htmlFor=""  >Enter Course Projects</label><br />
    <input type="number" name = "project" id = "formInput" placeholder='Project' />
    </div>
    <div>
    <label htmlFor="" >Choose the Duration of the course</label><br />
    <select  name = "duration" id = "formInput">
        <option value="2 Weeks">2 Weeks</option>
        <option value="4 Weeks">4 Weeks</option>
        <option value="6 Weeks">6 Weeks</option>
        <option value="8 Weeks">8 Weeks</option>
        <option value="12 Weeks">12 Weeks</option>
        <option value="16 Weeks">16 Weeks</option>
    </select>
    </div>
    <div>
        <label>Choose type of Course</label>
        <select  name = "type" id = "formInput">
        <option value="It & Development">It & Development</option>
        <option value="ML">ML</option>
        <option value="Data Science">Data Science</option>
        <option value="Programming">Programming</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Ethikal Hacking">Ethikal Hacking</option>
    </select>
    </div>
   

</form>
<div className="w-full bg-sky-600 text-white flex justify-center items-center h-9 " onClick={course} >
      submit
</div>



</div>

        </div>
       
    <div className="topic_form modal">
    <div className="m-auto h-fit max-w-96">
   
    <form id = "topic-form1 " className="w-full h-fit bg-white p-3" name="topic-form">  
    <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={topic_modal}></i></div> 
    <div className="mt-3">
     <label>Add Module title</label>
     <div>
     <input type = "text" className="w-full h-9 border" name = "title"  required/>

     </div>
    

    </div>
     <div id = "" className="border bg-sky-500 mt-6 flex justify-center items-center text-white font-bold" onClick={topics_submit}>submit</div>
    </form>

    </div>

    </div>

    <div className="syllabus-form modal" >
    <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={syllabus_modal}></i></div>

    <div className="m-auto h-fit w-96">
     <form className="w-full p-6 bg-white" name = "topic">
     <div  className="mt-6">
     <label>Add topic related to {topic}</label>
     <input type="text" name="title" className="w-full border"/>
     </div>
     <div className="mt-3">
     <label>Add any document and video related to topic</label>
     <input type = "file" name = "img" onChange={img} />

     </div>
     <div className="mt-3  flex justify-center items-center text-white font-bold" onClick={syllabus_submit}>submit</div>

     </form>
    </div>


    </div>
    
        </>
    )
}
export default TeacherDashboard;