document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      username: username,
      email: email,
      password: password
    })
  });

  if (response.ok) {
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  } else {
    const errorText = await response.text();
    alert("Registration failed: " + errorText);
  }
});
