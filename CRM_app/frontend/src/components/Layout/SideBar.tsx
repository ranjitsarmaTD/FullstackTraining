import { NavLink } from "react-router-dom"

const SideBar =() => {
    return (
        <aside className="aside">
            <p>This is the side bar</p> 
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="leave-apply">Apply for Leave</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/employee">Employee Info</NavLink>
        
        
        </aside>
    )
}   

export default SideBar