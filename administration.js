document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const notificationBtn = document.getElementById('notification-btn');
  const quickActionTarget = document.getElementById('quick-action-target');
  const sidebarNavTarget = document.getElementById('sidebar-nav-target');

  // --- 1. QUICK ACTION BUTTON RENDER ---
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
          <a href="#" class="qa-dropdown-item">Activation</a>
          <a href="#" class="qa-dropdown-item">Customers</a>
          <a href="#" class="qa-dropdown-item">Prepaid Users</a>
          <a href="#" class="qa-dropdown-item">Routers</a>
          <a href="#" class="qa-dropdown-item">Online Users</a>
          <a href="#" class="qa-dropdown-item">Active Sessions</a>
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

  // --- 2. COMPLETE SIDEBAR MENU DATA ---
  const sidebarItemsData = [
    { id: "dash", title: "Dashboard", icon: `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>` },
    { id: "favs", title: "Favorites", icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`, isFavoritesMenu: true },
    { id: "admin", title: "Admin", icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`, children: [
      { id: "admin-add", title: "Add New Admin", starred: false },
      { id: "admin-manage", title: "Manage Admin", starred: false }
    ]},
    { id: "act", title: "Activation", icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, children: [
      { id: "act-1", title: "Activate User", starred: false },
      { id: "act-2", title: "Prepaid Users", starred: false },
      { id: "act-3", title: "Active Users", starred: false },
      { id: "act-4", title: "Expired Users", starred: false },
      { id: "act-5", title: "Online Users", starred: false },
      { id: "act-6", title: "Offline Users", starred: false },
      { id: "act-7", title: "Roaming Users", starred: false },
      { id: "act-8", title: "FUP Users", starred: true },
      { id: "act-9", title: "Compensate", starred: false },
      { id: "act-10", title: "Disable Hotspot Server", starred: false }
    ]},
    { id: "cust", title: "Customers", icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>`, children: [
      { id: "cust-1", title: "Add New User", starred: true },
      { id: "cust-2", title: "Users", starred: true },
      { id: "cust-3", title: "User's Location", starred: false }
    ]},
    { id: "data", title: "Data Usage", icon: `<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10h-10z"/>`, children: [
      { id: "du-1", title: "Daily Usage", starred: false },
      { id: "du-2", title: "Weekly Usage", starred: false },
      { id: "du-3", title: "Monthly Usage", starred: false }
    ]},
    { id: "hsv", title: "Hotspot Vouchers", icon: `<rect x="2" y="6" width="20" height="12" rx="2"/><line x1="12" y1="6" x2="12" y2="18"/>`, children: [
      { id: "hsv-1", title: "All Vouchers", starred: false },
      { id: "hsv-2", title: "Add Vouchers", starred: false },
      { id: "hsv-3", title: "Print Vouchers", starred: false },
      { id: "hsv-4", title: "Unused Vouchers", starred: false },
      { id: "hsv-5", title: "Used Vouchers", starred: false },
      { id: "hsv-6", title: "Voucher Customers", starred: false },
      { id: "hsv-7", title: "Voucher Agents", starred: false }
    ]},
    { id: "hsb", title: "Hotspot Binding", badge: "New", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`, children: [
      { id: "hsb-1", title: "All Bindings", starred: false },
      { id: "hsb-2", title: "Active Bindings", starred: false },
      { id: "hsb-3", title: "Expired Bindings", starred: false },
      { id: "hsb-4", title: "Bind a User/Device", starred: false },
      { id: "hsb-5", title: "Create Binding Speeds", starred: false },
      { id: "hsb-6", title: "Troubleshoot TV Binding", badge: "New", starred: false }
    ]},
    { id: "pkg", title: "Packages/Plans", icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>`, children: [
      { id: "pkg-1", title: "Hotspot Plans", starred: false },
      { id: "pkg-2", title: "PPPOE Plans", starred: false },
      { id: "pkg-3", title: "Static ip plans", starred: false },
      { id: "pkg-4", title: "Bandwidth Plans", starred: true },
      { id: "pkg-5", title: "Advanced Bandwidth", starred: false },
      { id: "pkg-6", title: "Quality of Service", starred: false },
      { id: "pkg-7", title: "Hotspot Trials", starred: false },
      { id: "pkg-8", title: "FUP", starred: false },
      { id: "pkg-9", title: "Schedule Plans", starred: false },
      { id: "pkg-10", title: "TV Plans", starred: true }
    ]},
    { id: "tx", title: "Transactions", icon: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`, children: [
      { id: "tx-1", title: "Daily Transactions", starred: false },
      { id: "tx-2", title: "Period Transactions", starred: false },
      { id: "tx-3", title: "Activation History", starred: true },
      { id: "tx-4", title: "Comparisons/Graphs", starred: false },
      { id: "tx-5", title: "Income Overview", starred: false },
      { id: "tx-6", title: "STK Push Result", starred: false }
    ]},
    { id: "ticket", title: "Support Ticket", icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>` },
    { id: "notif", title: "Notifications", icon: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>`, children: [
      { id: "not-1", title: "Single User", starred: false },
      { id: "not-2", title: "Bulk Send", starred: false },
      { id: "not-3", title: "Plan Specific", starred: false },
      { id: "not-4", title: "Router Specific", starred: false },
      { id: "not-5", title: "Schedule SMS", starred: false },
      { id: "not-6", title: "Sms Groups", starred: false },
      { id: "not-7", title: "SMS History", starred: false }
    ]},
    { id: "net", title: "Network", icon: `<path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>`, children: [
      { id: "net-1", title: "Self Install", starred: false },
      { id: "net-2", title: "Replace Router", starred: false },
      { id: "net-3", title: "Routers", starred: true },
      { id: "net-4", title: "IP Pool", starred: false },
      { id: "net-5", title: "Router Backups", starred: false },
      { id: "net-6", title: "Wireless Settings", starred: false },
      { id: "net-7", title: "Bridge", starred: false },
      { id: "net-8", title: "Ip Address", starred: false },
      { id: "net-9", title: "Files", starred: false },
      { id: "net-10", title: "Hotspot", starred: false },
      { id: "net-11", title: "ppp", starred: false },
      { id: "net-12", title: "Queues", starred: false },
      { id: "net-13", title: "Mikrotik users", starred: false },
      { id: "net-14", title: "CPU Load", starred: false },
      { id: "net-15", title: "MikroTik Monitor", starred: false },
      { id: "net-16", title: "Interface Monitor", starred: false },
      { id: "net-17", title: "Network Discovery", starred: false }
    ]},
    { id: "bulk", title: "Bulk Actions", icon: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`, children: [
      { id: "blk-1", title: "Mass Delete Users", starred: false },
      { id: "blk-2", title: "Bulk Edit Expiry Period", starred: false },
      { id: "blk-3", title: "Bulk Edit Plans", starred: false },
      { id: "blk-4", title: "Bulk Edit Routers", starred: false },
      { id: "blk-5", title: "Transfer Router", starred: false },
      { id: "blk-6", title: "Delete ALL Users", starred: false }
    ]},
    { id: "pages", title: "Static Pages", icon: `<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>`, children: [
      { id: "sp-1", title: "Order Voucher", starred: false },
      { id: "sp-2", title: "Voucher Template", starred: false },
      { id: "sp-3", title: "Announcement", starred: false },
      { id: "sp-4", title: "Registration Info", starred: false },
      { id: "sp-5", title: "Privacy Policy", starred: false },
      { id: "sp-6", title: "Terms and Conditions", starred: false }
    ]},
    { id: "tr069", title: "TR069 ACS", icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83"/>`, children: [
      { id: "tr-1", title: "Setup/Configs", starred: false },
      { id: "tr-2", title: "All Devices", starred: false },
      { id: "tr-3", title: "Online Devices", starred: false },
      { id: "tr-4", title: "Offline Devices", starred: false },
      { id: "tr-5", title: "Assigned Devices", starred: false },
      { id: "tr-6", title: "Unassigned Devices", starred: false }
    ]},
    { id: "aps", title: "Access Points", icon: `<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/>`, children: [
      { id: "ap-1", title: "List APs", starred: false },
      { id: "ap-2", title: "Router Chaining", starred: false },
      { id: "ap-3", title: "Add New", starred: false }
    ]},
    { id: "pppoe-r", title: "Access PPPoE Routers", icon: `<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>`, children: [
      { id: "ppr-1", title: "Setup", starred: false },
      { id: "ppr-2", title: "Devices", starred: false }
    ]},
    { id: "hs-ap", title: "Access Hotspot APs", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/>`, children: [
      { id: "hap-1", title: "Setup", starred: false },
      { id: "hap-2", title: "Add AP", starred: false },
      { id: "hap-3", title: "Access APs", starred: false }
    ]},
    { id: "settings", title: "Settings", icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82"/>`, children: [
      { id: "set-1", title: "General Settings", starred: false },
      { id: "set-2", title: "Localisation", starred: false },
      { id: "set-3", title: "Dashboard Theme", starred: false },
      { id: "set-4", title: "Auto Notifications / Reminders", starred: false },
      { id: "set-5", title: "Import PPPOE", starred: false },
      { id: "set-6", title: "Administrator Users", starred: false },
      { id: "set-7", title: "Payment Gateway", starred: true },
      { id: "set-withdraw", title: "Withdraw", isNested: true, children: [
        { id: "wdr-1", title: "Withdrawal", starred: false },
        { id: "wdr-2", title: "Withdrawal History", starred: false }
      ]},
      { id: "set-8", title: "Active Sessions", starred: false },
      { id: "set-9", title: "Audit & Cleanup", starred: false },
      { id: "set-10", title: "Clear Cache", starred: false }
    ]},
    { id: "pppoe-set", title: "PPPoE Settings", icon: `<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>`, children: [
      { id: "pps-1", title: "Setup", starred: true },
      { id: "pps-2", title: "Troubleshooting", starred: false }
    ]},
    { id: "hs-set", title: "Hotspot Settings", icon: `<path d="M5 12.55a11 11 0 0 1 14.08 0"/>` },
    { id: "pg-bld", title: "Page Builder", icon: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>` },
    { id: "loyalty", title: "Loyalty Points", icon: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`, children: [
      { id: "loy-1", title: "Setup", starred: false },
      { id: "loy-2", title: "Activity Report", starred: false },
      { id: "loy-3", title: "Redeemed Points", starred: false }
    ]},
    { id: "extras", title: "Extras", icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/>`, children: [
      { id: "ext-1", title: "Install App", starred: false },
      { id: "ext-sms", title: "SMS and Whatsapp", isNested: true, children: [
        { id: "sms-1", title: "Setup", starred: false },
        { id: "sms-2", title: "SMS and Whatsapp", starred: false }
      ]},
      { id: "ext-2", title: "Tutorials", starred: false },
      { id: "ext-3", title: "Human Resource", starred: false },
      { id: "ext-4", title: "Tax", starred: false }
    ]},
    { id: "inv", title: "Inventory & Expenses", icon: `<rect x="2" y="7" width="20" height="14" rx="2"/>`, children: [
      { id: "inv-1", title: "Dashboard", starred: false },
      { id: "inv-2", title: "POS Terminal", starred: false },
      { id: "inv-3", title: "Sales History", starred: false },
      { id: "inv-4", title: "Daily Sales (Z-Report)", starred: false },
      { id: "inv-5", title: "Cash Drawer", starred: false },
      { id: "inv-6", title: "Quotes", starred: false },
      { id: "inv-7", title: "Items", starred: false },
      { id: "inv-8", title: "Categories", starred: false },
      { id: "inv-9", title: "Stock In/Out", starred: false },
      { id: "inv-10", title: "Stock History", starred: false },
      { id: "inv-11", title: "Low Stock Alerts", starred: false },
      { id: "inv-12", title: "Suppliers", starred: false },
      { id: "inv-13", title: "Purchase Orders", starred: false },
      { id: "inv-14", title: "Expenses", starred: false },
      { id: "inv-15", title: "Expense Categories", starred: false },
      { id: "inv-16", title: "Recurring Expenses", starred: false },
      { id: "inv-17", title: "Budgets", starred: false },
      { id: "inv-18", title: "Assets", starred: false },
      { id: "inv-19", title: "Stock Transfer", starred: false },
      { id: "inv-20", title: "Stock Adjustment", starred: false },
      { id: "inv-21", title: "Reports", starred: false }
    ]},
    { id: "uisp", title: "Uisp", icon: `<path d="M11 5L6 9H2v6h4l5 4V5z"/>`, children: [
      { id: "uisp-1", title: "Uisp Signup", starred: false }
    ]},
    { id: "logs", title: "Logs", icon: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`, children: [
      { id: "log-1", title: "FreeIspRadius", starred: false },
      { id: "log-2", title: "Mikrotik Logs", starred: false }
    ]},
    { id: "escalate", title: "Escalate", icon: `<path d="M11 5L6 9H2v6h4l5 4V5z"/>` },
    { id: "social", title: "Social Spot/Support", icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>` },
    { id: "fix-hs", title: "Fix Hotspot", icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, children: [
      { id: "fhs-1", title: "Troubleshooting", starred: false },
      { id: "fhs-2", title: "Connected Without Internet", starred: false },
      { id: "fhs-3", title: "Trojans / Tunneling", starred: false },
      { id: "fhs-4", title: "Sync Users", starred: false },
      { id: "fhs-5", title: "DNS Not Resolving", starred: false },
      { id: "fhs-6", title: "Primary & Proxy Unreachable", starred: false },
      { id: "fhs-7", title: "Cache Full", starred: false },
      { id: "fhs-8", title: "DHCP Lease Failure", starred: false },
      { id: "fhs-9", title: "Obtaining IP", starred: false },
      { id: "fhs-10", title: "Couldn't Get IP", starred: false },
      { id: "fhs-11", title: "Hotspot Pool Empty", starred: false }
    ]},
    { id: "fix-ppp", title: "Fix PPPoE", icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`, children: [
      { id: "fpp-1", title: "No Response From Server", starred: false },
      { id: "fpp-2", title: "Invalid Username or Password", starred: false },
      { id: "fpp-3", title: "Stuck on Checking Username", starred: false },
      { id: "fpp-4", title: "Dial-up Connected, No Internet", starred: false }
    ]},
    { id: "bin", title: "Recycle Bin", icon: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, children: [
      { id: "bin-1", title: "Deleted Items", starred: false }
    ]}
  ];

  // Helper function to find subitem by ID
  function findSubItem(itemId) {
    for (const cat of sidebarItemsData) {
      if (!cat.children) continue;
      for (const child of cat.children) {
        if (child.isNested && child.children) {
          const nestedMatch = child.children.find(nc => nc.id === itemId);
          if (nestedMatch) return nestedMatch;
        } else if (child.id === itemId) {
          return child;
        }
      }
    }
    return null;
  }

  // --- 3. DYNAMIC RENDERER ---
  function renderSidebar() {
    let sidebarHTML = `
      <div class="sidebar-search-box">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="sidebar-menu-search" placeholder="Search menu..." />
      </div>
      <ul class="sidebar-menu" id="sidebar-menu-list">
    `;

    sidebarItemsData.forEach((item, idx) => {
      const hasChildren = item.children && item.children.length > 0;

      sidebarHTML += `
        <li class="sidebar-item" data-item-id="${item.id}">
          <a href="#" class="sidebar-link ${idx === 0 ? 'active' : ''}" data-has-dropdown="${hasChildren}">
            <div class="sidebar-link-left">
              <svg class="sidebar-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                ${item.icon}
              </svg>
              <span class="sidebar-title">${item.title}</span>
            </div>
            <div class="sidebar-link-right">
              ${item.badge ? `<span class="badge-green">${item.badge}</span>` : ''}
              ${hasChildren || item.isFavoritesMenu ? `<span class="sidebar-arrow">&lt;</span>` : ''}
            </div>
          </a>
      `;

      // Favorites Dynamic Submenu
      if (item.isFavoritesMenu) {
        sidebarHTML += `<ul class="sidebar-submenu" id="favorites-submenu-list"></ul>`;
      } 
      // Regular Submenu
      else if (hasChildren) {
        sidebarHTML += `<ul class="sidebar-submenu">`;
        
        item.children.forEach(child => {
          if (child.isNested) {
            sidebarHTML += `
              <li class="sidebar-nested-item">
                <a href="#" class="sidebar-nested-link">
                  <span>${child.title}</span>
                  <span class="nested-arrow">&lt;</span>
                </a>
                <ul class="sidebar-nested-submenu">
            `;
            child.children.forEach(nChild => {
              sidebarHTML += `
                <li>
                  <div class="submenu-item-row">
                    <a href="#">${nChild.title}</a>
                    <button class="star-btn ${nChild.starred ? 'active' : ''}" data-id="${nChild.id}" aria-label="Favorite">
                      <svg viewBox="0 0 24 24" width="14" height="14">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  </div>
                </li>
              `;
            });
            sidebarHTML += `</ul></li>`;
          } else {
            sidebarHTML += `
              <li>
                <div class="submenu-item-row">
                  <a href="#">
                    ${child.title}
                    ${child.badge ? `<span class="badge-green inline-badge">${child.badge}</span>` : ''}
                  </a>
                  <button class="star-btn ${child.starred ? 'active' : ''}" data-id="${child.id}" aria-label="Favorite">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                </div>
              </li>
            `;
          }
        });

        sidebarHTML += `</ul>`;
      }

      sidebarHTML += `</li>`;
    });

    sidebarHTML += `</ul>`;
    sidebarNavTarget.innerHTML = sidebarHTML;

    // Attach Event Listeners
    attachNavigationListeners();
    renderFavoritesList();
  }

  // --- 4. FAVORITES RENDER & UPDATER ---
  function renderFavoritesList() {
    const favSubmenu = document.getElementById('favorites-submenu-list');
    if (!favSubmenu) return;

    // Gather all starred items
    const starredItems = [];
    sidebarItemsData.forEach(cat => {
      if (!cat.children) return;
      cat.children.forEach(child => {
        if (child.isNested && child.children) {
          child.children.forEach(nc => {
            if (nc.starred) starredItems.push(nc);
          });
        } else if (child.starred) {
          starredItems.push(child);
        }
      });
    });

    if (starredItems.length === 0) {
      favSubmenu.innerHTML = `<li class="empty-favs">No favorites added yet</li>`;
      return;
    }

    let favHTML = '';
    starredItems.forEach(item => {
      favHTML += `
        <li>
          <div class="submenu-item-row">
            <a href="#">${item.title}</a>
            <button class="fav-remove-btn" data-id="${item.id}" title="Remove from favorites">&times;</button>
          </div>
        </li>
      `;
    });

    favSubmenu.innerHTML = favHTML;

    // Event listener for remove buttons inside Favorites
    favSubmenu.querySelectorAll('.fav-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const targetItem = findSubItem(id);
        if (targetItem) {
          targetItem.starred = false;
          // Update corresponding star icon state in DOM
          const starIcon = document.querySelector(`.star-btn[data-id="${id}"]`);
          if (starIcon) starIcon.classList.remove('active');
          renderFavoritesList();
        }
      });
    });
  }

  // --- 5. EVENT LISTENERS ---
  function attachNavigationListeners() {
    // 1st Level Dropdowns
    const topLinks = document.querySelectorAll('.sidebar-link[data-has-dropdown="true"], .sidebar-item[data-item-id="favs"] > .sidebar-link');
    topLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const parentLi = link.closest('.sidebar-item');
        parentLi.classList.toggle('expanded');
      });
    });

    // Nested 2nd Level Dropdowns (e.g. Withdraw & SMS/Whatsapp)
    const nestedLinks = document.querySelectorAll('.sidebar-nested-link');
    nestedLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = link.closest('.sidebar-nested-item');
        parentLi.classList.toggle('expanded');
      });
    });

    // Star Click Handling
    const starBtns = document.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = findSubItem(id);
        if (item) {
          item.starred = !item.starred;
          btn.classList.toggle('active', item.starred);
          renderFavoritesList();
        }
      });
    });

    // Live Search Filter Logic
    const searchInput = document.getElementById('sidebar-menu-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const menuItems = document.querySelectorAll('#sidebar-menu-list > .sidebar-item');

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
  }

  // Toggle Sidebar Collapse
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      alert('You have 3 unread notifications.');
    });
  }

  // Initial Render Call
  renderSidebar();
});

