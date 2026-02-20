import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import LiveTime from "../../components/DashboardComponents/LiveTime";
import Holidays from "../../components/DashboardComponents/Holidays";
import MemoList from "../../components/DashboardComponents/MemoList";
import WorkDays from "../../components/DashboardComponents/WorkDays";

const Dashboard = () => {
  const [signedIn, setSignedIn] = useState(false);
  const[signInTime, setSignInTime] = useState<Date | null>(new Date());

  //function to send sign-in data to backend for employee attendance
  const handleSignIn = () => {
     setSignedIn(!signedIn)

     const currentTime = new Date();
     setSignInTime(currentTime);
     //we send this to backend to record attendance
     console.log(signedIn ? "Sign-Out time:" : "Sign-In time:", currentTime);
     
     //axios.post())
    
  }


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
          <p className={styles.dashboardText}>Your Dashboard</p>
          <p className={styles.welcomeText}>Welcome back, Employee!</p>
      </div>
      <div className={styles.dashboardCards}>
        <div className={styles.daySignInOut}>
          <p> {signedIn ? "Sign Out" : "Sign In"} for the day.</p>
          <button
            className={signedIn ? styles.signInButtonActive : styles.signInButtonInactive}
            onClick={handleSignIn}
          >
            {signedIn ? "Sign Out" : "Sign In"}
          </button>
            <LiveTime/>

        </div>
        <WorkDays/>
        <MemoList/>
        <Holidays/>
        
      </div>
    </div>
  );
};

export default Dashboard;
