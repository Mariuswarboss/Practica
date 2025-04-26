// Get base URL for component loading
function getBasePath() {
    const currentPath = window.location.pathname;
    // If we're in a subdirectory, we need to go up one level
    if (currentPath.includes('/Main_conten/') || currentPath.includes('/profil/')) {
        return '..';
    }
    return '.';
}

// Theme Management
const ThemeManager = {
    // Default settings
    defaults: {
        theme: 'light',
        accentColor: '#4070f4',
        fontSize: 'medium',
        fontSizes: {
            small: '14px',
            medium: '16px',
            large: '18px'
        }
    },

    // Get current settings
    getSettings() {
        return {
            ...this.defaults,
            ...JSON.parse(localStorage.getItem('siteSettings') || '{}')
        };
    },

    // Apply settings to current page
    applySettings(settings = null) {
        const currentSettings = settings || this.getSettings();

        // Apply theme
        document.documentElement.setAttribute('data-theme', currentSettings.theme);
        document.body.setAttribute('data-theme', currentSettings.theme);

        // Apply accent color
        document.documentElement.style.setProperty('--clr-primary', currentSettings.accentColor);
        document.documentElement.style.setProperty(
            '--clr-primary-variant',
            this.adjustColor(currentSettings.accentColor, -20)
        );
        document.documentElement.style.setProperty(
            '--clr-primary-light',
            this.adjustColor(currentSettings.accentColor, 40)
        );

        // Apply font size
        document.documentElement.style.fontSize = this.defaults.fontSizes[currentSettings.fontSize];
    },

    // Helper function to adjust color brightness
    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => 
            ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        );
    },

    // Initialize theme management
    init() {
        this.applySettings();
        this.setupStorageListener();
    },

    // Listen for settings changes
    setupStorageListener() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'siteSettings') {
                this.applySettings(JSON.parse(event.newValue));
            }
        });

        // Listen for settings changed event
        document.addEventListener('settingsChanged', (event) => {
            this.applySettings(event.detail.settings);
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== "true") {
        window.location.href = getBasePath() + "/auth/login.html";
        return;
    }

    // Load components
    Promise.all([
        fetch(getBasePath() + '/navbar/navbar.html').then(res => res.text()),
        fetch(getBasePath() + '/footer/footer.html').then(res => res.text())
    ]).then(([navbarHtml, footerHtml]) => {
        // Insert components
        document.getElementById('navbar-container').innerHTML = navbarHtml;
        document.getElementById('footer-container').innerHTML = footerHtml;

        // Initialize theme manager
        ThemeManager.init();
    }).catch(err => {
        console.error("Failed to load components:", err);
    });
}); 