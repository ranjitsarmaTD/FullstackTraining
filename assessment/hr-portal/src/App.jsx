import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layouts/mainLayout'
import AdminDashboard from './pages/adminDashboard/adminDashboard'
import Employee from './pages/employee/employee'
import LeaveRequests from './pages/leaveRequests/leaveRequests'
import MyLeaves from './pages/myLeaves/myLeaves'
import Login from './pages/login/login'
// import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { setUserFromStorage } from './store/thunks/authThunk'
import EmployeeDashboard from './pages/employeeDashboard/employeeDashboard'
import ProtectedRoute from './components/micro/protectedRoute/protectedRoute'
import AdminProfile from './pages/adminProfile/adminProfile'
import EmployeeProfile from './pages/employeeProfile/employeeProfile'
// import { setUserFromStorage } from './store/thunks/authThunk'

function App() {
  // const dispatch = useDispatch();
  // const { user } = useSelector(state => state.auth)
  // const location = window.location.pathname

  useEffect(() => {
    // dispatch(setUserFromStorage())
    
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<MainLayout/>}>
          <Route 
            path='/admin/dashboard' 
            element={<ProtectedRoute allowedRole="Admin">
              <AdminDashboard/>
            </ProtectedRoute>}/>
          <Route 
            path='/employee/dashboard' 
            element={<ProtectedRoute allowedRole="Employee">
              <EmployeeDashboard/>
            </ProtectedRoute>}/>
          <Route
            path='/admin/profile'
            element={<ProtectedRoute allowedRole="Admin">
              <AdminProfile/>
            </ProtectedRoute>}
          />
          <Route
            path='/employee/profile'
            element={<ProtectedRoute allowedRole="Employee">
              <EmployeeProfile/>
            </ProtectedRoute>}
          />
          <Route 
            path='/my-leaves' 
            element={<ProtectedRoute allowedRole="Employee">
              <MyLeaves/>
            </ProtectedRoute>}/>
          <Route 
            path='/leave-requests' 
            element={<ProtectedRoute allowedRole="Admin">
              <LeaveRequests/>
            </ProtectedRoute>}/>
          <Route 
            path='/employees' 
            element={<ProtectedRoute allowedRole="Admin">
              <Employee/>
            </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
