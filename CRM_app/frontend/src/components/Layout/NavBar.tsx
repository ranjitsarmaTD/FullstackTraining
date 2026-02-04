import "../../styles/Layout.css"
import {Link} from 'react-router-dom'


const NavBar=() => {
    return (
        <nav className="nav"> 
            <p>Company Portal</p>
            <p>Welcome User</p>
            <Link to="/login">Signin/SignOut</Link>
        </nav>
    )
}

export default NavBar