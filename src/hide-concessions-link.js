// hide-concessions-link.js
(function() {
  var showTime = new Date('2025-10-25T20:00:00Z');
  var now = new Date();
  if (now < showTime) {
    var links = document.querySelectorAll('a[href="concessions.html"], a[href="/concessions"]');
    links.forEach(function(link) {
      link.style.display = 'none';
    });
  }
})();
