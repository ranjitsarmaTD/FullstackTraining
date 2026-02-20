import { useContext, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { userContext } from "../../context/AuthContext";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(userContext)
    const navigate = useNavigate();


    async function handleSubmit(){
        if(!email || !password){
            toast.error('Please provide the Login id and Password')
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {email, password}
            );
            // console.log(response);
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role == 'admin'){
                    navigate('/admin-dashboard');
                } else if(response.data.user.role == 'employee'){
                    navigate('/employee-dashboard')
                } else {
                    navigate('/login')
                }
            }else{
                navigate('/login');
            }
            // navigate('/admin-dashboard', {state: response?.data?.user || {}});
            // const user = response.
            // navigate("/admin")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed"); 
            // console.log(error);
        }
    }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-amber-50">
        <div className="w-fit h-fit flex flex-col justify-center items-center shadow-2xl p-10">
            <h1 className="text-2xl font-bold pb-5">Login to greytHR</h1>
            <p className="">Hello There!</p>
            <form className="flex flex-col">
                <label className="text-sm" htmlFor="login-id">Login ID</label>
                <input required onChange={(e) => setEmail(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 mb-5" id="login-id" type="text" />
                <label className="text-sm" htmlFor="password">Password</label>
                <input required onChange={(e) => setPassword(e.target.value)} className="bg-blue-100 w-60 rounded-sm outline-none p-0.5 mt-1 required:" id="password" type="password" />
                <div className="flex justify-end">
                    <button className="m-1 text-blue-900 text-sm cursor-pointer">Forgot Password</button>
                </div>
            </form>
            <button onClick={handleSubmit} className="text-center bg-blue-400 w-full p-1 rounded-md font-bold mt-2 cursor-pointer">Log in</button>           
        </div>
    </div>
  )
}

export default Login