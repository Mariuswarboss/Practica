// DOM Elements
const totalGamesElement = document.getElementById('total-games');
const completedGamesElement = document.getElementById('completed-games');
const playingGamesElement = document.getElementById('playing-games');
const recentGamesGrid = document.querySelector('.recent-games-grid');
const addGameBtn = document.querySelector('.action-btn.primary');
const browseLibraryBtn = document.querySelector('.action-btn.secondary');

// Theme Management
const ThemeManager = {
    currentTheme: localStorage.getItem('theme') || 'light',

    init() {
        this.applyTheme(this.currentTheme);
        this.setupStorageListener();
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    setupStorageListener() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme') {
                this.applyTheme(event.newValue || 'light');
            }
        });
    }
};

// Game Stats Management
const StatsManager = {
    stats: {
        totalHours: 0,
        gamesCompleted: 0,
        totalGames: 0
    },

    init() {
        this.loadStats();
        this.updateStatsDisplay();
    },

    loadStats() {
        // Load stats from localStorage
        const games = JSON.parse(localStorage.getItem('games')) || [];
        this.stats.totalGames = games.length;
        this.stats.gamesCompleted = games.filter(game => game.status === 'completed').length;
        this.stats.totalHours = games.reduce((total, game) => total + (game.hoursPlayed || 0), 0);
    },

    updateStatsDisplay() {
        document.querySelectorAll('.stat-card').forEach(card => {
            const statNumber = card.querySelector('.stat-number');
            const statType = card.querySelector('h3').textContent.toLowerCase();
            
            if (statType.includes('hours')) {
                statNumber.textContent = this.stats.totalHours;
            } else if (statType.includes('completed')) {
                statNumber.textContent = this.stats.gamesCompleted;
            } else if (statType.includes('collection')) {
                statNumber.textContent = this.stats.totalGames;
            }
        });
    }
};

// Recommendations Management
const RecommendationsManager = {
    init() {
        this.loadRecommendations();
    },

    loadRecommendations() {
        // Get user's games and preferences
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const preferences = JSON.parse(localStorage.getItem('preferences')) || {
            favoriteGenres: ['Action/RPG', 'RPG']
        };

        // Update recommendation tags based on user's games
        document.querySelectorAll('.game-card').forEach(card => {
            const tag = card.querySelector('.recommendation-tag');
            const genre = card.querySelector('.game-genre').textContent;
            
            if (preferences.favoriteGenres.includes(genre)) {
                tag.style.background = 'var(--clr-primary)';
            }
        });
    }
};

// Button Actions
const ButtonManager = {
    init() {
        this.setupButtonListeners();
    },

    setupButtonListeners() {
        // Add Game button
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'my_game.html';
            });
        });

        // Browse Reviews button
        document.querySelectorAll('.btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'reviews.html';
            });
        });
    }
};

// Load stats and recent games when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded');
    loadStats();
    loadRecentGames();
    setupEventListeners();

    // Initialize managers
    ThemeManager.init();
    StatsManager.init();
    RecommendationsManager.init();
    ButtonManager.init();

    // Initialize Lucide icons
    lucide.createIcons();

    // Update stats when games are modified
    window.addEventListener('storage', (e) => {
        if (e.key === 'games') {
            StatsManager.init();
            RecommendationsManager.init();
        }
    });
});

// Load game statistics
function loadStats() {
    console.log('Loading stats...');
    const games = JSON.parse(localStorage.getItem('games')) || [];
    
    const totalGames = games.length;
    const completedGames = games.filter(game => game.status === 'completed').length;
    const playingGames = games.filter(game => game.status === 'playing').length;

    totalGamesElement.textContent = totalGames;
    completedGamesElement.textContent = completedGames;
    playingGamesElement.textContent = playingGames;

    console.log(`Stats loaded: Total: ${totalGames}, Completed: ${completedGames}, Playing: ${playingGames}`);
}

// Load recent games
function loadRecentGames() {
    console.log('Loading recent games...');
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const recentGames = games.slice(-4); // Get last 4 games

    if (recentGames.length === 0) {
        showEmptyState();
        return;
    }

    recentGamesGrid.innerHTML = ''; // Clear existing content
    recentGames.forEach(game => {
        const gameCard = createGameCard(game);
        recentGamesGrid.appendChild(gameCard);
    });

    console.log(`Loaded ${recentGames.length} recent games`);
}

// Create a game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    const statusClass = game.status === 'completed' ? 'status-completed' : 
                       game.status === 'playing' ? 'status-playing' : 'status-backlog';

    card.innerHTML = `
        <div class="game-image">
            <img src="${game.imageUrl || 'assets/placeholder.png'}" alt="${game.title}">
            <span class="status-badge ${statusClass}">${game.status}</span>
        </div>
        <div class="game-info">
            <h3>${game.title}</h3>
            <div class="rating">
                ${createStarRating(game.rating)}
            </div>
        </div>
    `;

    return card;
}

// Create star rating HTML
function createStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Show empty state when no games are present
function showEmptyState() {
    recentGamesGrid.innerHTML = `
        <div class="empty-state">
            <p>No games in your library yet</p>
            <button class="action-btn primary" onclick="window.location.href='my_game.html'">
                Add Your First Game
            </button>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    addGameBtn.addEventListener('click', () => {
        console.log('Navigating to My Games page');
        window.location.href = 'my_game.html';
    });

    browseLibraryBtn.addEventListener('click', () => {
        console.log('Navigating to My Games page');
        window.location.href = 'my_game.html';
    });
} 