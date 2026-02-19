import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.Sno
    },
    {
        name: "Department Name",
        selector: (row) => row.Dept_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

const handleDelete = async (id, navigate, onDeptDelete) => {
    const response = await axios.delete(`http://localhost:3000/api/dept/${id}`);
    // console.log(response);
    if(!response?.data?.success){
        toast.error('Failed to delete, try again')
    } else {
        toast.success('Department deleted');
        onDeptDelete(id);
    }
    // navigate('/admin-dept')
}

export const DeptButtons = ({id, onDeptDelete}) => {
    const navigate = useNavigate();
    return (
        <div className="flex space-x-3 text-white">
            <button className="px-4 py-1 bg-teal-600"
            onClick={() => navigate(`/dept/edit/${id}`)}>Edit</button>
            <button className="px-4 py-1 bg-red-600"
            onClick={() => handleDelete(id, navigate, onDeptDelete)}>Delete</button>
        </div>
    )
}