// import { UserContextType } from "./UserContext";
// import { User } from "./UserContext";
import { createContext,useContext } from "react";


type User = {
    employeeId: string;
    name: string; 
    email: string;
    role: "admin" | "employee" | "hr";
}

type UserContextType = {
    user:User|null,
    loading:boolean,
    setUser:(user:User|null) => void;
}


export const UserContext= createContext<UserContextType|undefined>(undefined);


export const useUser=():UserContextType=>{
    const context=useContext(UserContext)
    if(context===undefined)
    {
        throw new Error("useUser must be used within a UserProvider")

    }
    return context;
}