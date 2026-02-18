import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css"


function LiveTime(){
    const [now,setNow]=useState(new Date());

    useEffect(()=>{
        const timer=setInterval(()=>{
            setNow(new Date());
        },1000)
        

        return()=> clearInterval(timer);
    })

    return (
        <div className={styles.liveTime}>
            <p>Today is</p>
            <p> 
                {now.toLocaleDateString("en-IN",{
                weekday:"short",
                day:"2-digit",
                month:"short",
                year:"2-digit"
            })}
            </p>
            <p>
             {now.toLocaleTimeString("en-IN",{
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
             })}</p>
        </div>
    )
}

export default LiveTime;