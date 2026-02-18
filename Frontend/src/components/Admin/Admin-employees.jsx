import Admin_Navbar from "./Admin-Navbar"
import Admin_Sidebar from "./Admin-Sidebar"

const Admin_employees = () => {
    const users = 
    [
        {
            id: 1,
            Name: "Ranjit Sarma",
            Department: "IT",
        },
        {
            id: 2,
            Name: "Dip Saha",
            Department: "IT Support",
        },
        {
            id: 3,
            Name: "Saranga Bora",
            Department: "Testing",
        },
        {
            id: 4,
            Name: "Raktim Parasar",
            Department: "Development",
        }
    ]
    // const [users, setUsers] = useState(
        
    // )
  return (
    <div>
        <Admin_Navbar/>
        <div className="flex w-full h-screen">
            <div className="w-1/6 h-full">
                <Admin_Sidebar/>
            </div>

            <div className="w-5/6 h-full p-5 bg-amber-50">
                <table className="w-full h-screen flex gap-5 flex-col ">
                    <caption className="text-center font-bold text-xl">Manage Employees</caption>
                    <thead>
                        <tr className="w-full flex justify-between">
                            <th className="w-1/3">S No</th>
                            <th className="w-1/3">Name</th>
                            <th className="w-1/3">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item) => (
                                <tr key={item.id} className="w-full flex justify-between">
                                    <td className="w-1/3 text-center">{item.id}</td>
                                    <td className="w-1/3 text-center">{item.Name}</td>
                                    <td className="w-1/3 text-center">{item.Department}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
        </div>

    </div>
  )
}

export default Admin_employees