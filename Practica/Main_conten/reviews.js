// Game data with reviews from multiple sites
const games = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg?t=1736424367",
        genre: "Action RPG",
        releaseDate: "May 19, 2015",
        developer: "CD PROJEKT RED",
        rating: 9.8,
        reviews: [
            {
                site: "IGN",
                score: "9.3/10",
                excerpt: "One of the best RPGs ever made, with a massive, rich world to explore.",
                url: "https://www.ign.com/games/the-witcher-3-wild-hunt"
            },
            {
                site: "GameSpot",
                score: "10/10",
                excerpt: "A masterpiece of world-building and character design.",
                url: "https://www.gamespot.com/reviews/the-witcher-3-wild-hunt-review/1900-6416135/"
            },
            {
                site: "PC Gamer",
                score: "92/100",
                excerpt: "An incredible achievement in open world storytelling.",
                url: "https://www.pcgamer.com/the-witcher-3-wild-hunt-review/"
            }
        ]
    },
    {
        id: 2,
        title: "Baldur's Gate 3",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/6b6b46089067683cecf6acfc92b39fc4c72e3fac/header.jpg?t=1744744220",
        genre: "RPG",
        releaseDate: "August 3, 2023",
        developer: "Larian Studios",
        rating: 9.7,
        reviews: [
            {
                site: "PC Gamer",
                score: "95/100",
                excerpt: "An incredible achievement in RPG design and storytelling.",
                url: "https://www.pcgamer.com/baldurs-gate-3-review/"
            },
            {
                site: "IGN",
                score: "9.5/10",
                excerpt: "A new benchmark for CRPGs and a masterclass in player choice.",
                url: "https://www.ign.com/games/baldurs-gate-3"
            },
            {
                site: "GameSpot",
                score: "10/10",
                excerpt: "A landmark achievement in the RPG genre.",
                url: "https://www.gamespot.com/reviews/baldurs-gate-3-review/1900-6418047/"
            }
        ]
    },
    {
        id: 3,
        title: "Elden Ring",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1744748041",
        genre: "Action RPG",
        releaseDate: "February 25, 2022",
        developer: "FromSoftware",
        rating: 9.6,
        reviews: [
            {
                site: "IGN",
                score: "10/10",
                excerpt: "A masterpiece of open-world design and challenging combat.",
                url: "https://www.ign.com/games/elden-ring"
            },
            {
                site: "GameSpot",
                score: "10/10",
                excerpt: "A stunning achievement in world design and exploration.",
                url: "https://www.gamespot.com/reviews/elden-ring-review/1900-6417836/"
            },
            {
                site: "Eurogamer",
                score: "Essential",
                excerpt: "A landmark open-world action RPG.",
                url: "https://www.eurogamer.net/elden-ring-review"
            }
        ]
    },
    {
        id: 4,
        title: "God of War Ragnarök",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1738256985",
        genre: "Action-Adventure",
        releaseDate: "November 9, 2022",
        developer: "Santa Monica Studio",
        rating: 9.5,
        reviews: [
            {
                site: "IGN",
                score: "10/10",
                excerpt: "A masterpiece that improves on everything from its predecessor.",
                url: "https://www.ign.com/games/god-of-war-ragnarok"
            },
            {
                site: "GameSpot",
                score: "9/10",
                excerpt: "An epic conclusion to the Norse saga.",
                url: "https://www.gamespot.com/reviews/god-of-war-ragnarok-review/1900-6417984/"
            },
            {
                site: "Polygon",
                score: "Recommended",
                excerpt: "A stunning technical achievement with a powerful story.",
                url: "https://www.polygon.com/reviews/23445933/god-of-war-ragnarok-review-ps5-ps4"
            }
        ]
    },
    {
        id: 5,
        title: "Red Dead Redemption 2",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
        genre: "Action-Adventure",
        releaseDate: "October 26, 2018",
        developer: "Rockstar Games",
        rating: 9.7,
        reviews: [
            {
                site: "IGN",
                score: "10/10",
                excerpt: "Red Dead Redemption 2 stands shoulder-to-shoulder with Grand Theft Auto V as one of the greatest games of the modern age.",
                url: "https://www.ign.com/games/red-dead-redemption-2"
            },
            {
                site: "GameSpot",
                score: "9/10",
                excerpt: "An epic tale of life in America's unforgiving heartland.",
                url: "https://www.gamespot.com/reviews/red-dead-redemption-2-review-wild-wild-best/1900-6417019/"
            },
            {
                site: "PC Gamer",
                score: "90/100",
                excerpt: "A stunning, elegiac western that's far more than just an open world game.",
                url: "https://www.pcgamer.com/red-dead-redemption-2-review/"
            }
        ]
    },
    {
        id: 6,
        title: "Cyberpunk 2077",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg?t=1734434803",
        genre: "Action RPG",
        releaseDate: "December 10, 2020",
        developer: "CD PROJEKT RED",
        rating: 8.8,
        reviews: [
            {
                site: "PC Gamer",
                score: "78/100",
                excerpt: "A fascinating RPG in a beautiful, sprawling city.",
                url: "https://www.pcgamer.com/cyberpunk-2077-review/"
            },
            {
                site: "IGN",
                score: "9/10",
                excerpt: "A beautiful and dazzlingly dense cityscape.",
                url: "https://www.ign.com/games/cyberpunk-2077"
            },
            {
                site: "GameSpot",
                score: "7/10",
                excerpt: "A deeply conflicting game that's at its best when it embraces its smaller stories.",
                url: "https://www.gamespot.com/reviews/cyberpunk-2077-review/1900-6417622/"
            }
        ]
    },
    {
        id: 7,
        title: "Final Fantasy XVI",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2515020/header.jpg?t=1741059170",
        genre: "Action RPG",
        releaseDate: "June 22, 2023",
        developer: "Square Enix",
        rating: 9.2,
        reviews: [
            {
                site: "IGN",
                score: "9/10",
                excerpt: "A spectacular reinvention of the Final Fantasy formula.",
                url: "https://www.ign.com/games/final-fantasy-xvi"
            },
            {
                site: "GameSpot",
                score: "9/10",
                excerpt: "A bold new direction for the series that pays off in spectacular fashion.",
                url: "https://www.gamespot.com/reviews/final-fantasy-16-review/1900-6418044/"
            },
            {
                site: "Eurogamer",
                score: "Recommended",
                excerpt: "Square Enix's most ambitious action game yet.",
                url: "https://www.eurogamer.net/final-fantasy-16-review"
            }
        ]
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const gamesGrid = document.getElementById('gamesGrid');
const gameModal = document.getElementById('gameModal');
const loadingState = document.getElementById('loadingState');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayGames(games);
    setupEventListeners();
});

// Display games in grid
function displayGames(gamesToShow) {
    gamesGrid.innerHTML = '';
    gamesToShow.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-content">
            <h3>${game.title}</h3>
            <div class="game-meta">
                <span>${game.genre}</span>
                <div class="rating">
                    <i class='bx bxs-star'></i>
                    <span>${game.rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    `;
    card.addEventListener('click', () => showGameDetails(game));
    return card;
}

// Show game details in modal
function showGameDetails(game) {
    const modalTitle = document.getElementById('modalGameTitle');
    const modalImage = document.getElementById('modalGameImage');
    const modalGenre = document.getElementById('modalGameGenre');
    const modalRelease = document.getElementById('modalGameRelease');
    const modalDeveloper = document.getElementById('modalGameDeveloper');
    const reviewsList = document.getElementById('reviewsList');

    modalTitle.textContent = game.title;
    modalImage.src = game.image;
    modalImage.alt = game.title;
    modalGenre.textContent = `Genre: ${game.genre}`;
    modalRelease.textContent = `Release Date: ${game.releaseDate}`;
    modalDeveloper.textContent = `Developer: ${game.developer}`;

    // Display reviews
    reviewsList.innerHTML = game.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-site">${review.site}</span>
                <span class="review-score">${review.score}</span>
            </div>
            <p class="review-excerpt">${review.excerpt}</p>
            <a href="${review.url}" target="_blank" class="review-link">
                Read full review <i class='bx bx-link-external'></i>
            </a>
        </div>
    `).join('');

    gameModal.classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.genre.toLowerCase().includes(searchTerm)
        );
        displayGames(filteredGames);
    });

    // Close modal
    const closeModalBtn = document.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', () => {
        gameModal.classList.remove('active');
    });

    // Close modal on outside click
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            gameModal.classList.remove('active');
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameModal.classList.contains('active')) {
            gameModal.classList.remove('active');
        }
    });
} 