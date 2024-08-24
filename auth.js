// Registration Logic
if (document.getElementById("register-btn")) {
 document.getElementById("register-btn").addEventListener("click", function() {
     const username = document.getElementById("register-username").value.trim();
     const password = document.getElementById("register-password").value.trim();

     if (username && password) {
         if (localStorage.getItem(username)) {
             alert("Username already exists. Please choose a different one.");
         } else {
             localStorage.setItem(username, password);
             alert("Registration successful! You can now log in.");
             window.location.href = "index.html"; // Redirect to login page after successful registration
         }
     } else {
         alert("Please fill in both fields.");
     }
 });
}

// Login Logic
if (document.getElementById("login-btn")) {
 document.getElementById("login-btn").addEventListener("click", function() {
     const username = document.getElementById("login-username").value.trim();
     const password = document.getElementById("login-password").value.trim();

     const storedPassword = localStorage.getItem(username);

     if (storedPassword && storedPassword === password) {
         sessionStorage.setItem("loggedInUser", username);
         console.log("Login successful! Redirecting to todo.html");
         window.location.href = "todo.html"; // Redirect to To-Do List page
     } else {
         alert("Invalid username or password.");
     }
 });
}

// Logout Logic
if (document.getElementById("logout-btn")) {
 document.getElementById("logout-btn").addEventListener("click", function() {
     sessionStorage.removeItem("loggedInUser");
     window.location.href = "index.html"; // Redirect to login page
 });
}

// Redirect if not logged in
if (document.body.contains(document.querySelector('.todo-container'))) {
 if (!sessionStorage.getItem("loggedInUser")) {
     alert("Please log in to access your to-do list.");
     window.location.href = "index.html";
 }
}
