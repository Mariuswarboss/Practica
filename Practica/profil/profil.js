document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    document.getElementById("modeToggle").checked = true;
  }
  document.getElementById("modeToggle").addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
    const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });
  const savedBio = localStorage.getItem("userBio");
  if (savedBio) document.getElementById("bio-text").innerHTML = `<p>${savedBio}</p>`;
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) document.querySelector(".avatar-image").src = savedAvatar;
  const savedGames = JSON.parse(localStorage.getItem("favGames"));
  if (savedGames) {
    const list = document.getElementById("fav-games-list");
    list.innerHTML = "";
    savedGames.forEach(game => {
      const li = document.createElement("li");
      li.textContent = game;
      list.appendChild(li);
    });
  }
  document.querySelector(".edit-avatar").addEventListener("click", () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          document.querySelector(".avatar-image").src = event.target.result;
          localStorage.setItem("avatar", event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
});

function editField(fieldId) {
  const field = document.getElementById(fieldId);
  const current =
    fieldId === "fav-games-list"
      ? [...field.querySelectorAll("li")].map(li => li.textContent).join("\n")
      : field.textContent;

  field.innerHTML = `
    <textarea class="edit-textarea" rows="5">${current}</textarea>
    <button class="save-btn" onclick="saveField('${fieldId}')">Save</button>
    <button class="cancel-btn" onclick="cancelEdit('${fieldId}', \`${current.replace(/`/g, "\\`")}\`)">Cancel</button>
  `;
}

function saveField(fieldId) {
  const textarea = document.querySelector(`#${fieldId} .edit-textarea`);
  const newText = textarea.value.trim();

  if (fieldId === "fav-games-list") {
    const lines = newText.split("\n").filter(l => l.trim() !== "");
    const listItems = lines.map(item => `<li>${item}</li>`).join("");
    document.getElementById(fieldId).innerHTML = `
      <ul>${listItems}</ul>
      <button class="edit-btn" onclick="editField('${fieldId}')"><i class="fas fa-edit"></i></button>
    `;
    localStorage.setItem("favGames", JSON.stringify(lines));
  } else {
    document.getElementById(fieldId).innerHTML = `
      <p>${newText}</p>
      <button class="edit-btn" onclick="editField('${fieldId}')"><i class="fas fa-edit"></i></button>
    `;
    if (fieldId === "bio-text") {
      localStorage.setItem("userBio", newText);
    }
  }
}

function cancelEdit(fieldId, originalText) {
  if (fieldId === "fav-games-list") {
    const lines = originalText.split("\n").filter(l => l.trim() !== "");
    const listItems = lines.map(item => `<li>${item}</li>`).join("");
    document.getElementById(fieldId).innerHTML = `
      <ul>${listItems}</ul>
      <button class="edit-btn" onclick="editField('${fieldId}')"><i class="fas fa-edit"></i></button>
    `;
  } else {
    document.getElementById(fieldId).innerHTML = `
      <p>${originalText}</p>
      <button class="edit-btn" onclick="editField('${fieldId}')"><i class="fas fa-edit"></i></button>
    `;
  }
}
