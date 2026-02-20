import Admin_Navbar from "./Admin-Navbar"
import Admin_Sidebar from "./Admin-Sidebar"

const Admin_salary = () => {
  return (
    <div>
        <Admin_Navbar/>
        <div className="flex w-full h-screen">
            <div className="w-1/6 h-full">
                <Admin_Sidebar/>
            </div>

            <div className="w-5/6 h-full p-5 bg-amber-50">
                
            </div>
        </div>
    </div>
  )
}

export default Admin_salary