import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole}){
    const { isLoggedIn, role, loading } = useSelector(state => state.auth)

    useEffect(() => {
        console.log(loading, isLoggedIn);
        
        if( !loading && !isLoggedIn){
            return <Navigate to="/"/>
        }

        if(allowedRole && role !== allowedRole){
            return <Navigate to="/unauthorized"/>
        }
    }, [loading, isLoggedIn])

    return children;
}

export default ProtectedRoute;