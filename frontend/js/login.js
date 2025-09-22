document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Login.js loaded");

  // Select the form
  const loginForm = document.querySelector("form");

  // Attach submit handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("⚠️ Please fill in both fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Store JWT token
        localStorage.setItem("token", data.token);

        alert("🎉 Logged in successfully!");
        // Redirect to homepage
        window.location.href = "home.html";
      } else {
        alert("❌ Login failed: " + (data.msg || data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server connection failed. Is the backend running?");
    }
  });
});