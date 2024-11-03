// This script is used in the homepage to display the latest atom feed
const FEED_URL = `/atom.xml`;
const FEED_DISPLAY = document.getElementById('updates');
FEED_DISPLAY.innerHTML = '<br><i>loading content...</i>';
const ARTICLE_DISPLAY = document.getElementById('articledisplay');

var date_options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
const article_date_options = {year: "numeric", month: "short", day: "numeric"};

function dateParser(datestr) {
    var yy   = datestr.substring(0,4);
    var mo   = datestr.substring(5,7);
    var dd   = datestr.substring(8,10);
    var hh   = datestr.substring(11,13);
    var mi   = datestr.substring(14,16);
    var ss   = datestr.substring(17,19);
    var myutc = Date.UTC(yy-0, mo-1, dd-0, hh-0, mi-0, ss-0);
    return new Date(myutc);
}

function timeDiff(date){
    let today = new Date();
    const oneDay = 24 * 60 * 60 * 1000
    let dateDiff = Math.round(Math.abs((today - date)) / oneDay);

    if (dateDiff == 0){
        return 'today';
    } 
    else if (dateDiff == 1){
        return `${dateDiff} day ago`
    };
    
    return `${dateDiff} days ago`
    
}

fetch(FEED_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll("entry");
        FEED_DISPLAY.innerHTML = '';
        let article_html = '';
        let article_count = 0;
        let html = `
            <a id='news_link_a' href='/gazette.html'>
                <div id='news_link_div'>
                    <h1>News!</h1>
                    <b>Updated ${timeDiff(dateParser(data.querySelector("updated").innerHTML))}</b>
                </div>
            </a>
            
        `;
        let updates = '';
        items.forEach(el => {
            
            tags = el.querySelector('tags');
            if (tags){
                tags = (tags.innerHTML).split(', ')
            }else{
                tags = []
            }
            if (tags.includes('Update')){
                updates += `
                    <a href="/gazette.html?entry=${el.querySelector('id').innerHTML}">
                        <div>
                            <b>${dateParser(el.querySelector("published").innerHTML).toLocaleDateString("en-US", article_date_options)}:</b>
                            <p> ${el.querySelector("summary").innerHTML}</p>
                        </div>
                    </a>
                `
            }
            else if(tags.includes('Article') && article_html == ''){
                let thumbnail = el.querySelector('thumbnail').getAttribute('url');
                article_html += `
                    <a href="/gazette.html?entry=${el.querySelector('id').innerHTML}" id='article_${article_count}'>
                        <img src="${thumbnail}">
                        <div>
                            ${el.querySelector('summary').innerHTML}
                        </div>
                    </a>
                `
                
                
            }
            
        }
        )
        if (article_html == ''){
            article_html += `
                    <a href='.'>
                        <img src="/graphics/scenery/transparent.png">
                    </a>
                    <div>
                        There is nothing on the spotlight<br> right now, but stay tuned!
                    </div>
                `
        };
        html += `<div id='article_list'>${updates}</div>`;
        ARTICLE_DISPLAY.innerHTML = article_html;
        FEED_DISPLAY.innerHTML = html;

    })
    .catch((e) => console.error(e));






