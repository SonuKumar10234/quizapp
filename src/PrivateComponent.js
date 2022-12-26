import React from "react";
import {Navigate, Outlet} from 'react-router-dom'

const PrivateComponent=()=>{
    const isVisited = localStorage.getItem("visited");
    return isVisited?<Outlet/> :<Navigate to='/' />
        
}
export default PrivateComponent;