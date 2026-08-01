document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const notificationBtn = document.getElementById('notification-btn');
  const quickActionTarget = document.getElementById('quick-action-target');
  const sidebarNavTarget = document.getElementById('sidebar-nav-target');

  // --- 1. QUICK ACTION BUTTON DYNAMIC RENDER ---
  if (quickActionTarget) {
    quickActionTarget.innerHTML = `
      <div class="quick-action-wrapper glowing-container">
        <button id="quick-action-btn" class="quick-action-btn" aria-expanded="false">
          <svg class="qa-bolt" viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Quick</span>
          <span class="qa-arrow">▼</span>
        </button>
        <div id="quick-action-dropdown" class="quick-action-dropdown">
          <div class="qa-dropdown-header">Your Shortcuts</div>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Activation</a>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Customers</a>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg> Prepaid Users</a>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg> Routers</a>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/></svg> Online Users</a>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/></svg> Active Sessions</a>
          <div class="qa-divider"></div>
          <a href="#" class="qa-dropdown-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Manage Quick Actions</a>
        </div>
      </div>
    `;

    const qaBtn = document.getElementById('quick-action-btn');
    const qaDropdown = document.getElementById('quick-action-dropdown');
    qaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      qaDropdown.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!qaDropdown.contains(e.target) && !qaBtn.contains(e.target)) {
        qaDropdown.classList.remove('active');
      }
    });
  }

  // --- 2. SIDEBAR NAVIGATION DATA & DYNAMIC RENDER ---
  const sidebarItemsData = [
    { title: "Dashboard", icon: `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>`, hasArrow: false },
    { title: "Favorites", icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`, hasArrow: true },
    { title: "Customers", icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>`, hasArrow: true },
    { title: "Activation", icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, hasArrow: true },
    { title: "Data Usage", icon: `<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10h-10z"/>`, hasArrow: true },
    { title: "Hotspot Vouchers", icon: `<rect x="2" y="6" width="20" height="12" rx="2"/><line x1="12" y1="6" x2="12" y2="18"/>`, hasArrow: true },
    { title: "Hotspot Binding", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`, hasArrow: true, badge: "New" },
    { title: "Packages/Plans", icon: `<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>`, hasArrow: true },
    { title: "Transactions", icon: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`, hasArrow: true },
    { title: "Support Ticket", icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`, hasArrow: false },
    { title: "Notifications", icon: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>`, hasArrow: true },
    { title: "Network", icon: `<path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M18 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>`, hasArrow: true },
    { title: "Bulk Actions", icon: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`, hasArrow: true },
    { title: "Static Pages", icon: `<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>`, hasArrow: true },
    { title: "TR069 ACS", icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`, hasArrow: true },
    { title: "Access Points", icon: `<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.82a10 10 0 0 1 14 0"/><path d="M8.5 16.82a5 5 0 0 1 7 0"/>`, hasArrow: true },
    { title: "Access PPPoE Routers", icon: `<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`, hasArrow: true },
    { title: "Access Hotspot APs", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>`, hasArrow: true },
    { title: "Settings", icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83"/>`, hasArrow: true },
    { title: "PPPoE Settings", icon: `<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/>`, hasArrow: true },
    { title: "Hotspot Settings", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/>`, hasArrow: false },
    { title: "Page Builder", icon: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>`, hasArrow: false },
    { title: "Loyalty Points", icon: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`, hasArrow: true },
    { title: "Extras", icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/>`, hasArrow: true },
    { title: "Inventory & Expenses", icon: `<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`, hasArrow: true },
    { title: "Uisp", icon: `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`, hasArrow: true },
    { title: "Logs", icon: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`, hasArrow: true },
    { title: "Escalate", icon: `<path d="M11 5L6 9H2v6h4l5 4V5z"/>`, hasArrow: false },
    { title: "Social Spot/Support", icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`, hasArrow: false },
    { title: "Fix Hotspot", icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, hasArrow: true },
    { title: "Fix PPPoE", icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`, hasArrow: true },
    { title: "Recycle Bin", icon: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, hasArrow: true }
  ];

  if (sidebarNavTarget) {
    let sidebarHTML = `
      <!-- Sidebar Search Input -->
      <div class="sidebar-search-box">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="sidebar-menu-search" placeholder="Search menu..." />
      </div>

      <!-- Navigation List -->
      <ul class="sidebar-menu" id="sidebar-menu-list">
    `;

    sidebarItemsData.forEach((item, index) => {
      sidebarHTML += `
        <li class="sidebar-item">
          <a href="#" class="sidebar-link ${index === 0 ? 'active' : ''}" data-has-dropdown="${item.hasArrow}">
            <div class="sidebar-link-left">
              <svg class="sidebar-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                ${item.icon}
              </svg>
              <span class="sidebar-title">${item.title}</span>
            </div>
            <div class="sidebar-link-right">
              ${item.badge ? `<span class="badge-green">${item.badge}</span>` : ''}
              ${item.hasArrow ? `<span class="sidebar-arrow">&lt;</span>` : ''}
            </div>
          </a>
          ${item.hasArrow ? `
            <ul class="sidebar-submenu">
              <li><a href="#">Overview</a></li>
              <li><a href="#">Manage ${item.title}</a></li>
            </ul>
          ` : ''}
        </li>
      `;
    });

    sidebarHTML += `</ul>`;
    sidebarNavTarget.innerHTML = sidebarHTML;

    // Expand / Collapse Submenu Logic
    const linksWithArrow = sidebarNavTarget.querySelectorAll('.sidebar-link[data-has-dropdown="true"]');
    linksWithArrow.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const parentLi = link.closest('.sidebar-item');
        parentLi.classList.toggle('expanded');
      });
    });

    // Live Sidebar Search Filter Logic
    const searchInput = document.getElementById('sidebar-menu-search');
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const menuItems = document.querySelectorAll('#sidebar-menu-list .sidebar-item');

      menuItems.forEach((item) => {
        const titleText = item.querySelector('.sidebar-title').textContent.toLowerCase();
        if (titleText.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // --- 3. SIDEBAR TOGGLE & NOTIFICATION LISTENERS ---
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  notificationBtn.addEventListener('click', () => {
    alert('You have 3 unread notifications.');
  });
});
