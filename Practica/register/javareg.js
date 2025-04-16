const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const registerBtn = document.getElementById('register-btn');
const pwToggles = document.querySelectorAll(".icon-right");
const pwFields = document.querySelectorAll(".password");

pwToggles.forEach(icon => {
  icon.addEventListener("click", () => {
    pwFields.forEach(pwField => {
      if (pwField.type === "password") {
        pwField.type = "text";
        icon.textContent = "visibility";
      } else {
        pwField.type = "password";
        icon.textContent = "visibility_off";
      }
    });
  });
});

registerBtn.addEventListener("click", () => {
  let firstname = firstname_input.value.trim();
  let email = email_input.value.trim();
  let password = password_input.value.trim();
  let repeatPassword = repeat_password_input.value.trim();
  let errors = [];

  if (firstname === "") {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  } else {
    firstname_input.parentElement.classList.remove("incorrect");
  }

  if (!email.includes("@")) {
    errors.push("Email must contain '@'");
    email_input.parentElement.classList.add("incorrect");
  } else {
    email_input.parentElement.classList.remove("incorrect");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  } else {
    password_input.parentElement.classList.remove("incorrect");
  }

  if (password !== repeatPassword) {
    errors.push("Passwords do not match");
    repeat_password_input.parentElement.classList.add("incorrect");
  } else {
    repeat_password_input.parentElement.classList.remove("incorrect");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    alert("Registration successful!");
    localStorage.setItem("isLoggedIn", "true"); 
    window.location.href = "../index.html"; 
  }
  
});
