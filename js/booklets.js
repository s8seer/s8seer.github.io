let elements = document.getElementsByClassName('booklet_code');

for (let i = 0;  i < elements.length; i++){
    let element = elements[i]
    let button = element.nextElementSibling;
    if (button.nodeName == "BUTTON"){
        button.onclick = function() { 
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            
            navigator.clipboard.writeText(element.innerText);
            
        };
    }
}

const booklet_textarea = document.getElementById('bklt_gen');
const booklet_display = document.getElementById('booklet_gen');
const gen_button = document.getElementById('gen_button');
gen_button.onclick = function(){
    booklet_display.innerHTML = `javascript:(()=>{ ${booklet_textarea.value} })();`;
}

let element = booklet_display;
let button = element.nextElementSibling;
if (button.nodeName == "BUTTON"){
    button.onclick = function() { 
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        
        navigator.clipboard.writeText(element.innerText);
    };
}
