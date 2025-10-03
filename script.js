import users from "./users.js";

const form = document.getElementById("loginform");
if (form) {

  const errorbox = document.createElement("p");
  errorbox.style.color = "red";
  errorbox.style.marginTop = "10px";
  form.appendChild(errorbox);

  // 🔹 Login logic
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    console.log("Form Data:", data);

    const userfound = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (userfound) {
      console.log("✅ User found successfully");
      window.location.href = "./first.html"; // login success
    } else {
      console.log("❌ User not found");
      errorbox.textContent = "Please enter correct email or password";
    }
  });
}


// ---------------- SIGNUP LOGIC ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  const signupError = document.createElement("p");
  signupError.style.color = "red";
  signupError.style.marginTop = "10px";
  signupForm.appendChild(signupError);

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const signupFormData = new FormData(e.target);
    const signupData = Object.fromEntries(signupFormData);

    const { fullname, username, email, password, confirm_password, terms } =
      signupData;

    // ---- Step 1: Validation ----
    if (!fullname || !username || !email || !password || !confirm_password) {
      signupError.textContent = "⚠ All fields are required!";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      signupError.textContent = "⚠ Invalid email format!";
      return;
    }

    if (password.length < 6) {
      signupError.textContent = "⚠ Password must be at least 6 characters!";
      return;
    }

    if (password !== confirm_password) {
      signupError.textContent = "⚠ Passwords do not match!";
      return;
    }

    if (!terms) {
      signupError.textContent = "⚠ You must agree to the terms!";
      return;
    }

    // ---- Step 2: Check if user already exists ----
    const userExists = users.some(
      (user) => user.email === email || user.username === username
    );
    if (userExists) {
      signupError.textContent = "⚠ User already exists!";
      return;
    }

    // ---- Step 3: If validation passed ----
    const newUser = { fullname, username, email, password };
    users.push(newUser);

    console.log("✅ New user registered:", newUser);
    console.log("All users:", users);

    // Redirect after successful signup
    window.location.href = "./first.html";
  });
}
