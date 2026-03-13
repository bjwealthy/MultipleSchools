import { Outlet } from "react-router-dom";
import Navbar from "./utility components/navbar/Navbar";

export default function Client(){
    return (
        <>
            <h1>Client Main Component</h1>  
            <Navbar />
            <Outlet />
        </>
    )
}