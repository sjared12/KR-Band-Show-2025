// hide-concessions-link.js (generalized to also hide program link until show time)
(function() {
  // 4:00 PM Eastern Daylight Time on Oct 25, 2025 = 20:00:00Z
  var showTime = new Date(Date.UTC(2025, 9, 25, 20, 0, 0));
  var now = new Date();
  if (now < showTime) {
    // Hide Concessions link (existing behavior)
    var hideSelectors = [
      'a[href="concessions.html"]',
      'a[href="/concessions"]',
      // Hide Digital Program link until the show time
      'a[href="program.html"]',
      'a[href="/program"]'
    ];
    var links = document.querySelectorAll(hideSelectors.join(','));
    links.forEach(function(link) {
      link.style.display = 'none';
    });
  }
})();
