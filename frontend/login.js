document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent default form action

  const identifier = document.getElementById("loginInput").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      identifier: identifier,
      password: password
    })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", "Bearer " + data.token); // Store with "Bearer"
    window.location.href = "index.html"; // Redirect to homepage
  } else {
    alert("Login failed! Please check your credentials.");
  }
});
