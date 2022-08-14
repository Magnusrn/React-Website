import CountdownTimer from "../components/timer/CountdownTimer";
import {useParams} from "react-router-dom";

function Timer() {
    let { minutes, seconds } = useParams();
    let TIME_IN_MS = 1000*((6 * minutes) + seconds) ;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + TIME_IN_MS;

    return (
        <div>
            <h1>Countdown Timer</h1>
            <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        </div>
    );
}

export default Timer;