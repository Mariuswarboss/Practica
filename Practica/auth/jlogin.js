const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".icon-right"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

// Inputs
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

// Buttons
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Show/hide passwords
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                eyeIcon.textContent = "visibility";
            } else {
                pwField.type = "password";
                eyeIcon.textContent = "visibility_off";
            }
        });
    });
});

// Switch forms
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});

// Login validation
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
        alert("Login successful!"); // Replace with actual login logic
    }
});

// Registration validation
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
        alert("Registration successful!"); // Replace with actual registration logic
    }
});
