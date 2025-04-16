function toggleCollection() {
    const col = document.getElementById("collection");
    col.classList.toggle("hidden");
  }
  
  const toggle = document.getElementById("modeToggle");
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--card-bg', '#dddddd');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#220052');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--card-bg', '#111111');
    }
  });
  