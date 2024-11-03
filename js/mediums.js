// load this file before catsay.js and after mouse.js
const buttonImage = document.getElementById('buttonIMG');  
const buttonIndex = document.getElementById('buttonIndex');
const imageDir = './graphics/hots/';

let audio_volume = 0.2;
let button_index = 0;
let button_clicks = 0;

function play_sound(audio_file){
    let click = new Audio(audio_file);
    click.volume = audio_volume; click.play();
}

function explode(){
    let files = [
        'explode1.ogg',
        'explode2.ogg',
        'explode3.ogg',
        'explode4.ogg',
        'explode5.mp3'
    ];
    let file = files[Math.floor(Math.random() * files.length)];
    play_sound(`./graphics/audio/${file}`)
    
    var img = new Image();
    // Since browsers cache images, refreshing the page continues the gif from where it left of
    // Adding a random number after the url makes the browser reload the image every time
    img.src = `./graphics/arts/explode.gif?${Math.floor(Math.random()*9999)}`;
    img.style.height = '120px';
    img.style.position = 'absolute';
    img.style.left = 40+'px'; img.style.top = '-60px';
    buttonImage.parentNode.appendChild(img);
    setTimeout(function(){ img.style.visibility = 'hidden'; }, 1700);
}

function cycleButtons(buttons) {
    buttonIndex.innerHTML = `${button_index+1}/${buttons.length}`;
    buttonImage.src = imageDir + buttons[button_index++];
    if (button_index == buttons.length) { button_index = 0; };
    if (button_clicks > 15) { 
        const canvas = document.createElement('canvas')
        canvas.width = 88; canvas.height = 31;
        buttonImage.removeAttribute('id');
        buttonIndex.innerHTML = `:(&nbsp;`;
        buttonImage.src = canvas.toDataURL();
        buttonImage.onclick = function() {};
        explode();
    } else {button_clicks++}
};
function loadButtons(buttons) {
    cycleButtons(buttons);
    buttonImage.onclick = function() { 
        play_sound('./graphics/audio/click_stereo.ogg');
        cycleButtons(buttons);
    };
};

// width: 2, height: 20, margin: 5
// https://barcode-maker.com/en/Code128
// remove 10 pixels from width and height if margins are too large
function barcode(element, pics) { 
    var a = Math.floor(Math.random() * pics.length);
    var img = pics[a];
    element.innerHTML = `<img src="${img}" height="16px">`; 
};

// call the functions
loadButtons(
    [ 
        'button_2.png', // button 2 is the newest so it should be first on the list
        'button_1.png',
    ]
);
barcode( document.getElementById('barcode'),
    [
        'graphics/arts/barcodes/barcode3.png', // go watch bojack horseman
    ]
);

