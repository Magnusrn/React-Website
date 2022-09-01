import React from 'react';
import { XTerm } from 'xterm-for-react';
import data from "./api/dogfacts/DogFacts.json";

const Terminal = () => {
    const xtermRef = React.useRef(null)
    React.useEffect(() => {
        renderTerminal(xtermRef);
      }, []);
    return (<XTerm ref={xtermRef}/>)
}

export default Terminal;

// //move commands to possibly some dict so i can list them in COMMANDS, each with a brief description and aliases


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
            return("joke - Tell a joke from x api\n\rdog - Tell a dog fact from dog api\n\rmonkey - Tell a monkey fact from monkey api\n\rhistory - provide history from entered commands,activate these with !{index} " +
                "where {index} is command index\n\rclear/cl/cls - clear the terminal\n\rcd {link}- move to current url+{link}\n\ralso supports maths simply by typing in equation ")
        case "joke":
            return;
        case "dog":
            // Create array of object keys
            let keys = Object.keys(data)
            // Generate random index based on number of keys
            let randIndex = Math.floor(Math.random() * keys.length)
            // Select a key from the array of keys using the random index
            let randKey = keys[randIndex]
            // Use the key to get the corresponding name from the "names" object
            let fact = data[randKey]["fact"]
            writeLine(terminal,fact,true);
            return;
        case "monkey":
            return;
        case "history":
            history.forEach(function callback(entry, index) {
                writeLine(terminal,index + " " + entry, true);
            });
            return;
        case "clear":
        case "cls":
        case "cl":
            terminal.clear()
            return;
        default:
            if (new RegExp('^cd *').test(command))
            {
                console.log("moving to page {page}")
                //not sure this is the best way to do this(having redirects outside of react router) but unsure of the optimal way
                window.location.href = command.split(" ")[1]
                return;
            }

            if (new RegExp('!\\d+').test(command))
            {
                let historyIndex = command.slice(1,)
                return evaluateCommand(terminal, history, history[historyIndex])
            }
            return("Unsupported command: " + command)
            //not safe to use, manually implement math perhaps    
            // try {
            //     return(""+ eval(command))
            // } catch (e) {
            //     return("Unsupported command: " + command)
            // }
    }
}

function writeLine(terminal,message,newLine) {
    console.log(message)
    if (!message) return;
    terminal.write(message)
    if (!newLine) return;
    terminal.write("\r\n");
}