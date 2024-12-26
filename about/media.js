let library = {
    'Slay the Priness': 
    {
        'Title': 'Slay the Princess — The Pristine Cut',
        'Url': 'https://www.slaytheprincess.com/',
        'Release Date': new Date('2023-10-23'),

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
        'Release Date': new Date('2021-06-11'),

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
        'Release Date': new Date('2021-10-19'),
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
        'Release Date': new Date('2022-08-11'),

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
        'Release Date': new Date('2024-04-04'),

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
        'Release Date': new Date('2021-06-21'),

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

var date_options = {year: "numeric", month: "short", day: "numeric"};
let recents = ['Buckshot Roulette', 'Guilty Gear', 'Slay the Priness', 'Cult of the Lamb']
let very_recents = recents.slice(0, 4);

