import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import LiveTime from "../../components/DashboardComponents/LiveTime";
import Holidays from "../../components/DashboardComponents/Holidays";
import MemoList from "../../components/DashboardComponents/MemoList";
import WorkDays from "../../components/DashboardComponents/WorkDays";
import { useUser } from "../../context/useUser";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [signInTime, setSignInTime] = useState<Date >(new Date());

  const { user } = useUser();

  //function to send sign-in data to backend for employee attendance
  const handleSignIn = () => {
    setSignInTime(new Date());

    setSignedIn(!signedIn);

    // const signInTime = new Date();
    
    console.log(signedIn ? "Sign-Out time:" : "Sign-In time:", signInTime);
    if (signedIn) {
      toast.success("Signed out successfully! @ " + signInTime.toLocaleTimeString());
    } else {
      toast.success("Signed in successfully! @ " + signInTime.toLocaleTimeString());
    }
   
  };

  return (
    <div className={styles.dashboardContainer}>
      <div>
        <Toaster />
      </div>
      <div className={styles.dashboardHeader}>
        <p className={styles.dashboardText}>Your Dashboard</p>
        <p className={styles.welcomeText}>
          Welcome back, {user?.name || "Employee"}!
        </p>
      </div>
      <div className={styles.dashboardCards}>
        <div className={styles.daySignInOut}>
          <p> {signedIn ? "Sign Out" : "Sign In"} for the day.</p>
          <button
            className={
              signedIn ? styles.signInButtonActive : styles.signInButtonInactive
            }
            onClick={handleSignIn}
          >
            {signedIn ? "Sign Out" : "Sign In"}
          </button>
          <LiveTime />
        </div>
        <WorkDays />
        <MemoList />
        <Holidays />
      </div>
    </div>
  );
};

export default Dashboard;
