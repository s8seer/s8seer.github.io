
function random_image(element, pics) { 
    var a = Math.floor(Math.random() * pics.length); 
    var img = pics[a]; 
    element.innerHTML = `<img src="${img}" height="16px">`; 
} 

// barcode settings:
// bar width: 2
// height: 20
// margin: 5
random_image(
    document.getElementById('bottombar'),
    [
        'graphics/arts/barcode2.png', // s8seer.github.io
        'graphics/arts/barcode3.png', // who uses a barcode scanner
        'graphics/arts/barcode4.png', // have a good day
        'graphics/arts/barcode5.png'  // bojack horseman is a great show
    ]
);