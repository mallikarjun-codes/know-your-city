document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Places.js loaded");

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

  /* ----------------- CATEGORY FILTER ------------------ */
  const categories = ["HISTORY", "NATURE", "HERITAGE", "SPIRITUAL", "ADVENTURE"];
  const container = document.querySelector(".max-w-3xl.mx-auto.text-center");

  if (container) {
    const filterBar = document.createElement("div");
    filterBar.className = "flex flex-wrap justify-center gap-3 mt-8";
    filterBar.innerHTML = `
      <button data-category="ALL" class="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">All</button>
      ${categories
        .map(
          (cat) => `
        <button data-category="${cat}" class="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white text-sm font-medium transition">${cat}</button>
      `
        )
        .join("")}
    `;
    container.insertAdjacentElement("afterend", filterBar);

    // Filtering behavior
    const cards = document.querySelectorAll(".grid .relative");
    filterBar.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const category = e.target.dataset.category;
        filterBar.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("bg-blue-600", "text-white");
          btn.classList.add("bg-gray-200", "text-gray-700");
        });
        e.target.classList.remove("bg-gray-200", "text-gray-700");
        e.target.classList.add("bg-blue-600", "text-white");

        cards.forEach((card) => {
          const badge = card.querySelector("span").innerText.toUpperCase();
          if (category === "ALL" || badge.includes(category)) {
            card.classList.remove("hidden");
            card.classList.add("block");
          } else {
            card.classList.add("hidden");
          }
        });
      }
    });
  }

  /* ----------------- SCROLL REVEAL ANIMATIONS ------------------ */
  const revealElements = document.querySelectorAll(".grid .relative");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-6",
      "transition-all",
      "duration-700"
    );
    observer.observe(el);
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
});