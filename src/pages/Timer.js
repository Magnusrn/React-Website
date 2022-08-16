import CountdownTimer from "../components/timer/CountdownTimer";
import {useParams} from "react-router-dom";

function Timer() {
    let args = useParams();
    console.log(args)
    //do a little regex here to parse desired timer, if just number assume minutes, if m is included then number before m is minutes and subsequent are seconds
    let TIME_IN_MS = 1000*((6) + 1) ;
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