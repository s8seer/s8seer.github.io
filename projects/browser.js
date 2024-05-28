
// content var gets the original html elements inside 'moodtext'
// and saves it as a variable
const screenshot = document.getElementById('screenshots').getElementsByTagName('img')[0];
const default_image = screenshot.src;
const description = document.getElementById('description');
const default_description = description.innerHTML;

// resets the text after mouse leave
function mouseOut() {
  if (description.innerHTML == default_description && screenshot.src == default_image){
    return
  };

  description.innerHTML = default_description;
  screenshot.src = default_image;
}
// sets the comment when mouse hover
function mouseIn(comment, image) {
    screenshot.src = image;
    description.innerHTML = comment;
}
// adds both event listeners to an element
function catsay(element, comment, image = default_image) {
  
  element.addEventListener('mouseover', function() { mouseIn(comment, image) });
}

// document.getElementById("main").addEventListener('mouseleave', function() { mouseOut() });

// add catsays, images will be cropped via css
catsay(document.getElementById("Checklists"),
  "Html and Js based web app to manage your to-dos and schedules",
  "./assets/thumbnails/checklist.png");

catsay(document.getElementById("YoutubeThumbnailGetter"), 
  "Get the Youtube video thumbnail from a url or a video id",
  "./assets/thumbnails/youtube_thumbnail.png" );
  
catsay(document.getElementById("cpp_engine"), 
  "Game engine prototype written in c++ and opengl",
  "./assets/thumbnails/cpp_engine.png" );
