
const FEED_URL = `/atom.xml`;
const FEED_DISPLAY = document.getElementById('gazette');
FEED_DISPLAY.innerHTML = '<i>loading content...</i>';

var date_options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

function dateParser(datestr) {
    var yy   = datestr.substring(0,4);
    var mo   = datestr.substring(5,7);
    var dd   = datestr.substring(8,10);
    var hh   = datestr.substring(11,13);
    var mi   = datestr.substring(14,16);
    var ss   = datestr.substring(17,19);
    var myutc = Date.UTC(yy-0,mo-1,dd-0,hh-0,mi-0,ss-0);
    return new Date(myutc);
}

fetch(FEED_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const item = data.querySelector("entry");
        let html = `
                <h1>${dateParser(data.querySelector("entry").querySelector("updated").innerHTML).toLocaleDateString("en-US", date_options)}</h1>
                <p> ${item.querySelector("content").innerHTML} </p>
        `;
        FEED_DISPLAY.innerHTML = html;
    })
    .catch((e) => console.error(e));

