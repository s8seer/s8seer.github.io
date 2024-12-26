const MEDIA_CONTAINER = document.getElementById('media_container')
const LIBRARY_LINK = document.getElementById('library_link');

function load_media_recents(){
    for (let i = 0; i < very_recents.length; i++){
        let array_item = library[very_recents[i]]
        
        MEDIA_CONTAINER.innerHTML += `
            <div class="media_capsule media_display">
                <div class="topside">
                    <span>
                        <img src="${array_item['Capsule']}">
                    </span>
                    <span class="media_title">${array_item['Title']}</span>
                </div>
                <div style="clear: both;"></div>
                <!--<div class="underside">

                </div>-->
            </div>
        `
    }
}

LIBRARY_LINK.innerHTML += `${Object.keys(library).length}`
load_media_recents()