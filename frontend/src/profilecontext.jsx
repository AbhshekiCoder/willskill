import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import url from './misc/url';
import Navbar from './Components/Navbar';
import Profile from './Components/Navbar/Profile';

export const ProfileContext = createContext();
export const ProfileProvider = ({children})=>{
   
   
   let [users, setUsers]  = useState();

   useEffect(()=>{
    let token= localStorage.getItem('token');
    if(token){
  
       
        let user = async()=>{
      
         
           
              let result = await axios.post(`${url}user_detail`, {token});
            console.log(result.data);
            let name= result.data.name.split(' ');
            let data = name[0].split('');
         
            
            setUsers(name[0]);
            console.log(users)
        
            }
            
        
            
            user();
                
          
    }
    
 


   },[users]);
   useEffect(()=>{
    let token= localStorage.getItem('token');
    if(token){
  
       
        let user = async()=>{
      
         
           
              let result = await axios.post(`${url}user_detail/user_detail`, {token});
            console.log(result.data);
            let name= result.data.name.split(' ');
            let data = name[0].split('');
         
            
            setUsers(name[0]);
            console.log(users)
        
            }
            
        
            
            user();
                
          
    }
    
 


   },[<Profile/>]);
  
   
  
    return(
        <>
            <ProfileContext.Provider value = {users}>
            {children}

            </ProfileContext.Provider>
        </>
    )
}
export const useProfile = ()=>{
    return useContext(ProfileContext)
}