import { Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Admin_employees from "./components/Admin/Admin-employees"
import Admin_dashboard from "./components/Admin/Admin-dashboard"
import Admin_dept from "./components/Admin/Admin-dept"
import Admin_leaves from "./components/Admin/Admin-leaves"
import EmpDashboard from "./components/Employee/EmpDashboard"
import AddDept from "./components/Admin/AddDept"
import EditDept from "./components/Admin/EditDept"
import AddEmp from "./components/Admin/AddEmp"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-dashboard" element={<Admin_dashboard/>}/>
        <Route path="/admin-employees" element={<Admin_employees/>}/>
        <Route path="/admin-employees/add" element={<AddEmp/>}/>
        <Route path="/admin-employees/edit/:id" element={<AddEmp/>}/>
        <Route path="/admin-dept" element={<Admin_dept/>}/>
        <Route path="/admin-dept/add" element={<AddDept/>}/>
        <Route path="/dept/edit/:id" element={<EditDept/>}/>
        <Route path="/admin-leaves" element={<Admin_leaves/>}/>
        <Route path="/admin-salary" element={<Admin_leaves/>}/>
        <Route path="/employee-dashboard" element={<EmpDashboard/>}/>
      </Routes>
    </div>
  )
}

export default App