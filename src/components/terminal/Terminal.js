import React from 'react';
import { XTerm } from 'xterm-for-react';
import dogFacts from "./api/dogfacts/DogFacts.json";
import facts from "./api/facts/Facts.json";
import jokes from "./api/jokes/jokes.json";
import TerminalCommands from "./TerminalCommands.json";
import styles from "./Terminal.module.css"
import {evaluate as evaluateMath} from 'mathjs';

const RenderTerminal = () => {
    const xtermRef = React.useRef(null)
    console.log(window.innerWidth)
    React.useEffect(() => {
        renderTerminal(xtermRef);
      }, []);
      //rudimentary method of resizing for specific window sizes.
      let cols = parseInt(window.innerWidth/12)
      let rows = parseInt(window.innerHeight/35)
    return (
        <div className={styles.terminal}>
            {/* cols is character count per line */}
            <XTerm ref={xtermRef} options={{rows:rows,cols:cols}}/>
        </div>
    )
}

export default RenderTerminal;

// //move commands to possibly some dict so i can list them in COMMANDS, each with a brief description and aliases
// add autocomplete with an iterator


function renderTerminal(xtermRef) {
    let terminal = xtermRef.current.terminal
    let ps1 = "\x1b[0;96m Magnus.One $ \x1b[37m"
    writeLine(terminal,ps1,false);
    let command = "";
    let history = [];

    terminal.onKey((key) => {
        switch (key.domEvent.key) {
            case "Enter":
                terminal.write("\r\n");
                writeLine(terminal, evaluateCommand(terminal, history, command),true)
                writeLine(terminal,"\r" + ps1,false);
                command = "";
                return;
            case "Backspace":
                //backspace
                if (command) {
                    command = command.slice(0, command.length - 1);
                    //not entirely sure why but single \b on it's own just moves the cursor doesn't actually delete.
                    writeLine(terminal,"\b \b",false)
                }
                return;
            default:
                command += key.key;
                writeLine(terminal,key.key, false);
                return;
        }
    })
}

function evaluateCommand(terminal,history,command) {
    if (!new RegExp('!\\d+').test(command))
    {
        history.push(command)
    }
    switch (command.split(" ")[0]) {
        case "help":
            let msg = "";
            //formats and prints all commands from terminalcommands
            TerminalCommands.forEach((obj) => {
                msg+=`${obj["command"]}${obj["aliases"].length>0 ? "(" + obj["aliases"] + ")": ""} ${obj["description"]} \n\r`
            })
                
            return msg
            //not sure if it would be better practice to create an API and fetch from it, may save significant memory
        case "joke":
        case "j":
            let jKeys = Object.keys(jokes)
            let jRandIndex = Math.floor(Math.random() * jKeys.length)
            let jRandKey = jKeys[jRandIndex]
            let joke = jokes[jRandKey]
            writeLine(terminal,joke["setup"], true);
            return joke["punchline"];
        case "dogfact":
        case "df":
            let dKeys = Object.keys(dogFacts)
            let dRandIndex = Math.floor(Math.random() * dKeys.length)
            let dRandKey = dKeys[dRandIndex]
            let dFact = dogFacts[dRandKey]["fact"]
            return dFact
        case "fact":
        case "f":
            let keys = Object.keys(facts["facts"])
            let randIndex = Math.floor(Math.random() * keys.length)
            let randKey = keys[randIndex]
            let fact = facts["facts"][randKey]
            return fact;
        case "history":
            history.forEach((entry, index)=> {
                writeLine(terminal,index + " " + entry, true);
            });
            return;
        case "!!":
            //kinda shitty but figured i'd add anyway, would be more interesting to have the ability to use anywhere in commands e.g !! *5
            //has to check 2nd last item as the history gets populated with the command before running it.
            return evaluateCommand(terminal,history,history[history.length-2])
        case "clear":
        case "cls":
        case "cl":
            terminal.clear()
            return;
        case "cd":
            window.location.href = command.split(" ")[1]
            return;

        default:
            if (new RegExp('!\\d+').test(command))
            {
                let historyIndex = command.slice(1,)
                return evaluateCommand(terminal, history, history[historyIndex])
            }
            //https://mathjs.org/docs/expressions/security.html
            //math.eval used for security reason 
            try {
                return(""+ evaluateMath(command))
            } catch (e) {
                return("Unsupported command: " + command)
            }
    }
}

function writeLine(terminal,message,newLine) {
    if (!message) return;
    terminal.write(message)
    if (!newLine) return;
    terminal.write("\r\n");
}