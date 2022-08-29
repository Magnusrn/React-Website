import React, {useEffect, useState} from 'react';
import Sound from "./alarm.mp3";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./CountdownTimer.module.css"


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
    const [alarmState, setAlarmState] = useState(validUrlArgs ? false : true);
    //automatically run if args are entered into the url for speed
    const [running, setRunning] = useState(validUrlArgs ? true : false);
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

    //seems to be taking 1s longer than it always should, may need to decrement the time by 1 immediately on clicking the start button, though this isn't ideal as it's a logic issue
    let startStopButton = running ? <Button className={`btn btn-warning btn-xl ${styles.btn_xl} `} onClick={() => setRunning(false)}>Stop</Button> :
        <Button className={`btn btn-success ${styles.btn_xl}`} onClick={() => setRunning(true)}>Start</Button>
    let resetTimerButton = <Button onClick={() => resetStates() }>Reset</Button>

    let incrementHoursButton = <Button onClick={() => setTimeRemaining(timeRemaining + 3600000)}>+1 Hour</Button>
    let incrementMinutesButton = <Button onClick={() => setTimeRemaining(timeRemaining + 60000)}>+1 Minute</Button>
    let incrementSecondsButton = <Button onClick={() => setTimeRemaining(timeRemaining + 1000)}>+1 Second</Button>

    let decrementHoursButton = <Button onClick={() => setTimeRemaining(timeRemaining - 3600000)}>-1 Hour</Button>
    let decrementMinutesButton = <Button onClick={() => setTimeRemaining(timeRemaining - 60000)}>-1 Minute</Button>
    let decrementSecondsButton = <Button onClick={() => setTimeRemaining(timeRemaining - 1000)}>-1 Second</Button>
    
    let AlarmButtonToggle = alarmState ? <Button className="btn btn-danger" onClick={() => setAlarmState(false)}>Disable Alarm</Button> :
    <Button className="btn btn-success" onClick={() => setAlarmState(true)}>Enable Alarm</Button>

    if (running && timeRemaining <= 0 && !alertState && alarmState) {
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

                {AlarmButtonToggle}

            </div>
        </div>);
}


export default CountdownTimer;
//add ability to type desired time
//add BIG buttons to start and BIG numbers
//perhaps add some sort of autostart if it's not started within x seconds, wouldn't be able to alert though
//change colour of alarm from red to green and make it massive. 