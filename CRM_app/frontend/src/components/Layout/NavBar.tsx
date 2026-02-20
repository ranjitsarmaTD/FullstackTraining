import { useEffect, useState } from "react";
import "../../styles/Layout.css"
import {Link} from 'react-router-dom'


const NavBar=() => {
    const [loggedIn,setLoggedIn]=useState<boolean>(true);

    useEffect(()=>{
        //token expires, setLoggedIn to false
    },[])


    return (
        <nav className="nav"> 
            <p>Company Portal</p>
            <p>Welcome User</p>
            <Link to="/login">{loggedIn? "Log Out":"Expired"}</Link>
        </nav>
    )
}

export default NavBar