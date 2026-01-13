// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Filter chips (simple, client-friendly)
  const chips = Array.from(document.querySelectorAll(".chip"));
  const cards = Array.from(document.querySelectorAll(".card"));
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;

      cards.forEach(card => {
        if (filter === "all") {
          card.hidden = false;
          return;
        }
        const tags = (card.dataset.tags || "").split(" ");
        card.hidden = !tags.includes(filter);
      });
    });
  });

  // Count-up stats (tiny but makes hero feel custom)
  const stats = Array.from(document.querySelectorAll("[data-count]"));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    const target = Number(el.dataset.count || "0");
    if (prefersReduced) { el.textContent = String(target); return; }
    let current = 0;
    const steps = 24;
    const increment = Math.max(1, Math.round(target / steps));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = String(target);
        clearInterval(timer);
      } else {
        el.textContent = String(current);
      }
    }, 30);
  }

  // Start stats when hero card enters view
  const heroCard = document.querySelector(".hero-card");
  if (heroCard && stats.length) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        stats.forEach(animateCount);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(heroCard);
  }

  // Modal (click button -> open, click backdrop/close -> close, ESC -> close)
  const modalTriggers = Array.from(document.querySelectorAll("[data-modal]"));
  let activeModal = null;

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.setAttribute("aria-hidden", "false");
    activeModal = m;

    // Focus close for accessibility
    const closeBtn = m.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();

    document.body.style.overflow = "hidden";
  }

  function closeModal(m) {
    if (!m) return;
    m.setAttribute("aria-hidden", "true");
    activeModal = null;
    document.body.style.overflow = "";
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.modal));
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    if (t.matches("[data-close]")) {
      const m = t.closest(".modal");
      if (m) closeModal(m);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeModal) closeModal(activeModal);
  });
});