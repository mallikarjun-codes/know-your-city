// Wait until the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Home.js loaded");

  /* ----------------- MOBILE NAVBAR TOGGLE ------------------ */
  const navToggle = document.createElement("button");
  navToggle.innerHTML = "☰";
  navToggle.className =
    "md:hidden text-2xl p-2 rounded border border-gray-400 hover:bg-gray-100";
  
  const navDiv = document.querySelector("header nav");
  const navLinks = navDiv.querySelector("div");

  navDiv.insertBefore(navToggle, navLinks);

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("flex-col");
    navLinks.classList.toggle("absolute");
    navLinks.classList.toggle("top-16");
    navLinks.classList.toggle("right-6");
    navLinks.classList.toggle("bg-white");
    navLinks.classList.toggle("p-4");
    navLinks.classList.toggle("shadow-lg");
  });

  /* --------------- SMOOTH SCROLLING FOR ANCHORS --------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ----------------- SEARCH FUNCTIONALITY ------------------ */
  const searchForm = document.querySelector("form[action='/search']");
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "searchResults";
  resultsContainer.className = "mt-6 max-w-2xl mx-auto text-left space-y-4";
  searchForm.insertAdjacentElement("afterend", resultsContainer);
  
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchForm.query.value.trim();
    if (!query) return;

    resultsContainer.innerHTML =
      `<p class="text-gray-600">🔍 Searching for "<b>${query}</b>"...</p>`;
    
    try {
      // Call backend API (replace localhost with deployed URL later)
      const res = await fetch("http://localhost:5000/api/search?q=" + encodeURIComponent(query));
      const data = await res.json();

      if (!data || data.length === 0) {
        resultsContainer.innerHTML =
          `<p class="text-red-500">❌ No results found for "<b>${query}</b>"</p>`;
        return;
      }

      // Render results
      resultsContainer.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700">Results:</h3>
        <ul class="space-y-4">
          ${data.map(item => `
            <li class="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
              <h4 class="text-lg font-bold text-blue-600">${item.title || item.name}</h4>
              <p class="text-gray-600">${item.description || ''}</p>
            </li>`).join("")}
        </ul>
      `;
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML =
        `<p class="text-red-500">⚠️ Failed to fetch results. Try again later.</p>`;
    }
  });
});