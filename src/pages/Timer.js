import CountdownTimer from "../components/countdowntimer/CountdownTimer";
import {useParams} from "react-router-dom";

function Timer() {
    let args = useParams()["args"];
    return (
        <div>
            <h1>Countdown Timer</h1>
            <CountdownTimer urlArgs={args} />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            Simple countdown timer that can quickly be started by entering magnus.one/t/(mins)m(seconds). Created to replace the mysteriously missing google timer which has since been returned, though this has better support for time arguments. Audio is quite fickle, doesn't seem consistent on mobile and unfortunately requires manually enabling the alarm if using url args otherwise the alarm is blocked by
            browsers.
        </div>
    );
}

export default Timer;