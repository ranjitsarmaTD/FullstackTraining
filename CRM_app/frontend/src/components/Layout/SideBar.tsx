import { NavLink } from "react-router-dom"

const SideBar =() => {
    const employeeName="John Doe";
    return (
        <aside className="aside">
            <p>This is the side bar</p> 
            <div className="ProfileInfo">
                <img src="img" alt="Profile Image"></img>
                <p>{employeeName}</p>
            </div>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="leave-apply">Apply for Leave</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/employee">Employee Info</NavLink>
            <NavLink to="/salary">Salary Info</NavLink>
        
        
        </aside>
    )
}   

export default SideBar