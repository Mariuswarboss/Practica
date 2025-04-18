const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const pwToggle = document.querySelector(".icon-right");
const pwField = document.querySelector(".password");

// Password visibility toggle
pwToggle.addEventListener("click", () => {
  pwField.type = pwField.type === "password" ? "text" : "password";
  pwToggle.textContent = pwField.type === "password" ? "visibility_off" : "visibility";
});

// Login function
loginBtn.addEventListener("click", () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  const errors = [];

  // Validation
  if (!email.includes("@")) errors.push("Valid email required");
  if (!password) errors.push("Password required");

  // Highlight errors
  [loginEmail, loginPassword].forEach(input => {
    input.parentElement.classList.toggle("incorrect", 
      errors.some(err => err.toLowerCase().includes(input.id.split('-')[1])));
  });

  if (errors.length) {
    alert(errors.join("\n"));
    return;
  }

  // Check credentials
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "/index.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
});