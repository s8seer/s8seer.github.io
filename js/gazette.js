
const FEED_URL = `/atom.xml`;
const FEED_DISPLAY = document.getElementById('gazetteDisplay');

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

// fetch(FEED_URL)
//     .then(response => response.text())
//     .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//     .then(data => {
//         const item = data.querySelector("entry");
//         let html = `
//                 <h1><a href="/gazette.html">${dateParser(data.querySelector("entry").querySelector("updated").innerHTML).toLocaleDateString("en-US", date_options)}</a></h1>
//                 <p> ${item.querySelector("content").innerHTML} </p>
//         `;
//         FEED_DISPLAY.innerHTML = html;
//     })
//     .catch((e) => console.error(e));


// fetch(FEED_URL)
//   .then(response => response.text())
//   .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//   .then(data => {
//     console.log(data);
//     const items = data.querySelectorAll("item");
//     console.log(items)
//     let html = ``;
//     items.forEach(el => {
//       html += `
//         <article>
//           <h2>
//             <a href="" target="_blank" rel="noopener">
              
//             </a>
//           </h2>
//         </article>
//       `;
//     });
//     FEED_DISPLAY.innerHTML += html
//     //FEED_DISPLAY.insertAdjacentHTML("beforeend", html);
//   });

fetch(FEED_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll("entry");
        let html = '';
        items.forEach(el => {
            html +=`<div>
            <h1><a href="/gazette.html">${dateParser(el.querySelector("updated").innerHTML).toLocaleDateString("en-US", date_options)}</a></h1>
            <p> ${el.querySelector("content").innerHTML} </p>
            </div>
            `
        }

        )
        FEED_DISPLAY.innerHTML = html;
    })
    .catch((e) => console.error(e));

