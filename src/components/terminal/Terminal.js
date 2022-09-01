import React from 'react';
import { XTerm } from 'xterm-for-react';
import dogFacts from "./api/dogfacts/DogFacts.json";
import facts from "./api/facts/Facts.json";
import TerminalCommands from "./TerminalCommands.json";
import styles from "./Terminal.module.css"
import {evaluate as evaluateMath} from 'mathjs';

const Terminal = () => {
    const xtermRef = React.useRef(null)
    React.useEffect(() => {
        renderTerminal(xtermRef);
      }, []);
    return (
        <div className={styles.terminal}>
            {/* cols is character count per line */}
            <XTerm ref={xtermRef} options={{rows:15,cols:150}}/>
        </div>
    )
}

export default Terminal;

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

// function toggleVisibility(){
//     const element = document.getElementById("terminal");
//     if(element.style.display === "none"){
//         element.style.display = "block";
//         return;
//     }
//     element.style.display = "none";
// }

function evaluateCommand(terminal,history,command) {
    if (!new RegExp('!\\d+').test(command))
    {
        history.push(command)
    }
    switch (command) {
        case "help":
            let msg = "";
            TerminalCommands.forEach((obj) => {
                msg+=`${obj["command"]}${obj["aliases"].length>0 ? "(" + obj["aliases"] + ")": ""} ${obj["description"]} \n\r`
            })
                
            return msg
        case "joke":
            return;
        case "dogfact":
        case "df":
            //not sure if it would be better practice to access the backend API for this
            let dfKeys = Object.keys(dogFacts)
            let dfRandIndex = Math.floor(Math.random() * dfKeys.length)
            let dfRandKey = dfKeys[dfRandIndex]
            let dfFact = dogFacts[dfRandKey]["fact"]
            writeLine(terminal,dfFact,true);
            return;
        case "fact":
        case "f":
            let keys = Object.keys(facts["facts"])
            let randIndex = Math.floor(Math.random() * keys.length)
            let randKey = keys[randIndex]
            let fact = facts["facts"][randKey]
            writeLine(terminal,fact,true);
            return;
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
        default:
            if (new RegExp('^cd *').test(command))
            {
                //not sure this is the best way to do this(having redirects outside of react router) but unsure of the optimal way
                window.location.href = command.split(" ")[1]
                return;
            }
            
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