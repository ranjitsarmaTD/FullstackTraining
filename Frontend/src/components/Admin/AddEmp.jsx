import Select from 'react-select'
import { useEffect, useState } from 'react'
import Admin_Navbar from './Admin-Navbar'
import Admin_Sidebar from './Admin-Sidebar'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'

const AddEmp = () => {
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [salary, setSalary] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {id} = useParams();
    
    
    const roles = [
        {label: 'admin', value: 'admin'},
        {label: 'employee', value: 'employee'}
    ]
    const depts = [
        {label: 'IT', value: 'IT'},
        {label: 'QA', value: 'QA'},
        {label: 'Sales', value: 'Sales'},
        {label: 'Dev', value: 'Dev'},
        {label: 'HR', value: 'HR'}
    ]

    const handleSubmit = async () => {
        if(!name || !dept?.value || !salary || !role?.value || !password || !cpassword || !email){
            toast.error('Please provide all details');
            return;
        }
        if(password != cpassword){
            toast.error('Please enter same password');
            return;
        }
        // console.log(name, dept?.value, salary, role?.value, password,cpassword, email)
        try {
            const response = await axios.post('http://localhost:3000/api/emp/add', {
                name, 
                dept: dept?.value,
                salary,
                role: role?.value,
                password,
                email
            })
            toast.success('Employee added successfully');
        } catch (error) {
            toast.error('Failed to add Employee');
            console.log(error.message);
        }
        navigate('/admin-employees');
    }

    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/emp/${id}`, {
                name, 
                dept: dept,
                salary,
                role: role,
                password,
                email
            })
            toast.success('Employee updated successfully');
        } catch (error) {
            toast.error('Failed to Update');
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/emp/${id}`);
                const emp = response?.data?.emp;
                setDept(emp.dept);
                setEmail(emp.email);
                setName(emp.name);
                setRole(emp.role);
                setSalary(emp.salary);
                setPassword(emp.password);
                setCpassword(emp.password);
                toast.success('Successfully fetched employee');
            } catch (error) {
                toast.error('failed to fetch employee')
            } finally {

            }
        }
        if(id){
            fetchEmployee();
        }
        setLoading(false);
    }, [])

  return (
    <div className="">
        <Admin_Navbar/>
        <div className='flex h-screen w-full'>
            <div className="w-1/6 h-full bg-amber-50">
                <Admin_Sidebar/>
            </div>
            <div className="w-5/6 h-full bg-amber-50 ">
                <>
                {
                    id && loading ? <TailSpin/> :
                    <div className='flex flex-col justify-center items-center h-full shadow-2xl'>
                        <p className='text-2xl font-bold mb-5'>{id ? 'Edit Employee' : 'Add New Employee'}</p>
                        <form className="flex flex-wrap flex-col">
                            <label className="text-md " htmlFor="emp-name">Employee Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" id="emp-name" type="text" />
                            <label className="text-md " htmlFor="dept-name">Department Name</label>
                            <Select value={depts.find(d => d.value === dept)} onChange={setDept} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" options={depts} />
                            <label className="text-md " htmlFor="salary">Salary</label>
                            <input value={salary} onChange={(e) => setSalary(e.target.value)} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" id="salary" type="number" />
                            <label className="text-md " htmlFor="Role">Role</label>
                            <Select value={id ? roles.find(r => r.value === role) : ''} onChange={setRole} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" options={roles} />
                            <label className="text-md " htmlFor="login-id">Login ID</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" id="login-id" type="text" />
                            <label className="text-md " htmlFor="pass">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" id="pass" type="password" />
                            <label className="text-md " htmlFor="cpass">Confirm Password</label>
                            <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} required className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 m-1" id="cpass" type="password" />
                        </form>
                        <button onClick={id ? handleEdit : handleSubmit} className="mb-20 text-center bg-blue-400 w-fit py-2 px-5 rounded-md font-bold mt-5 cursor-pointer">{id ? 'Edit Employee' : 'Add Employee'}</button>
                    </div>
                }
                </>
            </div>
        </div>
    </div>
  )
}

export default AddEmp