import { useContext } from "react"
import { Link } from "react-router"
import { userContext } from "../../context/AuthContext"


const Admin_Navbar = () => {
  const {logout,user} = useContext(userContext);
  return (
    <div className="flex justify-between w-full h-fit p-3 bg-emerald-400">
        <p className="font-bold text-xl">HRMS</p>
        <p className="text-lg">Welcome, {user?.name}</p>
        <Link onClick={logout} className="bg-emerald-700 py-0.5 px-2 font-bold rounded-md text-white" to="/login">Log Out</Link>
    </div>
  )
}

export default Admin_Navbar