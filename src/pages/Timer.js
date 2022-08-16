import CountdownTimer from "../components/timer/CountdownTimer";
import {useParams} from "react-router-dom";

function Timer() {
    let args = useParams()["args"];
    return (
        <div>
            <h1>Countdown Timer</h1>
            <CountdownTimer targetTime={parseTimer(args)} />
        </div>
    );
}

function parseTimer(args) {
    let arg_re = /(\d+)m?(\d+)?/;
    let match = arg_re.exec(args)
    if (!match) return null;
    let mins = parseInt(match[1])
    let seconds = parseInt(match[2])
    let timeInMillis = 0;
    if (mins) {
        timeInMillis+=60000*mins
    }
    if (seconds) {
        timeInMillis+=1000*seconds
    }
    let NOW_IN_MS = new Date().getTime();
    return NOW_IN_MS + timeInMillis;
}

export default Timer;