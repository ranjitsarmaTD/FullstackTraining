import { useEffect, useState } from "react"
import Admin_Navbar from "./Admin-Navbar"
import Admin_Sidebar from "./Admin-Sidebar"
import { Link } from "react-router";
import { EmpButtons, Empcolumn } from "../../utils/EmpHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const Admin_employees = () => {
    const [loading, setLoading] = useState(true);
    const [Employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const onEmpDelete = (id) => {
        // console.log('hiii');
        setEmployees((prev) => prev.filter((item) => item.id !== id))
    }
    const filterEmp = (e) => {
        setSearch(e.target.value);
    };

    const filteredData = Employees.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        setLoading(true);
        const fetchEmp = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/emp');
                if(response?.data?.emp){
                    let sno = 1;
                    const data = response.data.emp.map((item) => (
                        {
                            id: item.id,
                            Sno: sno++,
                            name: item.name,
                            dept: item.dept,
                            salary: item.salary,
                            role: item.role,
                            action: (<EmpButtons id={item?.id} onEmpDelete={onEmpDelete}/>)
                        }
                    ))
                    setEmployees(data);
                }
                toast.success('Successfully Fetched Employees')
            } catch (error) {
                toast.error('Failed to fetch Employees');
            } finally {
                setLoading(false)
            }
            // console.log(response);
        }
        fetchEmp();
    }, [])
  return (
    <div>
        <Admin_Navbar/>
        <div className="flex w-full h-screen">
            <div className="w-1/6 h-full">
                <Admin_Sidebar/>
            </div>

            <div className="w-5/6 h-full p-5 bg-amber-50">
                <p className="text-center text-2xl font-bold my-3">Manage Employees</p>
                <div className="flex justify-between">
                  <input onChange={filterEmp} className="bg-white p-2 outline-none font-medium" placeholder="Search By Employee Name" type="text" />
                  <Link className="text-white bg-emerald-400 font-medium p-2 rounded-md" to={'/admin-employees/add'} >Add New Employee</Link>
                </div>
                <>
                {
                    loading ? <TailSpin/> :
                    <div className="mt-5">
                        <DataTable columns={Empcolumn} data={filteredData}/>
                    </div>
                }
                </>
            </div>
        </div>

    </div>
  )
}

export default Admin_employees