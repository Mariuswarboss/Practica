// Sample game data
const sampleGames = [
    {
      id: 1,
      title: "The Witcher 3",
      genre: "RPG",
      rating: 4.9,
      image: "https://via.placeholder.com/300x200?text=The+Witcher+3"
    },
    {
      id: 2,
      title: "Cyberpunk 2077",
      genre: "RPG",
      rating: 3.8,
      image: "https://via.placeholder.com/300x200?text=Cyberpunk+2077"
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      genre: "Adventure",
      rating: 4.8,
      image: "https://via.placeholder.com/300x200?text=Red+Dead+Redemption+2"
    },
    {
      id: 4,
      title: "Elden Ring",
      genre: "Action RPG",
      rating: 4.7,
      image: "https://via.placeholder.com/300x200?text=Elden+Ring"
    }
  ];
  
  // Sample collections data
  let collections = [
    { id: 1, name: "Favorite RPGs", games: [1, 2] },
    { id: 2, name: "Open World", games: [1, 3] }
  ];
  
  function loadSection(section) {
    const main = document.getElementById("main-section");
    
    switch(section) {
      case "home":
        renderHome(main);
        break;
      case "yourGames":
        renderYourGames(main);
        break;
      case "collections":
        renderCollections(main);
        break;
      case "reviews":
        renderReviews(main);
        break;
      case "friends":
        renderFriends(main);
        break;
      case "settings":
        renderSettings(main);
        break;
      default:
        renderHome(main);
    }
    
    // Update active menu item
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`.sidebar ul li a[onclick="loadSection('${section}')"]`).classList.add('active');
  }
  
  function renderHome(container) {
    container.innerHTML = `
      <h2>Recommended Games</h2>
      <div class="game-grid">
        ${sampleGames.map(game => `
          <div class="game-card" onclick="showGameDetail(${game.id})">
            <img src="${game.image}" alt="${game.title}" />
            <div class="game-info">
              <h3>${game.title}</h3>
              <p>${game.genre}</p>
              <div class="game-rating">
                ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5 - Math.floor(game.rating))}
                (${game.rating.toFixed(1)})
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  function renderYourGames(container) {
    container.innerHTML = `
      <h2>Your Game Library</h2>
      ${sampleGames.length > 0 ? `
        <div class="game-grid">
          ${sampleGames.map(game => `
            <div class="game-card">
              <img src="${game.image}" alt="${game.title}" />
              <div class="game-info">
                <h3>${game.title}</h3>
                <button class="remove-btn" onclick="removeGame(${game.id}, event)">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <i class="fas fa-gamepad"></i>
          <p>You haven't added any games yet!</p>
          <button onclick="showAddGames()">Browse Games</button>
        </div>
      `}
    `;
  }
  
  function renderCollections(container) {
    container.innerHTML = `
      <h2>Your Collections</h2>
      <div class="search-container">
        <input type="text" placeholder="Collection name" id="collection-name">
        <button onclick="createCollection()">Create Collection</button>
      </div>
      <div id="collections-list">
        ${collections.length > 0 ? collections.map(collection => `
          <div class="collection-item">
            <i class="fas fa-folder"></i>
            <div>
              <h3>${collection.name}</h3>
              <p>${collection.games.length} games</p>
            </div>
            <button class="delete-btn" onclick="deleteCollection(${collection.id}, event)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('') : `
          <p>No collections yet. Create your first one!</p>
        `}
      </div>
    `;
  }
  
  function renderReviews(container) {
    container.innerHTML = `
      <h2>Search Game Reviews</h2>
      <div class="search-container">
        <input type="text" id="review-search" placeholder="Enter game name">
        <button onclick="searchReviews()">Search Reviews</button>
      </div>
      <div id="review-results" class="review-results"></div>
    `;
  }
  
  function renderFriends(container) {
    container.innerHTML = `
      <h2>Your Friends</h2>
      <div class="friends-list">
        <p>Friend functionality coming soon!</p>
      </div>
    `;
  }
  
  function renderSettings(container) {
    container.innerHTML = `
      <h2>Settings</h2>
      <div class="settings-form">
        <div class="setting-item">
          <label>Theme</label>
          <select>
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Notifications</label>
          <input type="checkbox" checked>
        </div>
        <button class="save-btn">Save Settings</button>
      </div>
    `;
  }
  
  function createCollection() {
    const name = document.getElementById("collection-name").value.trim();
    if (name) {
      const newCollection = {
        id: collections.length + 1,
        name: name,
        games: []
      };
      collections.push(newCollection);
      renderCollections(document.getElementById("main-section"));
    }
  }
  
  function deleteCollection(id, event) {
    event.stopPropagation();
    collections = collections.filter(collection => collection.id !== id);
    renderCollections(document.getElementById("main-section"));
  }
  
  function searchReviews() {
    const query = document.getElementById("review-search").value.trim();
    const resultDiv = document.getElementById("review-results");
    
    if (!query) {
      resultDiv.innerHTML = "<p>Please enter a game name.</p>";
      return;
    }
  
    resultDiv.innerHTML = `
      <div class="review-sources">
        <h3>Reviews for <strong>${query}</strong></h3>
        <div class="sources-grid">
          <a href="https://www.metacritic.com/search/all/${query}/results" target="_blank" class="source-card">
            <img src="https://via.placeholder.com/100?text=Metacritic" alt="Metacritic">
            <span>Metacritic</span>
          </a>
          <a href="https://www.ign.com/search?q=${query}" target="_blank" class="source-card">
            <img src="https://via.placeholder.com/100?text=IGN" alt="IGN">
            <span>IGN</span>
          </a>
          <a href="https://www.gamespot.com/search/?q=${query}" target="_blank" class="source-card">
            <img src="https://via.placeholder.com/100?text=GameSpot" alt="GameSpot">
            <span>GameSpot</span>
          </a>
        </div>
      </div>
    `;
  }
  
  function showGameDetail(gameId) {
    const game = sampleGames.find(g => g.id === gameId);
    if (game) {
      document.getElementById("main-section").innerHTML = `
        <div class="game-detail">
          <button class="back-btn" onclick="loadSection('home')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <div class="detail-header">
            <img src="${game.image}" alt="${game.title}" class="detail-image">
            <div class="detail-info">
              <h1>${game.title}</h1>
              <div class="meta-info">
                <span class="genre">${game.genre}</span>
                <span class="rating">
                  ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5 - Math.floor(game.rating))}
                  (${game.rating.toFixed(1)})
                </span>
              </div>
              <div class="action-buttons">
                <button class="add-btn">
                  <i class="fas fa-plus"></i> Add to Library
                </button>
                <button class="wishlist-btn">
                  <i class="fas fa-heart"></i> Wishlist
                </button>
              </div>
            </div>
          </div>
          <div class="detail-content">
            <h2>About the Game</h2>
            <p>This is where detailed information about ${game.title} would appear. In a real application, this would be fetched from a game database API with complete description, screenshots, videos, and more details about the game.</p>
            <div class="screenshots">
              <h3>Screenshots</h3>
              <div class="screenshot-grid">
                <img src="https://via.placeholder.com/300x200?text=Screenshot+1">
                <img src="https://via.placeholder.com/300x200?text=Screenshot+2">
                <img src="https://via.placeholder.com/300x200?text=Screenshot+3">
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Initialize with home section
  document.addEventListener("DOMContentLoaded", () => {
    loadSection("home");
  });