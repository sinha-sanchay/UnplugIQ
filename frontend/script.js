document.addEventListener("DOMContentLoaded", () => {
  // ========== Registration ==========
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, username, email, password })
      })
      .then(response => {
        if (response.ok) {
          alert("Registration successful! Please login.");
          window.location.href = "login.html";
        } else {
          return response.json().then(data => {
            alert("Registration failed: " + (data.message || "Unknown error"));
          });
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong during registration.");
      });
    });
  }

  // ========== Dashboard Logic ==========
  const token = localStorage.getItem("token");
  const usernameEl = document.getElementById("username");

  if (token && usernameEl) {
    fetch("http://localhost:8080/api/users/me", {
      headers: {
        "Authorization": token
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Token invalid");
      return res.json();
    })
    .then(data => {
      document.getElementById("username").innerText = data.name || data.username || "User";
    })
    .catch(() => {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });

    fetch("http://localhost:8080/api/users/progress", {
      headers: {
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("userPoints").innerText = data.points || 0;
      document.getElementById("userStars").innerText = "⭐".repeat(data.stars || 0);
      document.getElementById("progressFill").style.width = (data.progressPercent || 0) + "%";
    })
    .catch(err => console.error("Error loading progress", err));

    const dateEl = document.getElementById("date");
    if (dateEl) {
      dateEl.innerText = new Date().toDateString();
    }
  }
});
