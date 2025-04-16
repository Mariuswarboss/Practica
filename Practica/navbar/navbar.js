// Search functionality
document.querySelector('.search-bar button').addEventListener('click', searchGames);
document.querySelector('.search-bar input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchGames();
});

function searchGames() {
  const query = document.querySelector('.search-bar input').value.trim();
  if (query) {
    console.log("Searching for:", query);
    document.getElementById('main-content').innerHTML = `
      <div class="search-results">
        <h2>Search Results for "${query}"</h2>
        <div class="results-grid">
          <!-- Results would be dynamically inserted here -->
          <p>Search functionality will be implemented fully in the next version.</p>
        </div>
      </div>
    `;
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "./auth/login.html";
}