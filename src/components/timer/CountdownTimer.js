import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

const ExpiredNotice = () => {
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