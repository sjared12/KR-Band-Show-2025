// concession-menu.js
// Show the concession menu only after 4pm EST on event day
(function() {
  // October 25, 2025, 4:00pm EST (UTC-4)
  var showTime = new Date('2025-10-25T20:00:00Z');
  var now = new Date();
  if (now >= showTime) {
    var menu = document.getElementById('concession-menu');
    if (menu) menu.style.display = '';
  }
})();
