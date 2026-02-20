import axios from "axios";
import { createContext, useState } from "react"

export const userContext = createContext({});
export const AuthContext = ({children}) => {
    const [user, setUser] = useState(null)

    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if(!token){
        setUser(null);
        return {success: false, message: "Missing Token"};
      }
      try {
        const response = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        if(response?.data?.success){
          setUser(response?.data?.user)
          return {success: true, message: "Found a match"}
        }
        return {success: false, message: "cannot find user"};;
      } catch (error) {
        setUser(null);
        return {success: false, message: error};
      }
    }
    const login = (user) => {
      setUser(user)
    }
    const logout = () => {
      setUser(null);
      localStorage.removeItem('token');
    }
  return (
    <userContext.Provider value={{user, login, logout, verifyUser}}>
        {children}
    </userContext.Provider>
  )
}

// module.exports = AuthContext