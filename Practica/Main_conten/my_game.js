document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addGameBtn = document.getElementById('addGameBtn');
    const addGameBtnEmpty = document.getElementById('addGameBtnEmpty');
    const modal = document.getElementById('addGameModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const addGameForm = document.getElementById('addGameForm');
    const gameGrid = document.getElementById('gameGrid');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchGameInput');
    const imageInput = document.getElementById('gameImage');
    const imagePreview = document.getElementById('imagePreview');
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('gameRating');

    // Initialize games from localStorage
    let games = JSON.parse(localStorage.getItem('games')) || [];
    updateGameDisplay();

    // Event Listeners
    addGameBtn.addEventListener('click', openModal);
    addGameBtnEmpty.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    searchInput.addEventListener('input', handleSearch);

    // Handle image preview
    imageInput.addEventListener('input', function() {
        const url = this.value;
        if (url) {
            imagePreview.style.backgroundImage = `url(${url})`;
            imagePreview.innerHTML = '';
        } else {
            imagePreview.style.backgroundImage = 'none';
            imagePreview.innerHTML = 'Image preview will appear here';
        }
    });

    // Handle star rating
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInput.value = value;
            updateStars(value);
        });
    });

    // Form submission
    addGameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newGame = {
            id: Date.now(),
            title: document.getElementById('gameTitle').value,
            genre: document.getElementById('gameGenre').value,
            platform: document.getElementById('gamePlatform').value,
            image: document.getElementById('gameImage').value || 'https://via.placeholder.com/300x200?text=Game+Cover',
            status: document.getElementById('gameStatus').value,
            progress: document.getElementById('gameProgress').value || 0,
            rating: parseInt(document.getElementById('gameRating').value) || 0,
            notes: document.getElementById('gameNotes').value,
            addedDate: new Date().toISOString()
        };

        games.push(newGame);
        localStorage.setItem('games', JSON.stringify(games));
        updateGameDisplay();
        closeModal();
        showSuccessMessage('Game added successfully!');
        addGameForm.reset();
        imagePreview.style.backgroundImage = 'none';
        imagePreview.innerHTML = 'Image preview will appear here';
        updateStars(0);
    });

    // Functions
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        addGameForm.reset();
        imagePreview.style.backgroundImage = 'none';
        imagePreview.innerHTML = 'Image preview will appear here';
        updateStars(0);
    }

    function updateStars(value) {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < value);
        });
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        updateGameDisplay(searchTerm);
    }

    function updateGameDisplay(searchTerm = '') {
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.genre.toLowerCase().includes(searchTerm) ||
            game.platform.toLowerCase().includes(searchTerm)
        );

        if (filteredGames.length === 0) {
            gameGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            gameGrid.style.display = 'grid';
            emptyState.style.display = 'none';
            
            gameGrid.innerHTML = filteredGames.map(game => `
                <div class="game-card" data-id="${game.id}">
                    <div class="game-card-image" style="background-image: url('${game.image}')">
                        <div class="game-card-overlay">
                            <span class="game-status ${game.status.toLowerCase().replace(' ', '-')}">${game.status}</span>
                            <div class="game-progress">
                                <div class="progress-bar" style="width: ${game.progress}%"></div>
                                <span>${game.progress}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="game-card-content">
                        <h3>${game.title}</h3>
                        <div class="game-card-info">
                            <span class="game-genre">${game.genre}</span>
                            <span class="game-platform">${game.platform}</span>
                        </div>
                        <div class="game-card-rating">
                            ${generateStars(game.rating)}
                        </div>
                        ${game.notes ? `<p class="game-notes">${game.notes}</p>` : ''}
                        <div class="game-card-actions">
                            <button class="btn-icon edit-game" onclick="editGame(${game.id})">
                                <i class='bx bx-edit'></i>
                            </button>
                            <button class="btn-icon delete-game" onclick="deleteGame(${game.id})">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    function generateStars(rating) {
        return Array.from({ length: 5 }, (_, i) => `
            <i class='bx ${i < rating ? 'bxs-star' : 'bx-star'}'></i>
        `).join('');
    }

    function showSuccessMessage(message) {
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
});

// Global functions for edit and delete
window.editGame = function(gameId) {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Populate form with game data
    document.getElementById('gameTitle').value = game.title;
    document.getElementById('gameGenre').value = game.genre;
    document.getElementById('gamePlatform').value = game.platform;
    document.getElementById('gameImage').value = game.image;
    document.getElementById('gameStatus').value = game.status;
    document.getElementById('gameProgress').value = game.progress;
    document.getElementById('gameRating').value = game.rating;
    document.getElementById('gameNotes').value = game.notes;

    // Update image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.style.backgroundImage = `url(${game.image})`;
    imagePreview.innerHTML = '';

    // Update stars
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < game.rating);
    });

    // Show modal
    const modal = document.getElementById('addGameModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Update form submission to handle edit
    const form = document.getElementById('addGameForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const updatedGame = {
            ...game,
            title: document.getElementById('gameTitle').value,
            genre: document.getElementById('gameGenre').value,
            platform: document.getElementById('gamePlatform').value,
            image: document.getElementById('gameImage').value || game.image,
            status: document.getElementById('gameStatus').value,
            progress: document.getElementById('gameProgress').value || 0,
            rating: parseInt(document.getElementById('gameRating').value) || 0,
            notes: document.getElementById('gameNotes').value,
            updatedDate: new Date().toISOString()
        };

        const gameIndex = games.findIndex(g => g.id === gameId);
        games[gameIndex] = updatedGame;
        localStorage.setItem('games', JSON.stringify(games));
        
        location.reload();
    };
};

window.deleteGame = function(gameId) {
    if (confirm('Are you sure you want to delete this game?')) {
        let games = JSON.parse(localStorage.getItem('games')) || [];
        games = games.filter(game => game.id !== gameId);
        localStorage.setItem('games', JSON.stringify(games));
        location.reload();
    }
};