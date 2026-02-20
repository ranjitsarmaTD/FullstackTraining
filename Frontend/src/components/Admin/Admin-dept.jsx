import { Link } from "react-router"
import Admin_Navbar from "./Admin-Navbar"
import Admin_Sidebar from "./Admin-Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import DataTable from 'react-data-table-component'
import { columns, DeptButtons } from "../../utils/DeptHelper"
import toast from "react-hot-toast"
import { TailSpin } from "react-loader-spinner"

const Admin_dept = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const onDeptDelete = (id) => {
    setDepartments(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dept', {
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(response);
        if (response.data.success) {
          let sno = 1;
          const data = response.data.dept.map((item) => (
            {
              id: item.id,
              Sno: sno++,
              Dept_name: item.name,
              action: (<DeptButtons id={item.id} onDeptDelete={onDeptDelete}/>)
            }
          ))
          setDepartments(data);
          // setFilterDepartments(data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchDept();
  }, []);

  const filterDept = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = departments.filter(item =>
    item.Dept_name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div>
      <Admin_Navbar />
      <div className="flex w-full h-screen">
        <div className="w-1/6 h-full">
          <Admin_Sidebar />
        </div>
        <>
          {
            loading ? <TailSpin /> :
              <div className="w-5/6 h-full p-5 bg-amber-50">
                <p className="text-center text-2xl font-bold my-3">Manage Department</p>
                <div className="flex justify-between">
                  <input onChange={filterDept} className="bg-white p-2 outline-none font-medium" placeholder="Search By Dept Name" type="text" />
                  <Link className="text-white bg-emerald-400 font-medium p-2 rounded-md" to={'/admin-dept/add'} >Add New Department</Link>
                </div>
                <div className="mt-5">
                  <DataTable columns={columns} data={filteredData} />
                </div>
              </div>
          }
        </>
      </div>
    </div>
  )
}

export default Admin_dept