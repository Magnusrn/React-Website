import React, {useEffect, useState} from "@types/react";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    let startStopButton = <button onClick={() => setRunning(true)}>Start</button>

    if (running) {
        startStopButton = <button onClick={() => setRunning(false)}>Stop</button>
    }

    return (
    <div className="stopwatch">
        <div className="numbers">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="buttons">
            {startStopButton}
            <button onClick={() => setTime(0)}>Reset</button>
        </div>
    </div>
);}

export default Stopwatch;