document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Events.js loaded");

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
    navLinks.classList.toggle("space-y-4");
  });

  /* ----------------- ELEMENTS ------------------ */
  const eventsContainer = document.getElementById("events-container");
  const apiKey = "YOUR_API_KEY"; // Replace with actual Ticketmaster API key

  // Create filter + search bar
  const filterBar = document.createElement("div");
  filterBar.className = "flex flex-wrap justify-between items-center mb-8";

  filterBar.innerHTML = `
    <div class="flex gap-3">
      <button data-filter="ALL" class="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-medium">All</button>
      <button data-filter="today" class="px-4 py-2 rounded-full bg-gray-200 text-xs font-medium hover:bg-blue-600 hover:text-white">Today</button>
      <button data-filter="week" class="px-4 py-2 rounded-full bg-gray-200 text-xs font-medium hover:bg-blue-600 hover:text-white">This Week</button>
      <button data-filter="concert" class="px-4 py-2 rounded-full bg-gray-200 text-xs font-medium hover:bg-blue-600 hover:text-white">Concerts</button>
      <button data-filter="cultural" class="px-4 py-2 rounded-full bg-gray-200 text-xs font-medium hover:bg-blue-600 hover:text-white">Cultural</button>
    </div>
    <input type="text" id="eventSearch" placeholder="Search events..."
      class="px-4 py-2 border rounded-lg shadow-sm w-52 md:w-72">
  `;
  eventsContainer.parentElement.prepend(filterBar);

  /* ----------------- FETCH EVENTS ------------------ */
  async function fetchEvents() {
    try {
      // Try your backend first
      let res = await fetch("http://localhost:5000/api/events");
      let data = await res.json();

      if (!data || data.length === 0 || data.error) {
        console.warn("⚠️ No custom events, fallback to Ticketmaster...");
        // fallback to Ticketmaster API
        const res2 = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=Belgaum&countryCode=IN`
        );
        const tmData = await res2.json();
        if (tmData._embedded) {
          data = tmData._embedded.events.map(ev => ({
            name: ev.name,
            date: ev.dates.start.localDate,
            venue: ev._embedded.venues[0].name,
            image: ev.images[0].url,
            url: ev.url,
            category: ev.classifications ? ev.classifications[0].segment.name : "General",
          }));
        }
      }

      if (!data || data.length === 0) {
        eventsContainer.innerHTML =
          "<p class='text-gray-500 col-span-3 text-center'>No events found right now 🙁</p>";
        return;
      }

      renderEvents(data);

    } catch (error) {
      console.error(error);
      eventsContainer.innerHTML =
        "<p class='text-red-500 col-span-3 text-center'>Error loading events. Please try again later.</p>";
    }
  }

  /* ----------------- RENDER EVENTS ------------------ */
  function renderEvents(events) {
    eventsContainer.innerHTML = events.map(event => `
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-5">
        <img src="${event.image || '../assets/default_event.jpg'}" alt="${event.name}" class="w-full h-48 object-cover rounded-lg">
        <h2 class="mt-4 text-lg font-bold text-gray-900">${event.name}</h2>
        <p class="text-gray-600 mt-2">${event.date || ''}</p>
        <p class="text-gray-500">${event.venue || ''}</p>
        <span class="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">${event.category || "General"}</span>
        <a href="${event.url || '#'}" target="_blank"
          class="mt-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90">View Details</a>
      </div>
    `).join("");

    // Save for filtering/search
    window.allEvents = events;
  }

  /* ----------------- FILTERING & SEARCH ------------------ */
  filterBar.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const filter = e.target.dataset.filter;
      let filtered = window.allEvents;

      const today = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);

      if (filter === "today") {
        filtered = filtered.filter(ev => new Date(ev.date).toDateString() === today.toDateString());
      } else if (filter === "week") {
        filtered = filtered.filter(ev => {
          const d = new Date(ev.date);
          return d >= today && d <= weekFromNow;
        });
      } else if (filter === "concert") {
        filtered = filtered.filter(ev => (ev.category || "").toLowerCase().includes("concert"));
      } else if (filter === "cultural") {
        filtered = filtered.filter(ev => (ev.category || "").toLowerCase().includes("cultural"));
      }
      renderEvents(filtered);
    }
  });

  // Search
  document.getElementById("eventSearch").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = window.allEvents.filter(ev =>
      ev.name.toLowerCase().includes(val) || (ev.venue || "").toLowerCase().includes(val)
    );
    renderEvents(filtered);
  });

  /* ----------------- SCROLL TO TOP BUTTON ------------------ */
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "⬆️";
  scrollBtn.className =
    "hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------------- INIT ------------------ */
  fetchEvents();
});