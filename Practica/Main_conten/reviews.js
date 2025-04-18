class ReviewsManager {
    constructor() {
        this.searchInput = document.getElementById('game-search');
        this.searchBtn = document.getElementById('search-btn');
        this.gameInfo = document.getElementById('game-info');
        this.initialState = document.getElementById('initial-state');
        this.loadingState = document.getElementById('loading-state');
        this.reviewList = document.getElementById('review-list');
        
        // Review sources configuration
        this.reviewSources = [
            {
                name: 'Metacritic',
                icon: 'https://www.metacritic.com/favicon.ico',
                baseUrl: 'https://www.metacritic.com/game/',
                searchUrl: 'https://www.metacritic.com/search/game/'
            },
            {
                name: 'IGN',
                icon: 'https://www.ign.com/favicon.ico',
                baseUrl: 'https://www.ign.com/games/',
                searchUrl: 'https://www.ign.com/search?q='
            },
            {
                name: 'GameSpot',
                icon: 'https://www.gamespot.com/favicon.ico',
                baseUrl: 'https://www.gamespot.com/games/',
                searchUrl: 'https://www.gamespot.com/search/?q='
            },
            {
                name: 'Steam',
                icon: 'https://store.steampowered.com/favicon.ico',
                baseUrl: 'https://store.steampowered.com/app/',
                searchUrl: 'https://store.steampowered.com/search/?term='
            }
        ];

        this.init();
    }

    init() {
        // Event listeners
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        this.showLoading();

        try {
            // In a real implementation, this would be an API call
            const gameData = await this.mockSearchGame(query);
            this.displayGameInfo(gameData);
            const reviews = await this.mockFetchReviews(gameData.id);
            this.displayReviews(reviews);
        } catch (error) {
            console.error('Error fetching game data:', error);
            this.showError('Failed to fetch game information. Please try again.');
        }

        this.hideLoading();
    }

    showLoading() {
        this.initialState.classList.add('hidden');
        this.gameInfo.classList.add('hidden');
        this.loadingState.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingState.classList.add('hidden');
    }

    displayGameInfo(game) {
        document.getElementById('game-image').src = game.image;
        document.getElementById('game-title').textContent = game.title;
        document.getElementById('game-description').textContent = game.description;
        document.getElementById('release-date').textContent = `Released: ${game.releaseDate}`;
        document.getElementById('developer').textContent = `Developer: ${game.developer}`;

        this.gameInfo.classList.remove('hidden');
    }

    displayReviews(reviews) {
        this.reviewList.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="source-header">
                    <img src="${review.source.icon}" alt="${review.source.name}">
                    <h4>${review.source.name}</h4>
                </div>
                <div class="review-score">${review.score}</div>
                <p class="review-excerpt">${review.excerpt}</p>
                <a href="${review.url}" class="review-link" target="_blank" rel="noopener noreferrer">
                    Read full review <i data-lucide="external-link"></i>
                </a>
            </div>
        `).join('');

        // Refresh Lucide icons
        lucide.createIcons();
    }

    showError(message) {
        // Implementation for error handling
        console.error(message);
    }

    // Mock data functions - replace with real API calls
    async mockSearchGame(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            id: '12345',
            title: query,
            image: 'https://via.placeholder.com/200x300',
            description: 'This is a sample game description. In a real implementation, this would be fetched from a game database API.',
            releaseDate: 'January 1, 2024',
            developer: 'Sample Studio'
        };
    }

    async mockFetchReviews(gameId) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return this.reviewSources.map(source => ({
            source: source,
            score: '8.5/10',
            excerpt: 'This is a sample review excerpt. In a real implementation, this would be fetched from various review sources.',
            url: source.searchUrl + this.searchInput.value.replace(/\s+/g, '+')
        }));
    }
}

// Initialize the reviews manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsManager();
}); 