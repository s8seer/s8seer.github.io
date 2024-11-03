
// content var gets the original html elements inside 'moodtext'
// and saves it as a variable
const status_text = document.getElementById('statusText');
const status_title = document.getElementById('statusTitle');
const default_text = document.getElementById('statusText').innerHTML;
const default_title = document.getElementById('statusTitle').innerHTML;

const comment_prefix = 'comment:';

// resets the text after mouse leave
function mouseOut() {
  status_text.innerHTML = default_text;
  status_title.innerHTML = default_title;
}
// sets the comment when mouse hover
function mouseIn(comment, title) {
  status_title.innerHTML = title;
  status_text.innerHTML = comment;
}
// adds both event listeners to an element
function catsay(element, comment, title = default_title, maxWidth = false) {
  if ( maxWidth ) { comment += "<div id='maxbar'></div>" };
  element.addEventListener('mouseout', function() { mouseOut() });
  element.addEventListener('mouseover', function() { mouseIn(comment, title) });
}



// add catsays
catsay(document.getElementById("pfp"),        "Hello");
catsay(document.getElementById("buttonWall"), "These sites are pretty neat");
catsay(document.getElementById("donut"),      '"It reeks of charcoal"');



