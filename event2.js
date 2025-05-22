// Predefined username and password
const validUsername = "Đỗ Ngọc Phương Uyên";
const validPassword = "22012025";

// Get the form and error message elements
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

// Add event listener for form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the entered username and password
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Form submitted");
  console.log("Username:", username);
  console.log("Password:", password);

  // Check if the username and password are correct
  if (username.trim() === validUsername && password === validPassword) {
    // Redirect to anniversary.html
    window.location.href = "main.html"; // Ensure the path is correct
  } else {
    // Display error message
    errorMessage.style.display = "block";
  }
});