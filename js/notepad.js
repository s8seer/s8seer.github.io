const localStorageID = 'notepad';
const notepad = document.getElementById('notepad');
const notepadTitle = document.getElementById('notepadTitle');

function saveNotes() {
    textValue = notepad.value;
    localStorage.setItem(localStorageID, textValue);
    notepadTitle.innerHTML = 'notepad:';
}

function loadNotes() {
    textValue = localStorage.getItem(localStorageID);
    notepad.value = textValue;
}

function clearNotes() {
    localStorage.removeItem(localStorageID);
}

function checkLoadState() {
    if ( notepad.value == localStorage.getItem(localStorageID)) {
        notepadTitle.innerHTML = 'notepad:';
        return true 
    }
    else {
        notepadTitle.innerHTML = '*notepad:';
        return false
    };
}   

function downloadFile() {
    var e = localStorage.getItem(localStorageID);
    var c = document.createElement("a");
    c.style.display = 'none';
    c.download = "notes" + ".txt";
    var t = new Blob([e], {type: "text/plain"});
    c.href = URL.createObjectURL(t);
    c.click();

    setTimeout(() => {
        URL.revokeObjectURL(c.href);
        c.parentNode.removeChild(c);
    }, 0);
}

notepad.addEventListener('keydown', function (e){
    if ( e.key == 'Escape' ) {
        notepad.blur();
    } else if ( e.ctrlKey && e.key == 's' && !e.altKey ){ 
        saveNotes();
        e.preventDefault();
        return false;
    } else if ( e.ctrlKey && e.altKey && e.key == 's' ) {
        downloadFile();
        e.preventDefault();
        return false;
    }
}, false);

notepad.addEventListener('keyup', function (e){ if ( !e.altKey && !e.metaKey && !e.shiftKey ) { checkLoadState() }}, false);

loadNotes();



