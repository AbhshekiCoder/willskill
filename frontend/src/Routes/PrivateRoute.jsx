import { useProfile } from "../profilecontext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ()=>{
    const profile = useProfile();
    console.log(profile);
    return profile?<Outlet/>:<Navigate to = "/"/>

}
export default PrivateRoute;