import { useState } from "react";
import LoginStyle from "../styles/Login.module.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useUser } from "../context/useUser";
// 

type Role = "employee" | "hr" | "admin";


const Login = () => {
  const navigate= useNavigate();
  const {setUser} = useUser();

  const [role, setRole] = useState<Role>("employee");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  //function to take data of id,pass and send to backend to be implemented later

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !password) {
      alert("Please enter ID and password");
      return;
    }
    try{
       console.log("In frontend")
       const res= await api.post(
         "http://localhost:4000/auth/login",
       {
         role,employeeId:userId,password
       },
       {
         withCredentials:true
       }
    );
    console.log("Login success:", res.data);
    setUser(res.data.user);
    navigate("/")
    
   }
   catch(err)
   {
     console.log("Error sending credentials:",err)
   }
    
    

    console.log({
      role,
      userId,
      password
    });
  };


  return (
    <div className={LoginStyle.authPage}>
      <div className={LoginStyle.loginCard}>
        <h2 className={LoginStyle.title}>Employee Portal Login</h2>

        {/* ROLE SELECTION */}
        <div className={LoginStyle.roleSelection}>
          <label>Your role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* LOGIN FORM */}
        <form className={LoginStyle.loginForm} onSubmit={handleSubmit}>
          <label htmlFor="userId">Employee ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your ID"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className={LoginStyle.portalLogo}>
        PORTAL LOGO
      </div>
    </div>
  );
};

export default Login;
