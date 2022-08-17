import React, {useEffect, useState} from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import Sound from "C:\\Users\\Mag\\Desktop\\react-frontend\\src\\components\\timer\\alarm.mp3";

const ExpiredNotice = () => {
    let [alerted,setAlerted] = useState(false);
    if (!alerted)
    {
        setAlerted(true);
        const alarm = new Audio(Sound);
        alarm.play();
        alert("Time up!" );
    }

    return (
        <div className="expired-notice">
            <span>Times up!</span>
        </div>
    );
};

const ShowCounter = ({hours, minutes, seconds }) => {
    let timeRemaining = hours + "h " + minutes + "m " + seconds + "s "
    return (
        <div className="show-counter">
            <div>
                {timeRemaining}
            </div>
        </div>
    );
};

function parseUrlArgs(args) {
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

const CountdownTimer = ({ urlArgs }) => {
    const [hours, minutes, seconds] = useCountdown(parseUrlArgs(urlArgs));

    if ( hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;
//add alarm(optional), change window title to current timer remaining
//add buttons to quick set time