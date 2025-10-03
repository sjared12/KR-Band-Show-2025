// concession-menu.js
// Load and render concession menu from CSV as a card grid
Papa.parse('concession-menu.csv', {
  header: true,
  download: true,
  complete: function(results) {
    if (!results.data || !Array.isArray(results.data) || results.data.length === 0) return;
    const menu = results.data.filter(row => row.item && row.price);
    const categories = {};
    menu.forEach(row => {
      if (!categories[row.category]) categories[row.category] = [];
      categories[row.category].push(row);
    });
    const menuSection = document.getElementById('concession-menu');
    if (!menuSection) return;
    let html = '';
    Object.keys(categories).forEach(cat => {
      html += `<div class="concession-category-title">${cat}</div><div class="concession-menu-board">`;
      categories[cat].forEach(item => {
        html += `<div class="concession-card">
          <span class="concession-item-name">${item.item}</span>
          <span class="concession-item-price">${item.price}</span>`;
        if (item.description) {
          html += `<div class="concession-item-desc">${item.description}</div>`;
        }
        html += '</div>';
      });
      html += '</div>';
    });
    menuSection.innerHTML = '<h2>Concession Stand Menu</h2>' + html + '<p class="concession-note">All proceeds benefit the Kenton Ridge Band program. Thank you for your support!</p>';
  }
});
