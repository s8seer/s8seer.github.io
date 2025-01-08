//  <script type="application/javascript" src="http://ipinfo.io/?format=jsonp&callback=getIP"></script>

const terminal_div = document.getElementById('terminal')
const shell_paragraph = document.getElementById('shellParagraph')
const shell_form = document.getElementById('shellForm');
const shell_input = document.getElementById('shellInput');
const terminal_window = document.getElementById('terminal-container-window');
let prefix = "<span class='cprefix'>/usr/shell/></span> ";
let hist = [];
let hist_index = 0;
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

function newHTML(input_value) {
    var span_node = document.createElement('span');
    span_node.innerHTML = input_value;
    shell_input.parentNode.insertBefore(span_node, shell_input);
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

function append(prefix_node, input_value) {
    // previousNode.nodeValue = previousNode.nodeValue + input_value;
    prefix_node.innerHTML = prefix_node.innerHTML + input_value;
}

function warnprefix(prefix_node){
    prefix_node.firstChild.classList.remove('cprefix');
    prefix_node.firstChild.classList.add('cprefixerr');
}

function loadPrefix(){
    var prefix_node = document.createTextNode(prefix);
    shell_input.parentNode.insertBefore(prefix_node, shell_input);
}
function loadPrefix(){
    var prefix_node = document.createElement('span');
    prefix_node.innerHTML = prefix;
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

function screenInfo(){
    newHTML(`<span class='clightgray'>Window:</span> ${window.innerWidth}px, ${window.innerHeight}px`)
    newHTML(`<span class='clightgray'>Screen:</span> ${screen.height}px, ${screen.width}px, ${screen.colorDepth}bit`)
}

// process commands on form submit
function submitted(event) {
    event.preventDefault();
    command = shell_input.value;
    let prefix_node = shell_input.previousSibling;
    append(prefix_node, command);
    newLine();

    if (command == "help") {
        newText("Available commands are:")
        // Unimportant hidden commands:
        // history, 
        newText("help, exit, clear, dxdiag, fetch", true)
    } 

    else if ( command == "clear" ) { // manual submit
        clear();
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); 
        hist.unshift(command); hist_index = 0; return;
    } 

    else if (command == "ls"){
        for (let i = 0; i < dir.length; i++){
            newLink(dir[i], dir[i]);
        }
    }

    else if (command == "history"){
        for (let i = 0; i < hist.length; i++){
            if (hist[i] != 'history'){
                newText(hist[i]);
            }
        }
    }

    else if (command == "dxdiag"){
        screenInfo()
    }

    else if (command == '') {
        loadPrefix(); shell_form.reset(); terminal_div.scrollTo(0, terminal_div.scrollHeight); return;
    } 

    else if (command == 'exit'){
        window.location.href = "/";
    }

    else if (["fetch", "neofetch"].includes(command)){
        newHTML(`<span class='clightgray'>User Agent: </span>${navigator.userAgent}`)
        newHTML(`<span class='clightgray'>Do Not Track: </span>${navigator.doNotTrack}`)
        newHTML(`<span class='clightgray'>Language: </span>${navigator.language}`)
        let language_list = '';
        if(navigator.languages.length){
            for (let i = 0; i < navigator.languages.length; i++){
                if (i < navigator.languages.length - 1) language_list += navigator.languages[i] + ', '
                else language_list += navigator.languages[i]             
            }
        }
        
        newHTML(`<span class='clightgray'>Languages: </span>${language_list}`)
        console.log(navigator)
        newLine();
        screenInfo();
    }

    else {
        newText("Unknown command '" + command + "'", true);
        warnprefix(prefix_node);
    };

    hist.unshift(command);
    hist_index = 0;
    submitCommand(); return;
}

function updateInputWidth(){
    shell_input.style.width = ((shell_input.value.length + 1)) + 'ch';
}

function moveCursorToEnd(e) {
    setTimeout(function(){
        const input = shell_input;
        input.selectionStart = input.selectionEnd = input.value.length;
        input.focus();
    }, 0)
}

// add events and listeners to the document
function addBindings() {
    shell_input.addEventListener('keydown', function (e){
        if ( e.key == 'Escape' ) {
            shell_input.value = "";
            shell_input.blur();
            return;
        } 
        
        if (e.key == 'ArrowUp'){
            e.preventDefault()
            if (hist_index > hist.length - 1){
                return;
            }
            if (!((hist_index + 1) > (hist.length))){
                hist_index = hist_index + 1;
            }
            shell_input.value = hist[hist_index - 1];
    

            updateInputWidth(); moveCursorToEnd(e);
        }

        if (e.key == 'ArrowDown'){
            e.preventDefault()
            if (hist_index < 1){
                return;
            }
            if (!((hist_index) < 0)){
                hist_index = hist_index - 1;
            }
            if (hist_index == 0){
                shell_input.value = '';
                return;
            }
            shell_input.value = hist[hist_index - 1];
            
            updateInputWidth(); moveCursorToEnd(e);
        }
    });
    shell_input.addEventListener('input', function (event) {
        updateInputWidth()
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
