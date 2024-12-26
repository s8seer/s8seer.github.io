const MEDIA_CONTAINER = document.getElementById('media_container')

const NAVBAR_RECENTS = document.getElementById('navbar_recents');
const NAVBAR_ALL = document.getElementById('navbar_all');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function load_media_all(type){
    let context_menu_open = false;
    document.addEventListener("click", click_handler, true);
    
    function click_handler(e) {
        
        if (context_menu_open && !(e.target.className=="dropdown-menu")){
            e.stopPropagation();
            e.preventDefault();
            context_menu_open = false;
            
            let details_button = document.getElementsByClassName("details_button");
            for (let i = 0; i < details_button.length; i++){
                let elem = details_button[i];
                let elem_menu = elem.getElementsByClassName('dropdown-menu')[0];
                if (elem_menu.style.display == 'block'){
                    elem_menu.style.display = "none";
                };
            }
            document.body.style.pointerEvents = "all";
        }
        
    }
    MEDIA_CONTAINER.innerHTML = '';
    let lib_array;
    if (type == 'recent'){
        lib_array = recents;
    }else{
        lib_array = Object.keys(library);
        lib_array.sort()
        MEDIA_CONTAINER.innerHTML += `
            <div id='media_search'>
                <!-- <input id="media_input" placeholder='Find a gam'></input> -->
            </div>
        `
        
    }
    
    for (let i = 0; i < lib_array.length; i++){
        let array_item = library[lib_array[i]]
        let dropdown_html = '';
        for (let ii = 0; ii < Object.keys(array_item['Dropdown']).length; ii++){
            let dropdown_item = Object.keys(array_item['Dropdown'])[ii]
            let dropdown_item_value = array_item['Dropdown'][dropdown_item]
            dropdown_html += `<a href='${dropdown_item_value}'>${dropdown_item}</a><br>`
        }
        let media_capsule = document.createElement("div");

        media_capsule.innerHTML += `
                
                <div class='details_button'>
                    <img src="/about/assets/image.svg">
                    <div class="dropdown-menu">
                        ${dropdown_html}
                    </div>
                </div>
                
                <div class="topside">
                    <span><img src="${array_item['Header']}"></span>
                    <span class="media_title">${array_item['Title']}</span><br>
                    <p>
                        <span class='greyed'>Release Date: </span> ${array_item['Release Date'].toLocaleDateString("en-GB", date_options)}<br><br>
                    </p>
                </div>
                <div style="clear: both;"></div>
                </div>
        `
        media_capsule.classList.add('media_header')
        media_capsule.classList.add('media_display')
        media_capsule.style.cssText = `
            background-image: 
            linear-gradient(
                rgba(0, 0, 0, 0.8), 
                rgba(0, 0, 0, 0.8)
            ),
            url("${array_item['Background']}");
            backdrop-filter: blur(18px);`
        MEDIA_CONTAINER.appendChild(media_capsule)
        
    }
    let details_button = document.getElementsByClassName("details_button");
    console.log(details_button)
    for (let i = 0; i < details_button.length; i++){
        let elem = details_button[i];
        let elem_menu = elem.getElementsByClassName('dropdown-menu')[0];
        elem.onclick = function() { 
            if (elem_menu.style.display == 'block'){
                elem_menu.style.display = "none";
            }else{
                elem_menu.style.display = 'block';
                context_menu_open = true;
                document.body.style.pointerEvents = "none";
                elem_menu.style.pointerEvents = "all";
            }
        };
    }
}

NAVBAR_ALL.innerHTML += ` (${Object.keys(library).length})`   
NAVBAR_RECENTS.innerHTML += ` (${recents.length})`   

function select_display(type){
    if (type == 'recent' && !(NAVBAR_RECENTS.classList.contains('selected'))) {
        NAVBAR_ALL.classList.remove('selected');
        NAVBAR_RECENTS.classList.add('selected');
    }
    else if ((type == 'all' && !(NAVBAR_ALL.classList.contains('selected')))){
        NAVBAR_ALL.classList.add('selected');
        NAVBAR_RECENTS.classList.remove('selected');
    }
    window.history.replaceState({}, null, `${window.location.href.split('?')[0]}?tab=${type}`);
}

if (urlParams.get('tab') == 'recent'){
    console.log('noww')
    select_display('recent');
    load_media_all('recent')
}else{
    select_display('all');
    load_media_all('all')
}

NAVBAR_RECENTS.onclick = function(e){
    e.preventDefault();
    
    select_display('recent');
    load_media_all('recent');
}
NAVBAR_ALL.onclick = function(e){
    e.preventDefault();
    
    select_display('all');
    load_media_all('all');        
}

