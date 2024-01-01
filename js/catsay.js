
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
function addComment(element, comment, title = default_title, maxWidth = false) {
  if ( maxWidth ) { comment += "<div id='maxbar'></div>" };
  element.addEventListener('mouseout', function() { mouseOut() });
  element.addEventListener('mouseover', function() { mouseIn(comment, title) });
}

// date handling
var today = new Date();
var date_options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};

var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"][today.getMonth()];

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

let dailyComment = '';
if (month == "June") { dailyComment = "Happy pride month!"}
else if (month == "January" && dd == '01') { dailyComment = "Happy new years!"}
else { dailyComment = 'Have a great day!'; };

// elements with comments
addComment(document.getElementById("pfp"), "Hii!!");
addComment(document.getElementById("exit"), "Baii!!<br>Take care!!");
addComment(document.getElementById("buttonWall"), "Go and fetch the little trinkets hidden in these sites!");
addComment(document.getElementById("donut"), "Yum its made<br>out of charcoal");
addComment(document.getElementById("jsclock"), `${today.toLocaleDateString("en-US", date_options)}<br>${dailyComment}`, 'clock:', true);

