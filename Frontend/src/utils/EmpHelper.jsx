import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const Empcolumn = [
    {
        name: "S No",
        selector: (row) => row.Sno
    },
    {
        name: "Employee Name",
        selector: (row) => row.name
    },
    {
        name: "Department",
        selector: (row) => row.dept
    },
    {
        name: "Salary",
        selector: (row) => row.salary
    },
    {
        name: "Role",
        selector: (row) => row.role
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const handleDelete = async (id, onEmpDelete) => {
    if(!id){
        toast.error('Missing Id');
        return;
    }
    try {
        const response = await axios.delete(`http://localhost:3000/api/emp/${id}`);
        if(!response?.data?.success){
            toast.error('Failed to delete, try again')
        } else {
            toast.success('Employee deleted');
            onEmpDelete(id);
        }
    } catch (error) {
        toast.error('failed to delete, try again');
    }
}
export const EmpButtons = ({id, onEmpDelete}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap space-x-3 text-white items-center justify-center">
            <button onClick={() => navigate(`/admin-employees/edit/${id}`)} className="px-4 py-1 bg-teal-600">Edit</button>
            <button onClick={() => handleDelete(id, onEmpDelete)} className="px-4 py-1 bg-red-600">Delete</button>
        </div>
    )
}