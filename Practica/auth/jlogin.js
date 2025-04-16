const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const pwToggle = document.querySelector(".icon-right");
const pwField = document.querySelector(".password");

pwToggle.addEventListener("click", () => {
  if (pwField.type === "password") {
    pwField.type = "text";
    pwToggle.textContent = "visibility";
  } else {
    pwField.type = "password";
    pwToggle.textContent = "visibility_off";
  }
});

loginBtn.addEventListener("click", () => {
  let email = loginEmail.value.trim();
  let password = loginPassword.value.trim();
  let errors = [];

  if (!email.includes("@")) {
    errors.push("Email must contain '@'");
    loginEmail.parentElement.classList.add("incorrect");
  } else {
    loginEmail.parentElement.classList.remove("incorrect");
  }

  if (password.length === 0) {
    errors.push("Password is required");
    loginPassword.parentElement.classList.add("incorrect");
  } else {
    loginPassword.parentElement.classList.remove("incorrect");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true"); // salvăm autentificarea
    window.location.href = "../index.html"; // redirect spre pagina principală
  }
  
});
