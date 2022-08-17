import CountdownTimer from "../components/countdowntimer/CountdownTimer";
import {useParams} from "react-router-dom";

function Timer() {
    let args = useParams()["args"];
    return (
        <div>
            <h1>Countdown Timer</h1>
            <CountdownTimer urlArgs={args} />
        </div>
    );
}

export default Timer;