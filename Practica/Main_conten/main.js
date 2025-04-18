// Constants
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// DOM Elements Cache
const domCache = {
    body: document.body,
    themeToggle: document.querySelector('.theme-toggle')
};

// Theme Management
const ThemeManager = {
    currentTheme: localStorage.getItem('theme') || THEMES.LIGHT,

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.setupStorageListener();
    },

    applyTheme(theme) {
        domCache.body.classList.toggle('dark', theme === THEMES.DARK);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeToggle();
    },

    updateThemeToggle() {
        if (!domCache.themeToggle) return;
        
        const icon = domCache.themeToggle.querySelector('i');
        const text = domCache.themeToggle.querySelector('span');
        
        if (this.currentTheme === THEMES.DARK) {
            icon?.setAttribute('data-lucide', 'moon');
            text?.textContent = 'Dark';
        } else {
            icon?.setAttribute('data-lucide', 'sun');
            text?.textContent = 'Light';
        }
        lucide.createIcons();
    },

    setupThemeToggle() {
        domCache.themeToggle?.addEventListener('click', () => {
            const newTheme = this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
            this.applyTheme(newTheme);
            this.triggerThemeEvent();
            Utils.showToast(`Switched to ${newTheme} mode`);
        });
    },

    setupStorageListener() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme' || event.key === 'theme-event') {
                this.applyTheme(localStorage.getItem('theme') || THEMES.LIGHT);
            }
        });
    },

    triggerThemeEvent() {
        localStorage.setItem('theme-event', Date.now());
    }
};

// Utility Functions
const Utils = {
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        domCache.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }, 10);
    },

    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    createGameCard(game, showRemoveButton = false) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.id = game.id;
        
        const stars = Array.from({ length: 5 }, (_, i) => 
            `<i data-lucide="star" class="${i < Math.round(game.rating) ? 'filled' : ''}"></i>`
        ).join('');
        
        card.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}" loading="lazy">
                ${showRemoveButton ? '<button class="remove-btn"><i data-lucide="x"></i></button>' : ''}
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="rating-stars">
                    ${stars}
                    <span>(${game.rating.toFixed(1)})</span>
                </div>
            </div>
        `;
        
        return card;
    }
};

// Page Specific Modules
const PageModules = {
    home: {
        init() {
            const games = [
                {
                    id: 1,
                    title: "The Witcher 3",
                    genre: "RPG",
                    rating: 4.9,
                    image: "https://via.placeholder.com/300x200?text=The+Witcher+3"
                }
                // More game data...
            ];
            
            const featuredGamesContainer = document.querySelector('.game-grid');
            if (featuredGamesContainer) {
                games.slice(0, 3).forEach(game => {
                    featuredGamesContainer.appendChild(Utils.createGameCard(game));
                });
            }
        }
    },

    myGames: {
        init() {
            const searchInput = document.querySelector('.search-container input');
            const gameGrid = document.querySelector('.game-grid');
            const emptyState = document.querySelector('.empty-state');
            
            const myGames = [
                {
                    id: 1,
                    title: "The Witcher 3",
                    genre: "RPG",
                    rating: 4.9,
                    image: "https://via.placeholder.com/300x200?text=The+Witcher+3"
                }
                // More game data...
            ];
            
            // Initial render
            this.renderGames(myGames, gameGrid, emptyState);
            
            // Search with debounce
            searchInput?.addEventListener('input', Utils.debounce(() => {
                const query = searchInput.value.toLowerCase();
                const filteredGames = myGames.filter(game => 
                    game.title.toLowerCase().includes(query) || 
                    game.genre.toLowerCase().includes(query)
                );
                this.renderGames(filteredGames, gameGrid, emptyState);
            }, 300));
            
            // Remove game
            gameGrid?.addEventListener('click', (e) => {
                if (e.target.closest('.remove-btn')) {
                    e.target.closest('.game-card').remove();
                    Utils.showToast('Game removed from your library');
                    if (gameGrid.children.length === 0) {
                        emptyState.style.display = 'block';
                    }
                }
            });
        },
        
        renderGames(games, container, emptyState) {
            container.innerHTML = '';
            if (games.length > 0) {
                games.forEach(game => container.appendChild(Utils.createGameCard(game, true)));
                emptyState.style.display = 'none';
            } else {
                emptyState.style.display = 'block';
            }
        }
    },

    reviews: {
        init() {
            const searchForm = document.querySelector('.search-form');
            const reviewSitesContainer = document.querySelector('.review-sites');
            const emptyState = document.querySelector('.empty-state');
            
            const reviewSites = [
                {
                    name: "Metacritic",
                    logo: "https://via.placeholder.com/100?text=Metacritic",
                    searchUrl: "https://www.metacritic.com/search/all/{query}/results"
                }
                // More review site data...
            ];
            
            searchForm?.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchForm.querySelector('input').value.trim();
                
                if (query) {
                    reviewSitesContainer.innerHTML = reviewSites.map(site => `
                        <div class="review-site-card">
                            <div class="site-logo">
                                <img src="${site.logo}" alt="${site.name}" loading="lazy">
                            </div>
                            <h3>${site.name}</h3>
                            <p>View ${query} reviews on ${site.name}</p>
                            <a href="${site.searchUrl.replace('{query}', encodeURIComponent(query))}" 
                               target="_blank" class="site-link">
                                Visit site <i data-lucide="external-link"></i>
                            </a>
                        </div>
                    `).join('');
                    
                    emptyState.style.display = 'none';
                    reviewSitesContainer.style.display = 'grid';
                    lucide.createIcons();
                }
            });
        }
    },

    settings: {
        init() {
            const saveBtn = document.querySelector('.save-btn');
            saveBtn?.addEventListener('click', () => {
                Utils.showToast('Settings saved successfully');
            });
        }
    },

    modal: {
        init() {
            const modal = document.getElementById('addGameModal');
            if (!modal) return;
            
            const showModal = () => {
                modal.style.display = 'flex';
                domCache.body.style.overflow = 'hidden';
            };
            
            const hideModal = () => {
                modal.style.display = 'none';
                domCache.body.style.overflow = 'auto';
            };
            
            // Event listeners
            document.getElementById('addGameBtn')?.addEventListener('click', showModal);
            document.getElementById('addGameBtnEmpty')?.addEventListener('click', showModal);
            document.getElementById('closeModalBtn')?.addEventListener('click', hideModal);
            
            modal.addEventListener('click', (e) => e.target === modal && hideModal());
            
            // Star rating
            const stars = document.querySelectorAll('.star');
            const ratingInput = document.getElementById('gameRating');
            
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const value = parseInt(star.getAttribute('data-value'));
                    ratingInput.value = value;
                    stars.forEach((s, i) => s.classList.toggle('active', i < value));
                });
            });
            
            document.getElementById('addGameForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const title = document.getElementById('gameTitle').value;
                const genre = document.getElementById('gameGenre').value;
                const imageUrl = document.getElementById('gameImage').value || 
                    `https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}`;
                const rating = parseInt(ratingInput.value) || 0;
                const gameGrid = document.querySelector('.game-grid');
                const emptyState = document.querySelector('.empty-state');
                
                const gameCard = Utils.createGameCard({
                    id: Date.now(),
                    title,
                    genre,
                    rating,
                    image: imageUrl
                }, true);
                
                gameGrid.appendChild(gameCard);
                lucide.createIcons();
                emptyState.style.display = 'none';
                
                e.target.reset();
                ratingInput.value = 0;
                stars.forEach(star => star.classList.remove('active'));
                hideModal();
            });
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    ThemeManager.init();
    
    if (document.querySelector('.game-grid')) PageModules.home.init();
    if (document.querySelector('.my-games-page')) PageModules.myGames.init();
    if (document.querySelector('.review-container')) PageModules.reviews.init();
    if (document.querySelector('.settings-container')) PageModules.settings.init();
    if (document.getElementById('addGameModal')) PageModules.modal.init();
});