document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements
    const collectionsGrid = document.getElementById('collectionsGrid');
    const emptyState = document.getElementById('emptyState');
    const newCollectionBtn = document.getElementById('newCollectionBtn');
    const newCollectionBtnEmpty = document.getElementById('newCollectionBtnEmpty');
    const newCollectionModal = document.getElementById('newCollectionModal');
    const collectionDetailsModal = document.getElementById('collectionDetailsModal');
    const addGamesModal = document.getElementById('addGamesModal');
    const menuToggle = document.getElementById('menu-toggle');
    const pageOverlay = document.querySelector('.page-overlay');
    const mainContent = document.querySelector('.main-content');
    
    // Current Collection Context
    let currentCollection = null;

    // Initialize
    function init() {
        loadCollections();
        setupEventListeners();
        setupMenuFunctionality();
    }

    // Setup Menu Functionality
    function setupMenuFunctionality() {
        if (menuToggle && pageOverlay) {
            const toggleMenu = () => {
                const sidebar = document.getElementById('sidebar');
                if (!sidebar) return;

                const willOpen = !sidebar.classList.contains('open');
                
                sidebar.classList.toggle('open', willOpen);
                pageOverlay.classList.toggle('active', willOpen);
                menuToggle.classList.toggle('active', willOpen);

                if (window.innerWidth < 1200) {
                    mainContent.style.marginLeft = willOpen ? '250px' : '0';
                }
            };

            menuToggle.addEventListener('click', toggleMenu);
            pageOverlay.addEventListener('click', toggleMenu);

            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1200) {
                    mainContent.style.marginLeft = '250px';
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar) {
                        sidebar.classList.remove('open');
                    }
                    pageOverlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                } else {
                    const sidebar = document.getElementById('sidebar');
                    mainContent.style.marginLeft = sidebar?.classList.contains('open') ? '250px' : '0';
                }
            });
        }
    }

    // Load Collections
    function loadCollections() {
        const collections = getCollections();
        
        if (collections.length === 0) {
            collectionsGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            collectionsGrid.style.display = 'grid';
            emptyState.style.display = 'none';
            renderCollections(collections);
        }
    }

    // Render Collections
    function renderCollections(collections) {
        collectionsGrid.innerHTML = collections.map(collection => {
            const gameCount = collection.games.length;
            const totalPlaytime = calculateTotalPlaytime(collection.games);
            const previewImages = getPreviewImages(collection.games);
            
            return `
                <div class="collection-card" data-id="${collection.id}">
                    <div class="collection-header">
                        <h3>${collection.name}</h3>
                        <span class="game-count">${gameCount} games</span>
                    </div>
                    <div class="collection-preview">
                        ${previewImages}
                    </div>
                    <div class="collection-footer">
                        <div class="collection-stats">
                            <span>${totalPlaytime} hours played</span>
                        </div>
                        <div class="collection-actions">
                            <button class="btn-primary view-collection" data-id="${collection.id}">
                                <i class='bx bx-show'></i>
                                View
                            </button>
                            <button class="btn-secondary edit-collection" data-id="${collection.id}">
                                <i class='bx bx-edit'></i>
                            </button>
                            <button class="btn-danger delete-collection" data-id="${collection.id}">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Helper Functions
    function getCollections() {
        return JSON.parse(localStorage.getItem('collections')) || [];
    }

    function saveCollections(collections) {
        localStorage.setItem('collections', JSON.stringify(collections));
    }

    function calculateTotalPlaytime(games) {
        return games.reduce((total, gameId) => {
            const game = findGame(gameId);
            return total + (game?.hoursPlayed || 0);
        }, 0);
    }

    function getPreviewImages(gameIds) {
        return gameIds.slice(0, 3).map(gameId => {
            const game = findGame(gameId);
            return game ? `
                <img src="${game.image || 'https://via.placeholder.com/300x200'}" 
                     alt="${game.title}">
            ` : '';
        }).join('') || '<div class="empty-preview">No games added</div>';
    }

    function findGame(gameId) {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        return games.find(game => game.id === gameId);
    }

    // Modal Management
    function showModal(modal) {
        modal.classList.add('show');
    }

    function hideModal(modal) {
        modal.classList.remove('show');
    }

    function hideAllModals() {
        [newCollectionModal, collectionDetailsModal, addGamesModal].forEach(modal => {
            hideModal(modal);
        });
    }

    // Collection Management
    function createCollection(name, description = '') {
        const collections = getCollections();
        const newCollection = {
            id: Date.now().toString(),
            name,
            description,
            games: [],
            createdAt: new Date().toISOString()
        };
        
        collections.push(newCollection);
        saveCollections(collections);
        loadCollections();
    }

    function deleteCollection(id) {
        if (confirm('Are you sure you want to delete this collection?')) {
            const collections = getCollections().filter(c => c.id !== id);
            saveCollections(collections);
            loadCollections();
        }
    }

    function viewCollection(id) {
        const collection = getCollections().find(c => c.id === id);
        if (!collection) return;

        currentCollection = collection;
        
        // Update modal content
        document.getElementById('collectionDetailsTitle').innerHTML = `
            <i class='bx bx-collection'></i>
            ${collection.name}
        `;
        document.getElementById('collectionDescription').textContent = 
            collection.description || 'No description provided';
        document.getElementById('gameCount').textContent = 
            `${collection.games.length} games`;
        document.getElementById('totalPlaytime').textContent = 
            `${calculateTotalPlaytime(collection.games)} hours played`;

        // Render collection games
        renderCollectionGames(collection.games);
        
        showModal(collectionDetailsModal);
    }

    function renderCollectionGames(gameIds) {
        const gamesGrid = document.getElementById('collectionGamesGrid');
        gamesGrid.innerHTML = gameIds.map(gameId => {
            const game = findGame(gameId);
            if (!game) return '';
            
            return `
                <div class="game-card" data-id="${game.id}">
                    <img src="${game.image || 'https://via.placeholder.com/300x200'}" 
                         alt="${game.title}">
                    <div class="game-info">
                        <h4>${game.title}</h4>
                        <p>${game.hoursPlayed || 0} hours played</p>
                        <button class="btn-danger remove-game" data-id="${game.id}">
                            <i class='bx bx-x'></i>
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('') || '<div class="empty-state">No games in this collection</div>';
    }

    // Game Management
    function showAddGamesModal() {
        const availableGamesGrid = document.getElementById('availableGamesGrid');
        const games = JSON.parse(localStorage.getItem('games')) || [];
        
        availableGamesGrid.innerHTML = games
            .filter(game => !currentCollection.games.includes(game.id))
            .map(game => `
                <div class="game-card" data-id="${game.id}">
                    <img src="${game.image || 'https://via.placeholder.com/300x200'}" 
                         alt="${game.title}">
                    <div class="game-info">
                        <h4>${game.title}</h4>
                        <p>${game.hoursPlayed || 0} hours played</p>
                    </div>
                </div>
            `).join('') || '<div class="empty-state">No games available to add</div>';

        showModal(addGamesModal);
    }

    function addGamesToCollection(gameIds) {
        if (!currentCollection) return;

        const collections = getCollections();
        const collectionIndex = collections.findIndex(c => c.id === currentCollection.id);
        
        if (collectionIndex === -1) return;

        collections[collectionIndex].games = [
            ...new Set([...collections[collectionIndex].games, ...gameIds])
        ];
        
        saveCollections(collections);
        currentCollection = collections[collectionIndex];
        
        // Update the collection details view
        renderCollectionGames(currentCollection.games);
        hideModal(addGamesModal);
    }

    function removeGameFromCollection(gameId) {
        if (!currentCollection) return;

        const collections = getCollections();
        const collectionIndex = collections.findIndex(c => c.id === currentCollection.id);
        
        if (collectionIndex === -1) return;

        collections[collectionIndex].games = 
            collections[collectionIndex].games.filter(id => id !== gameId);
        
        saveCollections(collections);
        currentCollection = collections[collectionIndex];
        
        // Update the collection details view
        renderCollectionGames(currentCollection.games);
    }

    // Event Listeners
    function setupEventListeners() {
        // New Collection
        [newCollectionBtn, newCollectionBtnEmpty].forEach(btn => {
            btn?.addEventListener('click', () => showModal(newCollectionModal));
        });

        // Modal Close Buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => hideAllModals());
        });

        // New Collection Form
        document.getElementById('newCollectionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('collectionName').value.trim();
            const description = document.getElementById('collectionDescription').value.trim();
            
            if (name) {
                createCollection(name, description);
                e.target.reset();
                hideModal(newCollectionModal);
            }
        });

        // Collection Actions
        collectionsGrid.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const id = target.dataset.id;
            if (!id) return;

            if (target.classList.contains('view-collection')) {
                viewCollection(id);
            } else if (target.classList.contains('edit-collection')) {
                // TODO: Implement edit functionality
            } else if (target.classList.contains('delete-collection')) {
                deleteCollection(id);
            }
        });

        // Add Games to Collection
        document.getElementById('addGamesToCollection')?.addEventListener('click', showAddGamesModal);

        // Game Selection and Addition
        let selectedGames = new Set();
        
        document.getElementById('availableGamesGrid')?.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (!gameCard) return;

            const gameId = gameCard.dataset.id;
            gameCard.classList.toggle('selected');
            
            if (gameCard.classList.contains('selected')) {
                selectedGames.add(gameId);
            } else {
                selectedGames.delete(gameId);
            }
        });

        document.getElementById('confirmAddGames')?.addEventListener('click', () => {
            if (selectedGames.size > 0) {
                addGamesToCollection(Array.from(selectedGames));
                selectedGames.clear();
            }
        });

        // Remove Game from Collection
        document.getElementById('collectionGamesGrid')?.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-game');
            if (!removeBtn) return;

            const gameId = removeBtn.dataset.id;
            if (gameId && confirm('Remove this game from the collection?')) {
                removeGameFromCollection(gameId);
            }
        });

        // Game Search
        document.getElementById('gameSearchInput')?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const gameCards = document.querySelectorAll('#availableGamesGrid .game-card');
            
            gameCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                card.style.display = title.includes(query) ? 'block' : 'none';
            });
        });
    }

    // Initialize the module
    init();
}); 