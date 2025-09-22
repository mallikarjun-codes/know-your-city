document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Signup.js loaded");

  // Select the form
  const signupForm = document.querySelector("form");

  // Attach submit handler
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Account created successfully! Please login.");
        // Redirect to login page
        window.location.href = "login.html";
      } else {
        alert("❌ Signup failed: " + (data.msg || data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server connection failed. Is the backend running?");
    }
  });
});