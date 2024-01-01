var jsclock = document.getElementById('jsclock');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

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

function disableSelection(element) {
  if (typeof element.onselectstart != 'undefined') {
      element.onselectstart = function() { return false; };
  } else if (typeof element.style.MozUserSelect != 'undefined') {
      element.style.MozUserSelect = 'none';
  } else {
      element.onmousedown = function() { return false; };
  }
}

disableSelection(jsclock);
time();
setInterval(time, 1000);
