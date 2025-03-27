import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "rsuite";
import url from '../misc/url'
import { GoogleGenerativeAI } from '@google/generative-ai';
import assistant from '../assets/assistant.gif'

function Video(){
    let [modules, setModules] = useState();
    let [topic, setTopic] = useState();
    const [video, setVideo] = useState(); // Assuming video is a string URL or null
    let string = "";
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState([])
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Add user message to chat
  setMessages((prevMessages) => [
    ...prevMessages,
    { user: userInput, bot: '' },
  ]);
  setLoading(true);

  try {
    const genAI = new GoogleGenerativeAI("AIzaSyCpgaSyevRj5gq5Cz4rsN_4ro2OFOrArQk");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
 
  console.log(userInput)
    const data = await model.generateContent(userInput);
    
  

  

    // Add bot response to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: '', bot: data.response.text() || 'No response received from the model.' },
    ]);
  } catch (error) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: '', bot: `${error}`},
    ]);
  } finally {
    setUserInput('');
    setLoading(false);
  }
};
    useEffect(()=>{
        let id = localStorage.getItem("topic_id");
       
      
        let result = axios.post(`${url}modules/modules`,{id}).then(result =>{
            setModules(result.data);
            console.log(result.data)
            
           
        })

       
      
        
    
        },[] )

     
        function select_topic(e){
            console.log(e.target.value);
           let name = e.target.value;
           document.querySelector(".loading3").style.display = "block";
           let result = axios.post(`${url}topics/topics`, {name}).then(result =>{
        
            setTopic(result.data);
         
           
            console.log(result.data)
           
            
           
           })

           
     

        }
        useEffect(()=>{
           
                
                document.querySelector(".loading3").style.display = "none";
           

          
                
            

        },[topic]);
       function fetch_video(e) {
        setVideo("");
            let id = e;
            console.log(id)
            let result = axios.post(`${url}video/video`, {id}).then(result =>{
        
                setVideo(result.data);
                console.log(result.data);             
               
                
            })
         
        }
    return(
        <>
        <div className="assistant absolute" style={{bottom: "400px", right: "30px"}}>
        <img src = {assistant} className=" h-40" onClick={() =>{document.querySelector('.chatbox').style.display = "block"}}/>

        </div>
        <div className="chatbox modal w-full h-full text-center   " >
        <div style={{ width: '430px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', marginLeft: "40%" }} className="absolute  bg-purple-500 shadow-2xl rounded-3xl ">
        <div className="flex justify-end"><i className='fa-solid fa-circle-xmark hover:text-xl text-white' onClick={() =>{
            document.querySelector('.chatbox').style.display = "none"
        }}></i></div>
      <h2 className="text-white font-bold">WillSkill Ai </h2>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        {messages?messages.map((message, index) => (
          <div key={index}>
            {message.user && <div className=' ' style={{backgroundColor: "azure",  padding: "5px"}}><strong>You:</strong> {message.user}</div>}
            {message.bot && <div style={{backgroundColor: "orange", color: "white", padding: "5px", marginTop:"10px"}}><strong>Bot:</strong> {message.bot}</div>}
          </div>
        )):"Loading..."}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          style={{ width: '100%', padding: '8px', border: 'solid 2px', borderRadius: "10px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px', marginTop: '10px', border: "solid 2px" }} className="bg-white rounded-lg">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
       </div>
       </div>
         



        <div className=" absolute z-10 ml-36 mt-16 hidden arrow" style={{color: "rgb(232, 190, 172)"}}>
        <i class="fa-solid fa-hand-middle-finger text-3xl"></i>
       </div>   
        <div className="container1  h-full border row "  >
        <div className="col-md max-w-64 border  overflow-y-auto p-6" style={{height: "650px"}}>
        <h5 className="font-bold text-gray-500 text-xl  ">Module</h5>
        <select className="w-full h-10 mt-3" onChange={select_topic}>
            <option value="default">select modules</option>
            {modules?modules.map((Element)=>(
                <option value={Element.name} className={Element.name} id ={Element._id}>{Element.name}</option>

            )): <option className="flex justify-center items-center"><Loader speed="normal" /></option>}
           
        </select>
        <h5 className="font-bold text-gray-500 text-xl mt-6">Topics</h5>
        {topic?topic.map((Element)=>(
        <div className="topics mt-3 p-3 border" id = {Element._id} onClick={()=>fetch_video(Element._id)}>
        <div className="">
        <div>{Element.name}</div>
       

        </div>
        <div className="flex mt-3">
         {Element.type.includes("image")?<i class="fa-solid fa-file"></i>:<i class="fa-brands fa-youtube"></i>}
        
        <div className="ml-3">{Element.name}</div>
        </div>

        </div>
        
            

        )):<div><Loader speed = "normal"/></div>}
       
        


        </div>
        <div className="col-md border p-3   flex justify-center">
        {video? video.map((Element)=>(
            <> 
            {Element.type.includes("image")?<img src ={`data:${Element.type};base64,${Element.file}`} className=" max-w-4xl h-full"/>: <video src = {`data:${Element.type};base64,${Element.file}`} className="max-w-4xl h-full " controls></video>}
           
           
            </>


        )):<div className="flex justify-center w-full h-full items-center"><Loader speed = "normal"/></div>}
       
        </div>

        </div>
       <div className=" loading3 modal border flex  ">
       <div className="w-full h-full flex justify-center items-center">
       <Loader speed="normal"/> 

       </div>
     
       </div>  
       

        </>
    )
}


export default Video;