import { NavLink } from "react-router"


const Admin_Sidebar = () => {
  return (
    <div>
        <div className="flex w-full h-screen">
            <div className="w-full h-screen flex flex-col bg-gray-600 text-white">
                <NavLink className={({isActive}) => isActive ? "bg-emerald-400 m-2 p-1 rounded-md px-2" : "m-2 p-1 rounded-md"} to="/admin-dashboard" >Dashboard</NavLink>
                <NavLink className={({isActive}) => isActive ? "bg-emerald-400 m-2 p-1 rounded-md px-2" : "m-2 p-1 rounded-md"} to="/admin-employees" >Employees</NavLink>
                <NavLink className={({isActive}) => isActive ? "bg-emerald-400 m-2 p-1 rounded-md px-2" : "m-2 p-1 rounded-md"} to="/admin-dept" >Departments</NavLink>
                <NavLink className={({isActive}) => isActive ? "bg-emerald-400 m-2 p-1 rounded-md px-2" : "m-2 p-1 rounded-md"} to="/admin-leaves" >Leaves</NavLink>
                <NavLink className={({isActive}) => isActive ? "bg-emerald-400 m-2 p-1 rounded-md px-2" : "m-2 p-1 rounded-md"} to="/admin-salary" >Salary</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Admin_Sidebar