import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../features/userinfo';


export const store = configureStore({
    reducer:{
        name: userSlice,
        
    },
   
})

