import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layouts/mainLayout'
import Home from './pages/home/home'
import Employee from './pages/employee/employee'
import LeaveRequests from './pages/leaveRequests/leaveRequests'
import MyLeaves from './pages/myLeaves/myLeaves'

function App() {

  return (
    <BrowserRouter>
      <MainLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/my-leaves' element={<MyLeaves/>}/>
        <Route  path='/leave-requests' element={<LeaveRequests/>}/>
        <Route path='/employees' element={<Employee/>} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
