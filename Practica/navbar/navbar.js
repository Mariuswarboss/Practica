// Get base path for navigation
function getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/Main_conten/') || currentPath.includes('/profil/')) {
        return '..';
    }
    return '.';
}

// Handle logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = getBasePath() + "/auth/login.html";
}

// Make logout function available globally
window.logout = logout;

// Menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuContainer = document.querySelector('.dynamic-menu');
    const overlay = document.querySelector('.menu-overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            if (menuContainer) {
                menuContainer.classList.toggle('active');
            }
            if (overlay) {
                overlay.classList.toggle('active');
            }
            // Toggle body scroll
            document.body.style.overflow = menuContainer?.classList.contains('active') ? 'hidden' : '';
        });
    }
});