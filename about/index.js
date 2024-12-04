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
                'Steam Page': 'https://store.steampowered.com/app/1989270/Slay_the_Princess__The_Pristine_Cut/',
                'Twitter': 'https://x.com/blacktabbygames',
                'Official Website': 'https://www.slaytheprincess.com/'
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
                'Steam Page': 'https://store.steampowered.com/app/1384160/GUILTY_GEAR_STRIVE/',
                'Twitter': 'https://x.com/GUILTYGEAR_PR',
                'Official Website': 'https://www.guiltygear.com/ggst/en/'
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
                'Steam Page': 'https://store.steampowered.com/app/1092790/Inscryption/',
                'Twitter': 'https://x.com/DMullinsGames',
                'Official Website': 'https://www.inscryption.com/'
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
                'Steam Page': 'https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/',
                'Twitter': 'https://x.com/cultofthelamb',
                'Official Website': 'https://www.cultofthelamb.com/'
            }
    }
}

let very_recents = ['Slay the Priness', 'Guilty Gear']
let recents = ['Slay the Priness', 'Guilty Gear']

// Media to not display
let hidden = []

function load_media_all(type){
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none"><path d="M21.75 18C21.75 18.7417 21.5301 19.4667 21.118 20.0834C20.706 20.7001 20.1203 21.1807 19.4351 21.4645C18.7498 21.7484 17.9958 21.8226 17.2684 21.6779C16.541 21.5332 15.8728 21.1761 15.3484 20.6517C14.8239 20.1272 14.4668 19.459 14.3221 18.7316C14.1774 18.0042 14.2516 17.2502 14.5355 16.5649C14.8193 15.8797 15.2999 15.294 15.9166 14.882C16.5333 14.4699 17.2583 14.25 18 14.25C18.9946 14.25 19.9484 14.6451 20.6517 15.3483C21.3549 16.0516 21.75 17.0054 21.75 18ZM6 14.25C5.25832 14.25 4.5333 14.4699 3.91661 14.882C3.29993 15.294 2.81928 15.8797 2.53545 16.5649C2.25162 17.2502 2.17736 18.0042 2.32206 18.7316C2.46675 19.459 2.8239 20.1272 3.34835 20.6517C3.8728 21.1761 4.54098 21.5332 5.26841 21.6779C5.99584 21.8226 6.74984 21.7484 7.43506 21.4645C8.12029 21.1807 8.70596 20.7001 9.11801 20.0834C9.53007 19.4667 9.75 18.7417 9.75 18C9.75 17.0054 9.35491 16.0516 8.65165 15.3483C7.94839 14.6451 6.99456 14.25 6 14.25ZM30 14.25C29.2583 14.25 28.5333 14.4699 27.9166 14.882C27.2999 15.294 26.8193 15.8797 26.5355 16.5649C26.2516 17.2502 26.1774 18.0042 26.3221 18.7316C26.4668 19.459 26.8239 20.1272 27.3484 20.6517C27.8728 21.1761 28.541 21.5332 29.2684 21.6779C29.9958 21.8226 30.7498 21.7484 31.4351 21.4645C32.1203 21.1807 32.706 20.7001 33.118 20.0834C33.5301 19.4667 33.75 18.7417 33.75 18C33.75 17.0054 33.3549 16.0516 32.6517 15.3483C31.9484 14.6451 30.9946 14.25 30 14.25Z" fill="currentColor"></path></svg>
                    <div class="dropdown-menu">
                        ${dropdown_html}
                    </div>
                </div>
                <div class="topside">
                    <a href="${array_item['Url']}"><img src="${array_item['Header']}"></a>
                    <a href="${array_item['Url']}" class="media_title">${array_item['Title']}</a><br>
                    <p>
                        <span class='greyed'>Release Date: </span> ${array_item['Release Date']}<br>
                    </p>
                </div>
                <div style="clear: both;"></div>
                </div>
        `
        media_capsule.classList.add('media_capsule')
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
            console.log(elem_menu.style.display)
            if (elem_menu.style.display == 'block'){
                console.log('a')
                elem_menu.style.display = "none";
            }else{
                elem_menu.style.display = 'block';
            }
        };
    }
    document.addEventListener('onclick', function() {

    })
}

function load_media_recents(){
    for (let i = 0; i < very_recents.length; i++){
        let array_item = library[very_recents[i]]
        
        MEDIA_CONTAINER.innerHTML += `
            <div class="media_capsule">
                <div class="topside">
                    <a href="${array_item['Url']}"><img src="${array_item['Capsule']}"></a>
                    <a href="${array_item['Url']}" class="media_title">${array_item['Title']}</a>
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

