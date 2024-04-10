const thumbnail_display = document.getElementById('thumbnail_display');
const url_input = document.getElementById('get_url');

const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

url_input.parentElement.addEventListener("submit", function(e){
    e.preventDefault();
    thumbnail_display.innerHTML = '';

    var a = document.createElement("a");
    var img = document.createElement("img");
    let video_id = url_input.value
    if (video_id == ''){ return; }
    else if (url_input.value.includes('youtube.') || url_input.value.includes('youtu.')){
        video_id = (url_input.value).match(VID_REGEX)[1];
    }
    
    img.src =  `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`
    a.href = img.src;
    a.appendChild(img)
    thumbnail_display.appendChild(a);
    thumbnail_display.appendChild(document.createElement("br"))
    
    url_input.value= '';
});