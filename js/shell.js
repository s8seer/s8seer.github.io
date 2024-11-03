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
}

function clear(){
    var parent = shell_input.parentNode
    while ( parent.lastChild) {
        if ( parent.firstChild.nodeName == "INPUT") { break; };
        parent.removeChild( parent.firstChild);
    }
}

function submitCommand(noNewLine = false){
    if (!noNewLine){
        newLine();
    }
    loadPrefix(); shell_form.reset();
    terminal_div.scrollTo(0, terminal_div.scrollHeight);
    return;
}

// process commands on form submit
function submitted(event) {
    event.preventDefault();
    command = shell_input.value;
    append(command);
    newLine();

    if (command == "help") {
        newText("Available commands are:")
        newText("exit, reset, clear")
    } else if (["exit","poweroff"].includes(command)){
        terminal_window.style.display = 'none'; shell_input.blur();
        clear(); shellrc();
        submitCommand(); return;
    } else if ( command == "reset" ) {
        clear(); shellrc();
        submitCommand(true); return;
    } else if ( command == "clear" ) { // manual submit
        clear();
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); return;
    } else if ( ["ls",":(){ :|:& };:",":(){:|:&};:"].includes(command) ) {
        newText('Insufficent permissions.');
    } else if (command == '' || ['false'].includes(command)) { // manual submit
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); return;
    } else {
        newText("Can't find command '" + command + "'");
    };
    submitCommand(); return;
}

function toggledisplay(){
    if (terminal_window.style.display == 'none') {
        terminal_window.style.display = 'block';
        shell_input.focus();
    } else{
        terminal_window.style.display = 'none'; shell_input.blur();
    }
}

// add events and listeners to the document
function addBindings() {
    document.addEventListener('keydown', function (e){
        if ( e.key == '/' && e.ctrlKey ) {
            toggledisplay();
        }
    });
    shell_input.addEventListener('keydown', function (e){
        if ( e.key == 'Escape' ) {
            shell_input.value = "";
            shell_input.blur();
            return;
        } 
    });
    shell_input.addEventListener('input', function (event) {
        this.style.width = ((this.value.length + 1)) + 'ch';
    });
    shell_form.addEventListener('submit', submitted);  
    terminal_div.onclick = function(event) {
        if (event.target.id != "terminal-title" && window.getSelection().toString() == '' ) { shell_input.focus();  }
    }
}

// Sets the terminal window title to the webpage's
function setTerminalTitle() {
    x = document.getElementById("terminal-title");
    x.innerHTML = terminal_window.getAttribute('name');
}

// Make the DIV element draggable:

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
// dragElement(document.getElementById("terminal-container-window"), document.getElementById("terminal-title"));


// Run these
setTerminalTitle();
addBindings();
shellrc();
loadPrefix();
terminal_window.style.display = 'none';
