const form = document.getElementById('form');
const core_i = document.getElementById('core_i');
const searchEngine = 'https://start.duckduckgo.com/?q=';

function submitted(event) {
    event.preventDefault();
    const url = searchEngine + core_i.value.substring(1);
    if (core_i.value.startsWith("?")) {
        const tab = window.open(url, '_blank'); 
        tab.focus(); core_i.value = ""; return;
    } else if (core_i.value == "!!!") {
        const tab = window.open("https://s8seer.github.io/", '_blank');
        tab.focus(); core_i.value = ""; return;
    } else if (core_i.value == "404") {
        const tab = window.open("./404.html", '_blank');
        tab.focus(); core_i.value = ""; return;
    } else if (core_i.value == "ps") {
        const tab = window.open("https://www.piskelapp.com/p/create/sprite", '_blank');
        tab.focus(); core_i.value = ""; return; 
    } else if (core_i.value == "") { core_i.blur(); return; 
    } else { }
    core_i.blur();
}

function listenForKeyPress() {
    // add document event listener for all key presses
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case "Enter":
                core_i.focus();
                break;
            case "Escape":
                core_i.value = "";
                core_i.blur();
                break;
            default:
                return;
        }
    })
}
listenForKeyPress();
form.addEventListener('submit', submitted);