import Login from "./Pages/Login";
import Dashboard from "./Pages/Employee_side/Dashboard";
import AttendancePage from "./Pages/Employee_side/AttendancePage";
import EmployeeInfo from "./Pages/Employee_side/EmployeeInfo";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import LeaveManagement from "./Pages/Employee_side/Leave/LeaveManagement";
import ProtectedRoute from "./routes/ProtectedRoute";
import SalaryInfo from "./Pages/Employee_side/SalaryInfo";
import ApproveLeavePage from "./Pages/HR_side/ApproveLeavePage";
import SalaryManagementPage from "./Pages/HR_side/SalaryManagementPage";
function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="employee" element={<EmployeeInfo />} />
          <Route path="leave-apply" element={<LeaveManagement />} />
          <Route path="salaryInfo" element={<SalaryInfo />} />
          <Route element={<ProtectedRoute allowedRoles={["hr", "admin"]} />}>
            <Route path="approve-leave" element={<ApproveLeavePage />} />
            <Route path="salaryManagement" element={<SalaryManagementPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
