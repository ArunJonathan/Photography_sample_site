document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("hidden"));
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Simple lightbox
  const imgs = Array.from(document.querySelectorAll(".gallery-img"));
  if (imgs.length) {
    let current = 0;
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `
      <img alt="Lightbox">
      <div class="controls">
        <button id="prevBtn" aria-label="Previous">◀</button>
        <button id="closeBtn" aria-label="Close">✕</button>
        <button id="nextBtn" aria-label="Next">▶</button>
      </div>`;
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector("img");
    const prevBtn = overlay.querySelector("#prevBtn");
    const nextBtn = overlay.querySelector("#nextBtn");
    const closeBtn = overlay.querySelector("#closeBtn");

    function openAt(index) {
      current = index;
      imgEl.src = imgs[current].src;
      overlay.classList.add("open");
    }
    function close() { overlay.classList.remove("open"); }
    function next() { openAt((current + 1) % imgs.length); }
    function prev() { openAt((current - 1 + imgs.length) % imgs.length); }

    imgs.forEach((im, idx) => im.addEventListener("click", () => openAt(idx)));
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  }
});

// Contact form (demo)
function onSubmitForm(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("formStatus");
  const data = Object.fromEntries(new FormData(form).entries());
  console.log("Enquiry submitted:", data);
  status.textContent = "Thank you! We’ll be in touch within 24 hours.";
  form.reset();
  return false;
}
