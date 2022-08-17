import React, {useEffect, useState} from 'react';
import Sound from "C:\\Users\\Mag\\Desktop\\react-frontend\\src\\components\\countdowntimer\\alarm.mp3";


const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Times up!</span>
        </div>
    );
};

const ShowCounter = ({finalTimeInMillis}) => {
    let seconds = Math.floor((finalTimeInMillis / 1000) % 60);
    let minutes = Math.floor((finalTimeInMillis / (1000 * 60)) % 60);
    let hours = Math.floor((finalTimeInMillis / (1000 * 60 * 60)) % 24);

    let timeRemaining = hours + "h " + minutes + "m " + seconds + "s "
    document.title = timeRemaining
    return (
        <div className="show-counter">
            <div>
                {timeRemaining}
            </div>
        </div>
    );
};

function parseUrlArgs(args) {
    //what is this monstrosity, unsure of a better way to do it however to still support and capture all of these cases
    // 30m50s
    // 30m50
    // 30m
    // 30
    // 50s
    // 30-50
    let arg_re = /(?:(?<minutes>\d+)[m\-:]((?<seconds>\d+)s?)?)?(?<minutes2>^\d+$)?(?:(?<seconds2>^\d+)s)?/
    let match = arg_re.exec(args)
    if (!match) {
        console.log(args)
        return null;
    }
    let mins = [match.groups.minutes, match.groups.minutes2].find(entry => entry != null)
    let seconds = [match.groups.seconds, match.groups.seconds2].find(entry => entry != null)
    let finalTimeInMillis = 0;
    if (mins) {
        finalTimeInMillis += 60000 * mins
    }
    if (seconds) {
        finalTimeInMillis += 1000 * seconds
    }
    return finalTimeInMillis;
}


const CountdownTimer = ({urlArgs}) => {
    let validUrlArgs = parseUrlArgs(urlArgs);
    const [timeRemaining, setTimeRemaining] = useState(validUrlArgs ? validUrlArgs : 0);
    //automatically run if args are entered into the url for speed
    const [running, setRunning] = useState(false);
    const [alertState, setAlerted] = useState(false);


    function resetStates () {
        setTimeRemaining(0);
        setRunning(false);
        setAlerted(false);
    }

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1000);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running]);

    let startStopButton = running ? <button onClick={() => setRunning(false)}>Stop</button> :
        <button onClick={() => setRunning(true)}>Start</button>
    let resetTimerButton = <button onClick={() => resetStates() }>Reset</button>

    let incrementHoursButton = <button onClick={() => setTimeRemaining(timeRemaining + 3600000)}>+1 Hour</button>
    let incrementMinutesButton = <button onClick={() => setTimeRemaining(timeRemaining + 60000)}>+1 Minute</button>
    let incrementSecondsButton = <button onClick={() => setTimeRemaining(timeRemaining + 1000)}>+1 Second</button>


    let decrementHoursButton = <button onClick={() => setTimeRemaining(timeRemaining - 3600000)}>-1 Hour</button>
    let decrementMinutesButton = <button onClick={() => setTimeRemaining(timeRemaining - 60000)}>-1 Minute</button>
    let decrementSecondsButton = <button onClick={() => setTimeRemaining(timeRemaining - 1000)}>-1 Second</button>

    if (running && timeRemaining <= 0) {
        if (!alertState) {
            setAlerted(true);
            const alarm = new Audio(Sound);
            alarm.load();
            alarm.play();
            return (
                <div>
                    <ExpiredNotice/>
                    {resetTimerButton}
                </div>)
        }
    }

    if (timeRemaining < 0) resetStates()

    return (
        <div className="Timer">
            <ShowCounter finalTimeInMillis={timeRemaining}/>
            <div className="buttons">

                {incrementHoursButton}
                {incrementMinutesButton}
                {incrementSecondsButton}
                {startStopButton}

                <br/>
                {decrementHoursButton}
                {decrementMinutesButton}
                {decrementSecondsButton}
                {resetTimerButton}

            </div>
        </div>);
}


export default CountdownTimer;
// change window title to current timer remaining
//add ability to type desired time
//add BIG buttons to start and BIG numbers
//perhaps add some sort of autostart if it's not started within x seconds, wouldn't be able to alert though