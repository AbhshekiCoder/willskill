import { useProfile } from "../profilecontext";
import { Outlet, Navigate } from "react-router-dom";



function PublicRoute(){
    return <Outlet/>
}

export default PublicRoute;