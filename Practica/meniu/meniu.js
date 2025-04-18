// Wait for the menu elements to be loaded
function initializeMenu() {
  const sidebar = document.querySelector('#sidebar');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('#close-btn');

  if (!sidebar || !overlay || !closeBtn) {
    console.error('Menu elements not found, retrying in 100ms...');
    setTimeout(initializeMenu, 100);
    return;
  }

  // Close menu function
  function closeMenu() {
    window.menuState.close();
  }

  // Event listeners
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Handle menu state changes
  document.addEventListener('menuStateChange', (event) => {
    const isOpen = event.detail.isOpen;
    sidebar.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    
    if (isOpen) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    } else {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
  });

  // Handle responsive behavior
  function handleResize() {
    if (window.innerWidth >= 1200) {
      // Desktop - sidebar always visible
      window.menuState.open();
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    } else {
      // Mobile - sidebar hidden by default
      window.menuState.close();
    }
  }

  // Initialize and set up resize listener
  handleResize();
  window.addEventListener('resize', handleResize);

  // Update active nav link when page changes
  function updateActiveNavLink(page) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('onclick').includes(page)) {
        link.classList.add('active');
      }
    });
  }

  // Initialize with current page if available
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop().replace('.html', '') || 'main';
  updateActiveNavLink(currentPage);
}

// Start initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
  initializeMenu();
}