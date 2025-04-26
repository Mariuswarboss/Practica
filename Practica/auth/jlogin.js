const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const pwToggle = document.querySelector(".icon-right");
const pwField = document.querySelector(".password");
const form = document.querySelector('form');

// Password visibility toggle
pwToggle.addEventListener("click", () => {
  pwField.type = pwField.type === "password" ? "text" : "password";
  pwToggle.textContent = pwField.type === "password" ? "visibility_off" : "visibility";
});

// Show error message
function showError(input, message) {
  const formField = input.parentElement;
  formField.classList.add('incorrect');
  const error = formField.querySelector('.error-text') || document.createElement('span');
  error.className = 'error-text';
  error.textContent = message;
  if (!formField.querySelector('.error-text')) {
    formField.appendChild(error);
  }
}

// Clear error message
function clearError(input) {
  const formField = input.parentElement;
  formField.classList.remove('incorrect');
  const error = formField.querySelector('.error-text');
  if (error) {
    error.remove();
  }
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Login function
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  let isValid = true;

  // Clear previous errors
  clearError(loginEmail);
  clearError(loginPassword);

  // Validate email
  if (!email) {
    showError(loginEmail, "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(loginEmail, "Please enter a valid email");
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError(loginPassword, "Password is required");
    isValid = false;
  }

  if (!isValid) return;

  // Check credentials
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Set session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null
    }));

    // Remember me functionality
    if (document.getElementById('logCheck').checked) {
      localStorage.setItem('rememberedUser', email);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    // Redirect to home
    window.location.href = "/Main_conten/Home.html";
  } else {
    showError(loginPassword, "Invalid email or password");
  }
});

// Auto-fill remembered user
document.addEventListener('DOMContentLoaded', () => {
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
    loginEmail.value = rememberedUser;
    document.getElementById('logCheck').checked = true;
  }
});