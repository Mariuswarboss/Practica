// Global state management
window.menuState = {
    isOpen: false,
    toggle() {
        this.isOpen = !this.isOpen;
        document.body.classList.toggle('menu-open', this.isOpen);
        this.notify();
    },
    open() {
        this.isOpen = true;
        document.body.classList.add('menu-open');
        this.notify();
    },
    close() {
        this.isOpen = false;
        document.body.classList.remove('menu-open');
        this.notify();
    },
    notify() {
        document.dispatchEvent(new CustomEvent('menuStateChange', {
            detail: { isOpen: this.isOpen }
        }));
    }
};

// Page module initialization functions
const PageModules = {
    mygames: function() {
        // Initialize game form elements
        const modal = document.getElementById('gameModal');
        const addGameBtn = document.getElementById('addGameBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const gameForm = document.getElementById('gameForm');
        const searchInput = document.getElementById('searchInput');
        const ratingStars = document.querySelectorAll('#ratingStars i');
        const gameImage = document.getElementById('gameImage');
        
        if (modal && addGameBtn && closeModalBtn) {
            // Modal functionality
            addGameBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            cancelBtn?.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Star rating functionality
        if (ratingStars) {
            ratingStars.forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.getAttribute('data-rating'));
                    document.getElementById('ratingValue').textContent = `${rating}/5`;
                    ratingStars.forEach(s => {
                        s.classList.remove('bxs-star');
                        s.classList.add('bx-star');
                    });
                    for (let i = 0; i < rating; i++) {
                        ratingStars[i].classList.remove('bx-star');
                        ratingStars[i].classList.add('bxs-star');
                    }
                });
            });
        }

        // Image upload preview
        if (gameImage) {
            gameImage.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const preview = document.getElementById('imagePreview');
                        preview.innerHTML = `<img src="${e.target.result}" alt="Game cover preview">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Form submission
        if (gameForm) {
            gameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(gameForm);
                const gameData = {
                    id: Date.now(),
                    title: formData.get('gameTitle'),
                    genre: formData.get('gameGenre'),
                    platform: formData.get('gamePlatform'),
                    status: formData.get('gameStatus'),
                    progress: formData.get('gameProgress'),
                    rating: document.getElementById('ratingValue').textContent.split('/')[0],
                    notes: formData.get('gameNotes'),
                    image: document.getElementById('imagePreview').querySelector('img')?.src || ''
                };

                // Save to localStorage
                const games = JSON.parse(localStorage.getItem('games') || '[]');
                games.push(gameData);
                localStorage.setItem('games', JSON.stringify(games));

                // Close modal and show success message
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                showSuccessMessage('Game added successfully!');

                // Reset form
                gameForm.reset();
                document.getElementById('imagePreview').innerHTML = `
                    <i class='bx bx-image-add'></i>
                    <span>Click to upload image</span>
                `;
                document.getElementById('ratingValue').textContent = '0/5';
                ratingStars.forEach(s => {
                    s.classList.remove('bxs-star');
                    s.classList.add('bx-star');
                });

                // Reload games
                loadGames();
            });
        }

        // Load existing games
        loadGames();
    }
};

// Helper functions
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        const messageText = successMessage.querySelector('span');
        if (messageText) messageText.textContent = message;
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

function loadGames() {
    const gameGrid = document.getElementById('gameGrid');
    const emptyState = document.getElementById('emptyState');
    if (!gameGrid || !emptyState) return;

    const games = JSON.parse(localStorage.getItem('games') || '[]');
    
    if (games.length === 0) {
        gameGrid.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';
    gameGrid.innerHTML = games.map(game => `
        <div class="game-card" data-id="${game.id}">
            <div class="game-image">
                <img src="${game.image || 'https://via.placeholder.com/300x400?text=No+Image'}" alt="${game.title}">
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="game-status ${game.status}">${game.status}</div>
                <div class="game-progress">
                    <div class="progress-bar" style="width: ${game.progress}%"></div>
                    <span>${game.progress}%</span>
                </div>
                <div class="rating-stars">
                    ${generateStarRating(game.rating)}
                </div>
            </div>
        </div>
    `).join('');
}

function generateStarRating(rating) {
    return Array.from({ length: 5 }, (_, i) => 
        `<i class='bx ${i < rating ? 'bxs-star' : 'bx-star'}'></i>`
    ).join('');
}

// Component loading
async function loadComponent(containerId, htmlPath, jsPath = null) {
    const container = document.getElementById(`${containerId}-container`);
    if (!container) {
        console.error(`Container #${containerId}-container not found`);
        return;
    }

    try {
        // Load HTML
        const response = await fetch(htmlPath);
        const html = await response.text();
        container.innerHTML = html;

        // Load JS if provided
        if (jsPath) {
            // Check if script already exists
            const existingScript = document.querySelector(`script[src="${jsPath}"]`);
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = jsPath;
                script.async = true;
                document.body.appendChild(script);
            }
        }
    } catch (error) {
        console.error(`Error loading component ${containerId}:`, error);
        container.innerHTML = '<div class="error">Error loading component</div>';
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
    // Load navbar and sidebar first
    await loadComponent("navbar", "/navbar/navbar.html", "/navbar/navbar.js");
    await loadComponent("sidebar", "/meniu/meniu.html", "/meniu/meniu.js");

    // Setup global menu button
    const globalMenuBtn = document.getElementById('global-menu-btn');
    if (globalMenuBtn) {
        globalMenuBtn.addEventListener('click', () => window.menuState.toggle());
    }

    // Setup overlay click handler
    const overlay = document.querySelector('.page-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => window.menuState.close());
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200 && window.menuState.isOpen) {
            window.menuState.close();
        }
    });

    // Initialize page specific modules based on current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().replace('.html', '') || 'main';
    
    if (PageModules[currentPage]) {
        PageModules[currentPage]();
    }
});

// Handle navigation
window.loadPage = function(page) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    fetch(`/Main_conten/${page}.html`)
        .then(res => res.text())
        .then(html => {
            mainContent.innerHTML = html;
            if (PageModules[page]) {
                PageModules[page]();
            }
        })
        .catch(err => {
            console.error('Error loading page:', err);
            mainContent.innerHTML = '<div class="error">Error loading page content</div>';
        });
}; 