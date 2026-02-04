import { useState } from "react";
import "../styles/Login.css"

const Login =() => {
    const [signMode, setSignMode] = useState<"signin"|"signup">("signin");
    const [role, setRole] = useState<"employee"|"hr"|"admin">("employee");
    
    const options = ["Employee", "HR", "Admin"];

    //function to take data of id,pass and send to backend to be implemented later

    
   

    const handleRoleChange=(e:any):void=>{
        setRole(e.target.value);
    }

    return (
        <div className="auth-page">This is the login page
            <div className="sign-up-in">
                <div className="sign-tabs">
                    <button onClick={()=>(setSignMode("signin"))} disabled={signMode==="signin"}>Sign In</button>
                    <button onClick={()=>(setSignMode("signup"))} disabled={signMode==="signup"}>Sign Up</button>
                </div>
                <div className="sign-box">

                    <div className="role-selection">
                        <p>Your role is:</p>
                       <select value={role} onChange={handleRoleChange}>
                        <option value="">--Select a Role--</option>
                       
                        {options.map((option)=>(
                            <option value={option}>
                                {option}
                            </option>
                        ))
                        }
                       </select>
                       
                    </div>
                    
                    {signMode==="signin" ? (
                         <form className="sign-in-form">
                            <h2>Sign In</h2>
                            <label>ID:</label>
                            <input type="text" placeholder="Enter your ID"/>
                            <label>Password:</label>
                            <input type="password" placeholder="Enter your password"/>
                            <button type="submit" onSubmit={()=>{console.log("sign IN")}}>Sign In</button>
                        </form>
                    ) : (
                        <form className="sign-up-form">
                            <h2>Sign Up</h2>
                            <label>Name:</label>
                            <input type="text" placeholder="Enter your name"/>
                            <label>ID:</label>
                            <input type="text" placeholder="Enter your ID"/>
                            <label>Password:</label>
                            <input type="password" placeholder="Enter your password"/>
                            <button type="submit" onSubmit={()=>{console.log("sign UP data sent")}}>Sign Up</button>
                        </form>
                    )}      


                </div>
            </div>
        
        </div>
    )
}
export default Login