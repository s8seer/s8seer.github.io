//  <script type="application/javascript" src="http://ipinfo.io/?format=jsonp&callback=getIP"></script>

const terminal_div = document.getElementById('terminal')
const shell_paragraph = document.getElementById('shellParagraph')
const shell_form = document.getElementById('shellForm');
const shell_input = document.getElementById('shellInput');
const terminal_window = document.getElementById('terminal-container-window');
let prefix = '/usr/shell/> ';
let hist = [''];
let focus_state = false;

let dir = ['/index.html', '/resources.html', '/booklets.html', '/console.html']

// append new line to the start of input
function newLine(){
    shell_input.parentNode.insertBefore(document.createElement('br'), shell_input);
}

function newText(input_value) {
    var text_node = document.createTextNode(input_value);
    shell_input.parentNode.insertBefore(text_node, shell_input);
    newLine();
}

function newLink(text, url) {
    let hyperlink = document.createElement('a');
    hyperlink.href = url;
    hyperlink.innerText = text;
    hyperlink.setAttribute('target','_blank');
    shell_input.parentNode.insertBefore(hyperlink, shell_input);
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

function submitCommand(){
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
        newText("help, exit, clear", true)
    } 

    else if ( command == "clear" ) { // manual submit
        clear();
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); return;
    } 

    else if (command == "ls"){
        for (let i = 0; i < dir.length; i++){
            newLink(dir[i], dir[i]);
        }
    }

    else if (command == '') {
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); return;
    } 

    else {
        newText("Unknown command '" + command + "'", true);
    };
    submitCommand(); return;
}

// add events and listeners to the document
function addBindings() {
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

// Run these
addBindings();
shellrc();
loadPrefix();
shell_input.focus();
