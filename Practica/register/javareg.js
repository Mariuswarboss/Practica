document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');

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

  form.addEventListener('submit', handleRegistration);

  function handleRegistration(e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const repeatPassword = document.getElementById('repeat-password-input').value.trim();

    const errors = [];
    if (!firstname) errors.push("First name is required");
    if (!isValidEmail(email)) errors.push("Please enter a valid email");
    if (password.length < 8) errors.push("Password must be at least 8 characters");
    if (password !== repeatPassword) errors.push("Passwords do not match");

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      errors.push("Email is already registered");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const user = {
      id: Date.now(),
      name: firstname,
      email,
      password, // NOTE: In production, hash this
      createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));

    window.location.href = "/index.html";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
