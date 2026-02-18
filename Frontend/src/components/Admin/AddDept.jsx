import React, { useState } from 'react'
import Admin_Navbar from './Admin-Navbar'
import Admin_Sidebar from './Admin-Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


const AddDept = () => {
    const [DeptName, setDeptName] = useState('');
    const [DeptDesc, setDeptDesc] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(!DeptDesc || !DeptName){
            toast.error('Please Provide Department Name & Description');
            return;
        }
        const response = await axios.post('http://localhost:3000/api/dept/add-dept',{
            dept_name: DeptName,
            dept_description: DeptDesc
        })
        // console.log(response);
        if(response?.data?.success){
            toast.success('Department Added Successfully');
        } else {
            toast.error('Failed to add the department');
        }
        navigate('/admin-dept');
    }
  return (
    <div className="">
        <Admin_Navbar/>
        <div className='flex h-screen w-full'>
            <div className="w-1/6 h-full bg-amber-50">
                <Admin_Sidebar/>
            </div>
            <div className="w-5/6 h-full bg-amber-50 ">
                <div className='flex flex-col justify-center items-center h-full bg-emerald-50 shadow-2xl'>
                    <p className='text-2xl font-bold mb-5'>Add New Department</p>
                    <form className="flex flex-col">
                        <label className="text-md" htmlFor="dept-name">Department Name</label>
                        <input required onChange={(e) => setDeptName(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 mb-5" id="dept-name" type="text" />
                        <label className="text-md" htmlFor="desc">Description</label>
                        <input required onChange={(e) => setDeptDesc(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 required:" id="desc" type="text" />
                    </form>
                    <button onClick={handleSubmit} className="mb-20 text-center bg-blue-400 w-fit py-2 px-5 rounded-md font-bold mt-5 cursor-pointer">Add Dept</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDept