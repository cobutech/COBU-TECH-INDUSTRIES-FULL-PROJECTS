document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const notificationBtn = document.getElementById('notification-btn');

  // Toggle Sidebar panel open / closed
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Notification click action
  notificationBtn.addEventListener('click', () => {
    alert('You have 3 unread notifications.');
  });
});
