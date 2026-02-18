import { useEffect, useState } from "react";

const CountDownTimer = () => {
    const [ count, setCount ] = useState(10)
    const [ isRunning, setRunning ] = useState(true)

    useEffect(() => {
        let interval
        function countDown(){
            if( !isRunning || count == 0) return;
            interval = setInterval(() => {
                setCount((prev) => prev - 1);
            }, 2000);
        }

        countDown()

        return () => clearInterval(interval)
    }, [count, isRunning]);

    function resetTimer(){
        setCount(10);
        setRunning(true);
    }

    function startTimer(){
        console.log("start");
        
        setRunning(true)
    }

    function stopTimer(){
        console.log("stop");
        
        setRunning(false)
    }

    return (
        <>
        <div>
            <h1>{count}</h1>
        </div>
        <div>
            <button
                onClick={startTimer}
            >
                Start
            </button>
            <button
                onClick={stopTimer}
            >
                Stop
            </button>
            <button
                onClick={resetTimer}
            >
                Reset
            </button>
        </div>
        </>
    )
}

export default CountDownTimer;