import React, { useEffect, useState } from 'react'
import Admin_Navbar from './Admin-Navbar'
import Admin_Sidebar from './Admin-Sidebar'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const EditDept = () => {
    const [DeptName, setDeptName] = useState('');
    const [DeptDesc, setDeptDesc] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchDept = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dept/${id}`);
                // console.log(dept);
                if (!response) {
                    toast.error('Invalid Department, try again');
                    navigate('/admin-dept');
                }
                // console.log(response);
                setDeptName(response?.data?.dept?.name);
                setDeptDesc(response?.data?.dept?.description);
            } catch (error) {
                toast.error(error.message);
                navigate('/admin-dept');
            } finally {
                setLoading(false);
            }
        }
        fetchDept();
    }, [])

    const handleChange = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/dept/${id}`, {
                DeptDesc, DeptName
            })
            if(!response){
                toast.error("Failed to edit department");
            } else {
                toast.success('Update successfully');
            }
        } catch (error) {
            toast.error(error.message);
        }
        navigate('/admin-dept')
    }
    return (
                
    <div>
        <div className="">
            <Admin_Navbar />
            <div className="flex w-full h-screen">
                <div className="w-1/6 h-full">
                    <Admin_Sidebar />
                </div>
                <>
                {
                    loading ? <TailSpin/> : 
                    <div className="w-5/6 h-full bg-amber-50 ">
                        <div className='flex flex-col justify-center items-center h-full bg-emerald-50 shadow-2xl'>
                            <p className='text-2xl font-bold mb-5'>Edit Department</p>
                            <form className="flex flex-col">
                                <label className="text-md" htmlFor="dept-name">Department Name</label>
                                <input value={DeptName} required onChange={(e) => setDeptName(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 mb-5" id="dept-name" type="text" />
                                <label className="text-md" htmlFor="desc">Description</label>
                                <input value={DeptDesc} required onChange={(e) => setDeptDesc(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 required:" id="desc" type="text" />
                            </form>
                            <button onClick={handleChange} className="mb-20 text-center bg-blue-400 w-fit py-2 px-5 rounded-md font-bold mt-5 cursor-pointer">Change Dept</button>
                        </div>
                    </div>
                }
                </>
            </div>
        </div>
    </div>
    )
}

export default EditDept