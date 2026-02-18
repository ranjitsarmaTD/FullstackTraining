import APstyles from "../../styles/AttendancePage.module.css";
import { useState, useEffect } from "react";

type DailyAttendance = {
  date: string;
  signIn: string | null;
  signOut: string | null;
  duration: string;
  status: "PRESENT" | "HALF_DAY" | "ABSENT";
};

type MonthlySummary = {
  month: string;
  totalDays: number;
  weekends: number;
  holidays: number;
  workingDays: number;
  presentDays: number;
  absentDays: number;
};

const AttendancePage = () => {
  const [today, setToday] = useState<DailyAttendance | null>(null);
  const [weeklyRecords, setWeeklyRecords] = useState<DailyAttendance[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(
    null,
  );

  //Sign in/out duration to match quota and based on that attendance will be marked

  //time record of when you signed in today, and signed out.

  //record for a week.

  //a section showing last few months. No of days in month-holidays(including Sat + sun)=worked days.

  useEffect(() => {
    // Simulating backend response
    setToday({
      date: "2026-02-13",
      signIn: "09:42",
      signOut: "18:21",
      duration: "8h 39m",
      status: "PRESENT",
    });

    setWeeklyRecords([
      {
        date: "Mon",
        signIn: "09:45",
        signOut: "18:10",
        duration: "8h 25m",
        status: "PRESENT",
      },
      {
        date: "Tue",
        signIn: "10:30",
        signOut: "17:00",
        duration: "6h 30m",
        status: "HALF_DAY",
      },
      {
        date: "Wed",
        signIn: null,
        signOut: null,
        duration: "0h",
        status: "ABSENT",
      },
    ]);

    setMonthlySummary({
      month: "January 2026",
      totalDays: 31,
      weekends: 8,
      holidays: 2,
      workingDays: 21,
      presentDays: 19,
      absentDays: 2,
    });
  }, []);

  return (
    <div className={APstyles.attendanceContainer}>
      <div className={APstyles.attendanceHeader}>
        <h1>Your Attendance Records</h1>
      </div>


      <div className={APstyles.attendanceTable}>
       
        {today && (
          <section className={APstyles.card}>
            <h3>Today :</h3>
            <div className={APstyles.row}>
              <span>Sign In:</span>
              <span>{today.signIn ?? "--"}</span>
            </div>
            <div className={APstyles.row}>
              <span>Sign Out:</span>
              <span>{today.signOut ?? "--"}</span>
            </div>
            <div className={APstyles.row}>
              <span>Duration:</span>
              <span>{today.duration}</span>
            </div>
            <div className={`${APstyles.status} ${APstyles[today.status]}`}>
              {today.status}
            </div>
          </section>
        )}

        {monthlySummary && (
          <section className={APstyles.card}>
            <h3>{monthlySummary.month}</h3>
            <div className={APstyles.grid}>
              <p>Total Days: {monthlySummary.totalDays}</p>
              <p>Weekends: {monthlySummary.weekends}</p>
              <p>Holidays: {monthlySummary.holidays}</p>
              <p>Working Days: {monthlySummary.workingDays}</p>
              <p>Present: {monthlySummary.presentDays}</p>
              <p>Absent: {monthlySummary.absentDays}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
