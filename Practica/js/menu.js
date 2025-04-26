class DynamicMenu {
    constructor() {
        this.init();
    }

    init() {
        this.createMenuElements();
        this.setupMenuToggle();
    }

    createMenuElements() {
        // Create menu container
        this.menuContainer = document.createElement('div');
        this.menuContainer.className = 'dynamic-menu';
        
        // Create menu content
        this.menuContainer.innerHTML = `
            <ul class="menu-list">
                <li class="menu-item">
                    <a href="../Main_conten/Home.html" class="menu-link">
                        <i class='bx bx-home'></i>
                        <span>Home</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../Main_conten/my_game.html" class="menu-link">
                        <i class='bx bx-game'></i>
                        <span>My Games</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../Main_conten/Collections.html" class="menu-link">
                        <i class='bx bx-collection'></i>
                        <span>Collections</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../Main_conten/reviews.html" class="menu-link">
                        <i class='bx bx-star'></i>
                        <span>Reviews</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../Main_conten/Notifications.html" class="menu-link">
                        <i class='bx bx-bell'></i>
                        <span>Notifications</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../profil/profil.html" class="menu-link">
                        <i class='bx bx-user'></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="../Main_conten/Settings.html" class="menu-link">
                        <i class='bx bx-cog'></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        `;

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'menu-overlay';

        // Add to document
        document.body.appendChild(this.menuContainer);
        document.body.appendChild(this.overlay);

        // Add click handlers
        this.overlay.addEventListener('click', () => this.closeMenu());
        this.menuContainer.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuContainer.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    setupMenuToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMenu());
        }
    }

    toggleMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.classList.toggle('active');
        }
        this.menuContainer.classList.toggle('active');
        this.overlay.classList.toggle('active');
        document.body.style.overflow = this.menuContainer.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        this.menuContainer.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicMenu();
});

// Menu functionality
function toggleMenu() {
    const menu = document.querySelector('.dynamic-menu');
    const overlay = document.querySelector('.menu-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    const mainContent = document.querySelector('.main-content');

    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Adjust main content margin
    if (window.innerWidth < 1200) {
        mainContent.style.marginLeft = menu.classList.contains('active') ? '250px' : '0';
    }
}

// Close menu when clicking overlay
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const menu = document.querySelector('.dynamic-menu');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth >= 1200) {
            mainContent.style.marginLeft = '0';
            menu.classList.remove('active');
            document.querySelector('.menu-overlay').classList.remove('active');
            document.getElementById('menu-toggle').classList.remove('active');
        }
    });

    // Set active menu item based on current page
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}); 