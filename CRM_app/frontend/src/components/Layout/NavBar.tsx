import { useEffect } from "react";
import "../../styles/Layout.css"
import {Link} from 'react-router-dom'
import axios from "axios";
import {useNavigate }from "react-router-dom";

const NavBar=() => {
    // const [loggedIn,setLoggedIn]=useState<boolean>(true);
    const navigate=useNavigate();

    useEffect(()=>{
        //token expires, setLoggedIn to false
    },[])

    
  const handleLogout=async(e:React.MouseEvent<HTMLAnchorElement>)=>{ 
    e.preventDefault();
    try{
      const res= await axios.post(
        "http://localhost:4000/auth/logout",{},
        {
          withCredentials:true
        }
      );
      console.log("Response:", res.data.message);
      navigate("/login");
    }
    catch(err)
    {
      console.log("Error logging out:",err)
    }
  }
    return (
        <nav className="nav"> 
            <p>Company Portal</p>
            <p>Welcome User</p>
            <Link to="/login" onClick={handleLogout}>Log Out</Link>
        </nav>
    )
}

export default NavBar