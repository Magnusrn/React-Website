import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import Sound from "C:\\Users\\Mag\\Desktop\\react-frontend\\src\\components\\timer\\alarm.mp3";

const ExpiredNotice = () => {
    let alarmed;
    const alarm = new Audio(Sound);
    //alarm.play();
    // alert("Time up!" );
    return (
        <div className="expired-notice">
            <span>Times up!</span>
        </div>
    );
};

const ShowCounter = ({hours, minutes, seconds }) => {
    let message = hours + "h " + minutes + "m " + seconds + "s "
    return (
        <div className="show-counter">
            <div>
                {message}
            </div>
        </div>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [hours, minutes, seconds] = useCountdown(targetDate);

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