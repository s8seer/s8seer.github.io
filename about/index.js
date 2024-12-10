const MEDIA_CONTAINER = document.getElementById('media_container')


let library = {
    'Slay the Priness': 
    {
        'Title': 'Slay the Princess — The Pristine Cut',
        'Url': 'https://www.slaytheprincess.com/',
        'Release Date': '23 Oct, 2023',

        'Capsule': '/about/media/stp_capsule.jpg',
        'Header': '/about/media/stp_header.jpg',
        'Background': '/about/media/stp_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/1989270/Slay_the_Princess__The_Pristine_Cut/',
                'Website': 'https://www.slaytheprincess.com/'
            }
    },

    'Guilty Gear': 
    {
        'Title': 'GUILTY GEAR -STRIVE-',
        'Url': 'https://www.guiltygear.com/ggst/en/',
        'Release Date': '11 Jun, 2021',

        'Capsule': '/about/media/ggst_capsule.jpg',
        'Header': '/about/media/ggst_header.jpg',
        'Background': '/about/media/ggst_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/1384160/GUILTY_GEAR_STRIVE/',
                'Twitter': 'https://x.com/GUILTYGEAR_PR',
                'Website': 'https://www.guiltygear.com/ggst/en/'
            }
    },

    'Inscryption': 
    {
        'Title': 'Inscryption',
        'Release Date': '19 Oct, 2021',
        'Url': 'https://www.inscryption.com/',

        'Capsule': '/about/media/inscryption_capsule.jpg',
        'Header': '/about/media/inscryption_header.jpg',
        'Background': '/about/media/inscryption_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/1092790/Inscryption/',
                'Website': 'https://www.inscryption.com/'
            }
    },

    'Cult of the Lamb': 
    {
        'Title': 'Cult of the Lamb',
        'Url': 'https://www.cultofthelamb.com/',
        'Release Date': '11 Aug, 2022',

        'Capsule': '/about/media/cotl_capsule.jpg',
        'Header': '/about/media/cotl_header.jpg',
        'Background': '/about/media/cotl_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/',
                'Website': 'https://www.cultofthelamb.com/'
            }
    },
    'Buckshot Roulette': 
    {
        'Title': 'Buckshot Roulette',
        'Url': '',
        'Release Date': '4 Apr, 2024',

        'Capsule': '/about/media/buckshot_capsule.jpg',
        'Header': '/about/media/buckshot_header.jpg',
        'Background': '/about/media/buckshot_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/2835570/Buckshot_Roulette/',
                'Itch.io': 'https://mikeklubnika.itch.io/buckshot-roulette'
            }
    },
    'Ender Lilies': 
    {
        'Title': 'ENDER LILIES: Quietus of the Knights',
        'Url': '',
        'Release Date': '21 Jun, 2021',

        'Capsule': '/about/media/enderlilies_capsule.jpg',
        'Header': '/about/media/enderlilies_header.jpg',
        'Background': '/about/media/enderlilies_background.jpg',

        'Dropdown':
            {
                'Steam': 'https://store.steampowered.com/app/1369630/',
                'Website': 'https://en.enderlilies.com/'
            }
    }
}

let recents = ['Buckshot Roulette', 'Guilty Gear', 'Slay the Priness', 'Cult of the Lamb']
let very_recents = recents.slice(0, 4);

// Media to not display
let hidden = []

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
                    <a><img src="${array_item['Header']}"></a>
                    <a class="media_title">${array_item['Title']}</a><br>
                    <p>
                        <span class='greyed'>Release Date: </span> ${array_item['Release Date']}<br><br>
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
                <div class="underside">
                    
                </div>
            </div>
        `
    }
}

if (page == 'index'){
    const LIBRARY_LINK = document.getElementById('library_link');
    LIBRARY_LINK.innerHTML += `${Object.keys(library).length}`
    load_media_recents()
}
else if (page == 'library'){
    const NAVBAR_RECENTS = document.getElementById('navbar_recents');
    const NAVBAR_ALL = document.getElementById('navbar_all');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

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
}

