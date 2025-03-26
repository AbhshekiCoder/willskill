import React, { useEffect, useState } from 'react'

import axios from 'axios';
import voice from '../assets/clock.mp3';
import { Link, useNavigate } from 'react-router-dom';
import { Loader, Message } from 'rsuite';
let url = import.meta.env.VITE_URL
export default function Quiz() {
  let [quiz, setQuiz] = useState();
  let [question, setQuestion] = useState();
  let [score, setScore] = useState(1);
  let Navigate = useNavigate()
 const data = [];
  useEffect(()=>{
    let result = axios.get(`${url}quiz/quiz`).then(result =>{
      console.log(result.data)
      setQuiz(result.data);
      
    })
  
    

  },[])
  
  let count = 10;
  let length = 2;
  let audio = new Audio(voice);
  let nums = ()=>{
    count--
    
    document.querySelector('.count').innerText = count;
    if(count === 1){
      clearInterval(nums)
    }
  }
  let counter1;
  let counter;
  let num = -1;
  let start = (e)=>{
    document.querySelector('.message1').style.display = "none";

    e.target.disabled = true
    
    num++;
    let array = document.getElementsByClassName('options');
      Array.from(array).forEach(function(Element){
        Element.checked = false;
      })
    counter1 =  setInterval(()=>{
     
      nums();
      if(count == 1){
        audio.play();
        clearInterval(counter1)
        count = 10;
        setTimeout(()=>{
        audio.pause()

        },2000)
      }
    },1000)
    if(count == 1){
      clearInterval(counter1)
      count = 30
    }
    
  
    setQuestion(quiz[num]);
    

    counter =   setInterval(function(){
      num++;
    counter1 =  setInterval(()=>{
        nums();
        if(count == 1){
          audio.play();
          setTimeout(()=>{
            audio.pause();

          },2000)
          clearInterval(counter1)
        }
      },1000)
      if(count == 1){
        clearInterval(counter1)
      }
      
     

      let array = document.getElementsByClassName('options');
      Array.from(array).forEach(function(Element){
        Element.checked = false;
      })
      
      
      
      setQuestion(quiz[num]);
  
      if(num > length){
        clearInterval(counter)
        console.log(score)
      
       

      }
     

    },10000);
    if(num > length){
      clearInterval(counter)
      console.log(score)
   
     
        
      
   

    }
    
    
    
   
  }
  let number = 0;
  let option =(e)=>{



    console.log(e.target.value);
    console.log(e.target.checked);
    
      let array = document.getElementsByClassName('options');
      Array.from(array).forEach(function(Element){
        Element.checked = false;
      })
      e.target.checked = true;
      
    
        if(e.target.value == question.answer){
          if(number == 0){
            console.log(number)
            setScore(score + 10);
          }
          else{
            return;
          }
       
          
        }
       

      
     
     
     
    

  }
  useEffect(()=>{
    console.log(score)

  },[score])
  function logout(){
    localStorage.removeItem("users");
    Navigate('/signin')
  }
  
  return (
      
    <div className='main-container'>
    <div className='loading  text-2xl w-full h-full z-10 opacity-50 flex justify-center items-center modal hidden' id = "loading">

<Loader className=' ' size='md'/>
    </div>
    <nav className='flex justify-between items-center sticky-top bg-gray-100 h-16 ' style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
    <div className='logo ml-3'>
    <Link to='/'>Tech Temple</Link>

    </div>
    <div>
      <button className=' h-9  w-24 bg-purple-500 text-white mr-3 rounded-xl font-bold' onClick={logout}>Log out</button>
    </div>
   </nav>
  
    <div className=' mt-6 mb-6'>
    
    <div className=' max-w-5xl m-auto border p-3 quiz '>
    <button onClick={start} className='bg-purple-400 text-white p-2 rounded-lg font-bold text-lg'>start</button>
    <div className='mt-3 flex justify-end pr-3 count text-xl font-bold'></div>
    {question?
      <>
      <div className='question flex justify-center mt-16 text-lg font-bold'>
    <p className='w-fit border-b-2'>{question.question}?</p>
        
    </div>
    <div className='options mt-32 flex justify-center'>
     <ol className='' type='A'>
     {question.options.map(Element=>(
      <li className='h-10 flex items-center '><input type='radio' className=' h-6 w-6 options' value={Element} onClick={option} /><span className='ml-6'>{Element}</span></li>
       

     ))}
        
        
     </ol>

    </div>

      </>

    :   <div className='loading  text-2xl w-full  z-10 opacity-50 flex justify-center items-center ' id = "loading">

<Loader className=' ' size='md'/>
</div>}
    
       <div>{score}</div>
    </div>
    
    <div className='flex justify-center message1 text-xl items-center  '>
      click start to start an quiz
    </div>
    

    </div>
    
      
    </div>
  )
}
