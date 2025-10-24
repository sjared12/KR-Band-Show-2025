// concession-menu.js
// Load and render concession menu from CSV as a card grid
(function () {
  function safeTrim(v) {
    return typeof v === 'string' ? v.trim() : v;
  }
  function normalizePrice(v) {
    if (v == null) return '';
    let s = String(v).trim();
    if (!s) return '';
    // If value is like "1.50" ensure $ prefix for consistency
    if (!/^\$/.test(s)) {
      // keep existing $ if present, otherwise add for numbers
      if (/^\d+(?:\.\d{1,2})?$/.test(s)) s = `$${Number(s).toFixed(2)}`;
    }
    return s;
  }

  Papa.parse('concession-menu.csv', {
    header: true,
    download: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => String(h || '').trim().toLowerCase(),
    complete: function (results) {
      const menuSection = document.getElementById('concession-menu');
      if (!menuSection) return;
      if (!results || !Array.isArray(results.data)) {
        console.error('Failed to parse concession menu CSV');
        return;
      }

      // Clean and normalize rows
      const cleaned = results.data
        .map((row) => ({
          category: safeTrim(row.category),
          item: safeTrim(row.item),
          price: normalizePrice(row.price || row[' price ']),
          description: safeTrim(row.description),
        }))
        .filter((r) => r.category && r.item && r.price);

      if (!cleaned.length) {
        // Soft message if nothing to show
        menuSection.innerHTML = '<h2>Concession Stand Menu</h2><p class="concession-note">Menu will be available at the event.</p>';
        return;
      }

      const categories = {};
      cleaned.forEach((row) => {
        const key = row.category;
        if (!categories[key]) categories[key] = [];
        categories[key].push(row);
      });

      let html = '';
      Object.keys(categories).forEach((cat) => {
        html += `<div class="concession-category-title">${cat}</div><div class="concession-menu-board">`;
        categories[cat].forEach((item) => {
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
    },
    error: function (err) {
      console.error('Error loading concession menu CSV', err);
    },
  });
})();
