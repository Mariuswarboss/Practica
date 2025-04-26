// Global Settings Manager
const SettingsManager = {
    // Default settings
    defaults: {
        theme: 'light',
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

    // Save settings
    saveSettings(settings) {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        this.applySettings(settings);
        this.broadcastSettingsChange(settings);
    },

    // Apply settings to current page
    applySettings(settings) {
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        document.body.setAttribute('data-theme', settings.theme);

        // Apply font size
        document.documentElement.style.fontSize = this.defaults.fontSizes[settings.fontSize];
    },

    // Broadcast settings change to other pages
    broadcastSettingsChange(settings) {
        document.dispatchEvent(new CustomEvent('settingsChanged', { 
            detail: { settings }
        }));
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');
    const resetButton = document.getElementById('resetSettings');
    const saveButton = document.getElementById('saveSettings');

    // Get current settings or use defaults
    let currentSettings = JSON.parse(localStorage.getItem('siteSettings')) || {
        theme: 'light',
        fontSize: 'medium'
    };

    // Initialize UI with current settings
    function initializeUI() {
        // Theme toggle
        updateThemeToggleUI(currentSettings.theme);
        
        // Font size
        fontSizeButtons.forEach(btn => {
            btn.classList.toggle('active', 
                btn.dataset.size === currentSettings.fontSize);
        });

        // Apply current settings
        applySettings(currentSettings);
    }

    // Update theme toggle button UI
    function updateThemeToggleUI(theme) {
        const icon = themeToggleBtn.querySelector('i');
        const text = themeToggleBtn.querySelector('span');
        
        if (theme === 'dark') {
            icon.className = 'bx bx-moon';
            text.textContent = 'Dark';
        } else {
            icon.className = 'bx bx-sun';
            text.textContent = 'Light';
        }
    }

    // Apply settings to the page
    function applySettings(settings) {
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        document.body.setAttribute('data-theme', settings.theme);

        // Apply font size
        const fontSizes = {
            small: '14px',
            medium: '16px',
            large: '18px'
        };
        document.documentElement.style.fontSize = fontSizes[settings.fontSize];
    }

    // Show success message
    function showSuccessMessage(message) {
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class='bx bx-check'></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    }

    // Event Listeners
    themeToggleBtn.addEventListener('click', () => {
        currentSettings.theme = currentSettings.theme === 'light' ? 'dark' : 'light';
        updateThemeToggleUI(currentSettings.theme);
        applySettings(currentSettings);
        showSuccessMessage(`Theme changed to ${currentSettings.theme} mode`);
    });

    fontSizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            currentSettings.fontSize = size;
            
            fontSizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            applySettings(currentSettings);
            showSuccessMessage('Font size updated');
        });
    });

    resetButton.addEventListener('click', () => {
        if (confirm('Reset all settings to default?')) {
            currentSettings = {
                theme: 'light',
                fontSize: 'medium'
            };
            
            initializeUI();
            localStorage.setItem('siteSettings', JSON.stringify(currentSettings));
            showSuccessMessage('Settings reset to default');
        }
    });

    saveButton.addEventListener('click', () => {
        localStorage.setItem('siteSettings', JSON.stringify(currentSettings));
        showSuccessMessage('Settings saved successfully');
        
        // Broadcast settings change event
        document.dispatchEvent(new CustomEvent('settingsChanged', { 
            detail: { settings: currentSettings }
        }));
    });

    // Initialize settings
    initializeUI();
}); 