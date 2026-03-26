import { NavLink } from "react-router-dom";
import { useUser } from "../../context/useUser";
import UserProfileDropdown from "./UserProfileDropdown";
const SideBar = () => {
  const { user } = useUser();
  const role = user?.role;

  // const employeeName=user?.name || "John Doe";
  return (
    <aside className="aside">
      {/* <div className="ProfileInfo">
                <img src="img" alt="img"></img>
                <p>{employeeName}</p>
            </div> */}
      <UserProfileDropdown />

      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="leave-apply">Apply for Leave</NavLink>
      {role === "hr" && <NavLink to="/approve-leave">Approve Leaves</NavLink>}
      <NavLink to="/attendance">Attendance</NavLink>
      <NavLink to="/employee">Employee Info</NavLink>
      <NavLink to="/salaryInfo">Personal Salary Info</NavLink>
      {role === "hr" && (
        <NavLink to="/salaryManagement">Employee Salary Info</NavLink>
      )}
    </aside>
  );
};

export default SideBar;
