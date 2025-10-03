// concession-menu.js
// Load and render concession menu from CSV as an accordion
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
    let html = '<div class="concession-accordion">';
    Object.keys(categories).forEach(cat => {
      html += `<div class="concession-category">
        <button class="concession-toggle">${cat}</button>
        <div class="concession-items" style="display:none;">`;
      categories[cat].forEach(item => {
        html += `<div class="concession-item">
          <div class="concession-item-header">
            <span class="concession-item-name">${item.item}</span>
            <span class="concession-item-price">${item.price}</span>
          </div>`;
        if (item.description) {
          html += `<div class="concession-item-desc">${item.description}</div>`;
        }
        html += '</div>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    menuSection.innerHTML = '<h2>Concession Stand Menu</h2>' + html + '<p class="concession-note">All proceeds benefit the Kenton Ridge Band program. Thank you for your support!</p>';
    // Accordion behavior
    document.querySelectorAll('.concession-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const items = this.nextElementSibling;
        const isOpen = items.style.display === 'block';
        document.querySelectorAll('.concession-items').forEach(i => i.style.display = 'none');
        document.querySelectorAll('.concession-toggle').forEach(b => b.classList.remove('expanded'));
        if (!isOpen) {
          items.style.display = 'block';
          this.classList.add('expanded');
        }
      });
    });
  }
});
