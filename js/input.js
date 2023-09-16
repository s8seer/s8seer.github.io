const f = document.getElementById('form');
const q = document.getElementById('query');
const searchEngine = 'https://start.duckduckgo.com/?q=';

function submitted(event) {
    event.preventDefault();
    const url = searchEngine + q.value;
    if (q.value == "!!!") {
        const gh = window.open("https://s8seer.github.io/", '_blank');
        gh.focus();
        return;
    }
    const win = window.open(url, '_blank');
    win.focus();
}
f.addEventListener('submit', submitted);
