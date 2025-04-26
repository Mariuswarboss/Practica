document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');
  const firstnameInput = document.getElementById('firstname-input');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const repeatPasswordInput = document.getElementById('repeat-password-input');

  // Password visibility toggle
  const pwToggles = document.querySelectorAll(".icon-right");
  const pwFields = document.querySelectorAll(".password");

  pwToggles.forEach(icon => {
    icon.addEventListener("click", () => {
      pwFields.forEach(pwField => {
        pwField.type = pwField.type === "password" ? "text" : "password";
        icon.textContent = pwField.type === "password" ? "visibility_off" : "visibility";
      });
    });
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
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validate password
  function isValidPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    [firstnameInput, emailInput, passwordInput, repeatPasswordInput].forEach(clearError);

    let isValid = true;

    // Validate name
    if (!firstnameInput.value.trim()) {
      showError(firstnameInput, "Name is required");
      isValid = false;
    } else if (firstnameInput.value.trim().length < 2) {
      showError(firstnameInput, "Name must be at least 2 characters");
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    }

    // Validate password
    if (!passwordInput.value) {
      showError(passwordInput, "Password is required");
      isValid = false;
    } else if (!isValidPassword(passwordInput.value)) {
      showError(passwordInput, "Password must be at least 8 characters and include uppercase, lowercase, numbers and special characters");
      isValid = false;
    }

    // Validate password confirmation
    if (passwordInput.value !== repeatPasswordInput.value) {
      showError(repeatPasswordInput, "Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === emailInput.value.trim())) {
      showError(emailInput, "Email is already registered");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: firstnameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      createdAt: new Date().toISOString(),
      avatar: null,
      settings: {
        theme: 'light',
        notifications: true
      }
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set session
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar
    }));

    // Redirect to home
    window.location.href = "/Main_conten/Home.html";
  });

  // Real-time validation
  emailInput.addEventListener('blur', function() {
    if (this.value.trim() && !isValidEmail(this.value.trim())) {
      showError(this, "Please enter a valid email");
    } else {
      clearError(this);
    }
  });

  passwordInput.addEventListener('input', function() {
    if (this.value && !isValidPassword(this.value)) {
      showError(this, "Password must be at least 8 characters and include uppercase, lowercase, numbers and special characters");
    } else {
      clearError(this);
    }
  });

  repeatPasswordInput.addEventListener('input', function() {
    if (this.value && this.value !== passwordInput.value) {
      showError(this, "Passwords do not match");
    } else {
      clearError(this);
    }
  });
});
