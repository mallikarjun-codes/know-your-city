document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ About.js loaded");

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

  /* ----------------- SCROLL REVEAL ANIMATIONS ------------------ */
  const revealElements = document.querySelectorAll("section, .relative.rounded-2xl");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => {
    el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
    observer.observe(el);
  });

  /* ----------------- FAQ SECTION (Optional) ------------------ */
  const aboutContainer = document.querySelector("footer");
  const faqSection = document.createElement("section");
  faqSection.className = "bg-gray-50 py-12 border-t mt-8";
  faqSection.innerHTML = `
    <div class="container mx-auto px-6 max-w-3xl">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <div class="faq border rounded-lg p-4 cursor-pointer bg-white shadow-sm">
          <h3 class="font-semibold text-gray-800">Is Know Your City free to use?</h3>
          <p class="mt-2 text-gray-600 hidden">✅ Yes, it’s completely free! You can explore places, events and more without cost.</p>
        </div>
        <div class="faq border rounded-lg p-4 cursor-pointer bg-white shadow-sm">
          <h3 class="font-semibold text-gray-800">Will AI features be available?</h3>
          <p class="mt-2 text-gray-600 hidden">🤖 Yes, we’re working to integrate AI soon to answer all your Belagavi-related queries!</p>
        </div>
        <div class="faq border rounded-lg p-4 cursor-pointer bg-white shadow-sm">
          <h3 class="font-semibold text-gray-800">Can I suggest new places or events?</h3>
          <p class="mt-2 text-gray-600 hidden">✨ Definitely! Once logged in, you’ll be able to suggest and save places/events for others.</p>
        </div>
      </div>
    </div>`;
  aboutContainer.insertAdjacentElement("beforebegin", faqSection);

  // Toggle FAQ open/close
  document.querySelectorAll(".faq").forEach((faq) => {
    faq.addEventListener("click", () => {
      const answer = faq.querySelector("p");
      answer.classList.toggle("hidden");
    });
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