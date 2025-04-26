// Default games data
const defaultGames = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
        status: "Completed",
        progress: 100,
        rating: 5,
        notes: "One of the best RPGs ever made. Amazing story and world."
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "Action RPG",
        platform: "PlayStation 5",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00DYkYz1UoWtM.png",
        status: "Playing",
        progress: 75,
        rating: 4,
        notes: "Fantastic atmosphere and engaging story."
    },
    {
        id: 3,
        title: "Elden Ring",
        genre: "Action RPG",
        platform: "PC",
        image: "image.png",
        status: "Playing",
        progress: 60,
        rating: 5,
        notes: "Challenging but incredibly rewarding."
    }
];

// Initialize games in localStorage if not present
if (!localStorage.getItem('games')) {
    localStorage.setItem('games', JSON.stringify(defaultGames));
}

document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.getElementById('gameGrid');
    const emptyState = document.getElementById('emptyState');
    const addGameModal = document.getElementById('addGameModal');
    const addGameForm = document.getElementById('addGameForm');
    const searchInput = document.getElementById('searchGameInput');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addGameBtn = document.getElementById('addGameBtn');
    const addGameBtnEmpty = document.getElementById('addGameBtnEmpty');

    // Load and display games
    function loadGames() {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        gameGrid.innerHTML = '';

        if (games.length === 0) {
            emptyState.style.display = 'flex';
            gameGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            gameGrid.style.display = 'grid';
            games.forEach(game => {
                gameGrid.appendChild(createGameCard(game));
            });
        }
    }

    // Create game card
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-card-image">
                <img src="${game.image}" alt="${game.title}">
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
                    ${createStarRating(game.rating)}
                </div>
                <p class="game-notes">${game.notes}</p>
                <div class="game-card-actions">
                    <button class="btn-icon edit-game" onclick="editGame(${game.id})">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-icon delete-game" onclick="deleteGame(${game.id})">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    // Create star rating
    function createStarRating(rating) {
        return Array(5).fill(0).map((_, i) => 
            `<i class='bx ${i < rating ? 'bxs-star' : 'bx-star'}'></i>`
        ).join('');
    }

    // Add new game
    addGameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const newGame = {
            id: Date.now(),
            title: document.getElementById('gameTitle').value,
            genre: document.getElementById('gameGenre').value,
            platform: document.getElementById('gamePlatform').value,
            image: document.getElementById('gameImage').value || 'https://via.placeholder.com/300x400?text=Game+Cover',
            status: document.getElementById('gameStatus').value,
            progress: parseInt(document.getElementById('gameProgress').value) || 0,
            rating: parseInt(document.getElementById('gameRating').value) || 0,
            notes: document.getElementById('gameNotes').value
        };

        games.push(newGame);
        localStorage.setItem('games', JSON.stringify(games));
        addGameModal.classList.remove('show');
        loadGames();
        addGameForm.reset();
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.genre.toLowerCase().includes(searchTerm) ||
            game.platform.toLowerCase().includes(searchTerm)
        );

        gameGrid.innerHTML = '';
        if (filteredGames.length === 0) {
            emptyState.style.display = 'flex';
            gameGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            gameGrid.style.display = 'grid';
            filteredGames.forEach(game => {
                gameGrid.appendChild(createGameCard(game));
            });
        }
    });

    // Modal controls
    [addGameBtn, addGameBtnEmpty].forEach(btn => {
        btn.addEventListener('click', () => {
            addGameModal.classList.add('show');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        addGameModal.classList.remove('show');
        addGameForm.reset();
    });

    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('gameRating');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            stars.forEach(s => {
                s.classList.toggle('bxs-star', parseInt(s.dataset.value) <= value);
                s.classList.toggle('bx-star', parseInt(s.dataset.value) > value);
            });
        });
    });

    // Delete game
    window.deleteGame = (gameId) => {
        if (confirm('Are you sure you want to delete this game?')) {
            const games = JSON.parse(localStorage.getItem('games')) || [];
            const updatedGames = games.filter(game => game.id !== gameId);
            localStorage.setItem('games', JSON.stringify(updatedGames));
            loadGames();
        }
    };

    // Edit game
    window.editGame = (gameId) => {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const game = games.find(g => g.id === gameId);
        if (game) {
            // Populate form with game data
            document.getElementById('gameTitle').value = game.title;
            document.getElementById('gameGenre').value = game.genre;
            document.getElementById('gamePlatform').value = game.platform;
            document.getElementById('gameImage').value = game.image;
            document.getElementById('gameStatus').value = game.status;
            document.getElementById('gameProgress').value = game.progress;
            document.getElementById('gameRating').value = game.rating;
            document.getElementById('gameNotes').value = game.notes;
            
            // Update stars display
            stars.forEach(s => {
                s.classList.toggle('bxs-star', parseInt(s.dataset.value) <= game.rating);
                s.classList.toggle('bx-star', parseInt(s.dataset.value) > game.rating);
            });

            // Show modal
            addGameModal.classList.add('show');
            
            // Update form submission to handle edit
            const originalSubmit = addGameForm.onsubmit;
            addGameForm.onsubmit = (e) => {
                e.preventDefault();
                const updatedGames = games.map(g => {
                    if (g.id === gameId) {
                        return {
                            ...g,
                            title: document.getElementById('gameTitle').value,
                            genre: document.getElementById('gameGenre').value,
                            platform: document.getElementById('gamePlatform').value,
                            image: document.getElementById('gameImage').value,
                            status: document.getElementById('gameStatus').value,
                            progress: parseInt(document.getElementById('gameProgress').value) || 0,
                            rating: parseInt(document.getElementById('gameRating').value) || 0,
                            notes: document.getElementById('gameNotes').value
                        };
                    }
                    return g;
                });
                localStorage.setItem('games', JSON.stringify(updatedGames));
                addGameModal.classList.remove('show');
                loadGames();
                addGameForm.reset();
                addGameForm.onsubmit = originalSubmit;
            };
        }
    };

    // Initial load
    loadGames();
});