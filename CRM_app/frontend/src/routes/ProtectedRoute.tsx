import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/useUser";




type Props = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({allowedRoles}:Props) => {

  const {user}=useUser();


  // if (loading) return <p>Checking session...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }

  return <Outlet />;
};

export default ProtectedRoute;
