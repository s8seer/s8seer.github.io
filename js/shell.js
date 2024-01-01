
const terminal_div = document.getElementById('terminal')
const shell_paragraph = document.getElementById('shellParagraph')
const shell_form = document.getElementById('shellForm');
const shell_input = document.getElementById('shellInput');
const terminal_window = document.getElementById('terminal-container-window');
let prefix = '/usr/shell/> ';
let hist = [''];
let focus_state = false;

// append new line to the start of input
function newLine(){
    shell_input.parentNode.insertBefore(document.createElement('br'), shell_input);
}
function newText(input_value) {
    var text_node = document.createTextNode(input_value);
    shell_input.parentNode.insertBefore(text_node, shell_input);
    // typeWriter(input_value);
    newLine();
}
function append(input_value) {
    previousNode = shell_input.previousSibling;
    previousNode.nodeValue = previousNode.nodeValue + input_value;
}
function loadPrefix(){
    var prefix_node = document.createTextNode(prefix);
    shell_input.parentNode.insertBefore(prefix_node, shell_input);
}

// run shell related commands on shell start
function shellrc(){
    newText('notes:');
    newText('add shadow to the terminal window');
    newText('terminal appearance settings panel');
    newText('history with arrow keys');
    newText('terminal focus styling and store the focus state in a variable');
    newLine();
}

function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {resolve('resolved')}, ms);
    });
}

async function poweroff() {
    await wait(4000);
    shell_input.remove();
    shell_paragraph.remove();
    shell_form.remove();
    document.getElementById('terminal-title').remove();
    terminal_div.remove();
    document.getElementById('terminal-container-window').remove();
    
}

function clear(){
    while (shell_input.parentNode.lastChild) {
        if ( shell_input.parentNode.firstChild.nodeName == "INPUT") { break };
        shell_input.parentNode.removeChild(shell_input.parentNode.firstChild);
    }
}

// process commands on form submit
function submitted(event) {
    event.preventDefault();
    command = shell_input.value;
    append(command);
    newLine();

    if (command == "help") {
        newText("There's no help, there's only barney :)")
    } else if (["exit","poweroff"].includes(command)){
        newText("ALERT: system is going through poweroff...");
        poweroff();
    } else if ( command == "refresh" ) {
        window.location.reload();
    } else if ( command == "reset" ) {
        clear(); shellrc();
        loadPrefix(); shell_form.reset(); return;
    } else if ( command == "clear" ) {
        clear();
    } else if ( ["ls",":(){ :|:& };:",":(){:|:&};:"].includes(command) ) {
        newText('Insufficent permissions.');
    } else if (command == '') {
        loadPrefix(); shell_form.reset(); return;
    } else {
        newText("Command: '" + command + "' could not be found.");
        newText("Type 'help' to list available commands.");
    };
    newLine();
    loadPrefix(); shell_form.reset(); return;
}

// add events and listeners to the document
function addBindings() {
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case "Enter":
                if ( document.activeElement != shell_input ) { shell_input.focus();}
                break;
            case "Escape":
                shell_input.value = "";
                shell_input.blur();
                break;
            default:
                return;
        }
    })
    shell_input.addEventListener('input', function (event) {
        this.style.width = ((this.value.length + 1)) + 'ch';
    });
    shell_form.addEventListener('submit', submitted);  
    document.getElementById('terminal').onclick = function(event) {
        if (event.target.id != "terminal-title" && document.activeElement != shell_input ) { shell_input.focus();  }
    }
}

// Sets the terminal window title to the webpage's
function setTerminalTitle() {
    x = document.getElementById("terminal-title");
    x.innerHTML = terminal_window.getAttribute('name');
}

// Make the DIV element draggable:
dragElement(document.getElementById("terminal"), document.getElementById("terminal-title"));
function dragElement(elmnt, elmntHeader) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmntHeader) { elmntHeader.onmousedown = dragMouseDown;
    // if present, the header is where you move the DIV from:

  } 
  // otherwise, move the DIV from anywhere inside the DIV:
  else { elmnt.onmousedown = dragMouseDown; }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Run these
setTerminalTitle();
addBindings();
shellrc();
loadPrefix();
