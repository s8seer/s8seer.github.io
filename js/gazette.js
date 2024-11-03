// This script is used in the gazette viewer to display atom entries
const FEED_URL = `/atom.xml`;
const FEED_DISPLAY = document.getElementById('gazetteDisplay');
FEED_DISPLAY.innerHTML = '<br><i>loading content...</i><br><br>';

var date_options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
const article_date_options = {year: "numeric", month: "short", day: "numeric"};

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

function create_year_divider_if_it_does_not_exist(html, year){
    let id_format = `published_${year}`
    let entry_year = document.getElementById(id_format);
    if (entry_year == null){
        entry_year = document.createElement('div');
        entry_year.id = id_format;
        entry_year.className = 'entry_year'
        let year_title = document.createElement('h2');
        year_title.innerHTML = year;
        entry_year.appendChild(year_title);
        FEED_DISPLAY.appendChild(entry_year);
        FEED_DISPLAY.appendChild(document.createElement("br"));
    }
    entry_year.innerHTML += html;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

fetch(FEED_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        // Display the selected Atom entry
        if (!(urlParams.get('entry') == null) && !(urlParams.get('entry') == '')){
            let selected_entry = urlParams.get('entry');
            const items = data.querySelectorAll("entry");
            let item;
            let item_index;
            let article_links = '';
            for(let i = 0; i < items.length; i++){
                if (items[i].querySelector('id').innerHTML == selected_entry){
                    item = items[i];
                    item_index = i;
                    if (items[0] != item){
                        article_links += `<a href='/gazette.html?entry=${items[item_index-1].querySelector('id').innerHTML}'>« Next Post</a> `;
                    }
                    if (items[items.length - 1] != item){
                        article_links += ` <a href='/gazette.html?entry=${items[item_index+1].querySelector('id').innerHTML}'>Previous Post »</a>`
                    }
                    break;
                }
            }
            // If there isn't an entry, show a warning
            if (item == null){
                FEED_DISPLAY.innerHTML = `
                    <div id='bigviewer'>
                        <div id='bigviewercontainer'>  
                            <br> 
                            404 not found<br>
                            <a href='/gazette.html'>Return</a>
                        </div>
                    </div>
                `;
                return;
            };
            let html = `  
                <div id='bigviewer'>
                    <div id='bigviewercontainer'>   
                        <h1>${item.querySelector('title').innerHTML}</h1>
                        <div id="article_info_bar">
                            <b>UPDATED: ${dateParser(item.querySelector("updated").innerHTML).toLocaleDateString("en-US", article_date_options)}</b> |
                            <b>PUBLISHED: ${dateParser(item.querySelector("published").innerHTML).toLocaleDateString("en-US", article_date_options)}</b>
                        </div>
                        
                        <div id="article_text">${item.querySelector("content").innerHTML}</div>

                        <div id="article_info_bar_bottom">
                            <a href='/gazette.html'>Home</a> | ${article_links} 
                        </div>
                    </div>    
                </div>
            `;
            FEED_DISPLAY.innerHTML = html;
        }
        // If not show as list
        else{
            const items = data.querySelectorAll("entry");
            FEED_DISPLAY.innerHTML = '';
            let html = '';
            items.forEach(el => {
                html =`<div class='preview'>
                <a href="/gazette.html?entry=${el.querySelector('id').innerHTML}"><h1>${el.querySelector("title").innerHTML}</h1> ${dateParser(el.querySelector('published').innerHTML).toLocaleDateString("en-US", article_date_options)}</a>
                <p> ${el.querySelector("summary").innerHTML} </p>
                </div>
                `
                create_year_divider_if_it_does_not_exist(html, dateParser(el.querySelector("published").innerHTML).getFullYear())
            }
            )
        }
    })
    .catch((e) => console.error(e));



