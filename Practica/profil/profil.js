const toggle = document.getElementById("modeToggle");
toggle.addEventListener("change", toggleTheme);

if (localStorage.getItem("theme") === "light") {
  toggle.checked = true;
  document.body.classList.add("light-mode");
}

function toggleTheme() {
  if (toggle.checked) {
    document