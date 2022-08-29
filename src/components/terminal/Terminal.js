// Import XTerm
import * as React from 'react'
//add facts api
//move commands to possibly some dict so i can list them in COMMANDS, each with a brief description and aliases


const Terminal = () => {
    return (<h1></h1>)
}

function RenderTerminal() {
    console.log("function running");
    let ps1 = "\x1b[0;96m" + "Magnus.One $ " + "\x1b[37m"
    let terminal = new Terminal();
    terminal.open(document.getElementById('terminal'));
    terminal.write(ps1)
    let command = "";
    let history = [];
    terminal.onKey(function (key) {
        switch (key.domEvent.key) {
            case "Enter":
                //enter key
                console.log("1")
                output(terminal, evaluateCommand(terminal, history, command))
                console.log("2")
                terminal.write("\r" + ps1);
                command = "";
                return;
            case "Backspace":
                //backspace
                if (command) {
                    console.log(command)
                    console.log(command.length)
                    command = command.slice(0, command.length - 1);
                    console.log("hi")
                    terminal.write("\b \b")
                }
                return;
            default:
                command += key.key;
                terminal.write(key.key);
                return;
        }
    })
}

function toggleVisibility(){
    const element = document.getElementById("terminal");
    if(element.style.display === "none"){
        element.style.display = "block";
        return;
    }
    element.style.display = "none";
}

function evaluateCommand(terminal,history,command) {
    if (!new RegExp('!\\d+').test(command))
    {
        history.push(command)
    }
    newLine(terminal)
    switch (command) {
        case "help":
            return("joke - Tell a joke from x api\n\rdog - Tell a dog fact from dog api\n\rmonkey - Tell a monkey fact from monkey api\n\rhistory - provide history from entered commands,activate these with !{index} " +
                "where {index} is command index\n\rclear/cl/cls - clear the terminal\n\rcd {link}- move to current url+{link}\n\ralso supports maths simply by typing in equation ")
        case "joke":
            return;
        case "dog":
            return;
        case "monkey":
            return;
        case "history":
            history.forEach(function callback(entry, index) {
                output(terminal,index + " " + entry)
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
                return;
            }

            if (new RegExp('!\\d+').test(command))
            {
                let historyIndex = command.slice(1,)
                return evaluateCommand(terminal, history, history[historyIndex])
            }

            try {
                return(""+ eval(command))
            } catch (e) {
                return("Unsupported command: " + command)
            }
    }
}

function output(terminal, message) {
    terminal.write(message)
    if (!message)
    {
        return;
    }
    newLine(terminal)
}

function newLine(terminal) {
    terminal.write("\r\n");
}

export default Terminal;