const clock_tooltip = document.getElementById('calendar');
const jsclock = document.getElementById('jsclock');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var date_options = {weekday: "long", year: "numeric", month: "short", day: "2-digit"};
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"][today.getMonth()];
var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];

function time() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;
    
  let time = hh + ":" + mm + ":" + ss;
  jsclock.innerText = time; 
}

time();
setInterval(time, 1000);

function eggday(){
  clock_tooltip.innerHTML += `<img src="/graphics/arts/wPaktfh.jpeg">`;
}

// Calendar stuff
let dailyComment = '';
if      (month == "June")                   { dailyComment += "Happy pride month<br>"                    }
else if (month == "October")                { dailyComment += "arr arr arr happy halloween<br>"          }

else if (month == "January"   && dd == '01') { dailyComment += "Happy new years"                         }
else if (month == "February"  && dd == '14') { dailyComment += "Happy valentine's"                       }
else if (month == "March"     && dd == '15') { dailyComment += "Bye bye caesar"                          }
else if (month == "April"     && dd == '01') { dailyComment += "Let's get this day over with already"    }

else if (month == "October"   && dd == '02') { dailyComment += "Happy international day of non-violence" }
else if (month == "October"   && dd == '31') { dailyComment += "Happy halloween"                         }

clock_tooltip.innerHTML = `${today.toLocaleDateString("en-US", date_options)}<br>${dailyComment}`;
jsclock.addEventListener('mouseover', function() { clock_tooltip.style.display = 'block'; });
jsclock.addEventListener('mouseleave', function() { clock_tooltip.style.display = 'none'; });

if (month == "September" && dd == '27') { 
  eggday(); 
  jsclock.addEventListener('mouseover', function() { clock_tooltip.style.display = 'block'; });
  jsclock.addEventListener('mouseleave', function() { clock_tooltip.style.display = 'none'; });
}

