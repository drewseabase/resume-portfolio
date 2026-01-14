const waveContainer = document.getElementById("waveContainer");
const waveGroup = document.getElementById("waveGroup");
const waves = Array.from(waveGroup?.querySelectorAll('g[transform^="translate"]') || []);

if (!waveContainer || !waveGroup || waves.length < 3) {
  console.warn("Wave setup: elements not found or not enough layers.");
} else {
  const mmReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = mmReduce.matches;

  // Keep updated if user toggles it while page is open
  mmReduce.addEventListener?.("change", (e) => (reduceMotion = e.matches));

  // Read baseline translateY for each layer from the attribute
  const base = waves.map((g) => {
    const t = g.getAttribute("transform") || "translate(0, 0)";
    const match = t.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
    const x = match ? parseFloat(match[1]) : 0;
    const y = match ? parseFloat(match[2]) : 0;
    return { x, y };
  });

  let latestY = 0;
  let ticking = false;
  let hidden = false;

  function onScroll() {
    latestY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    ticking = false;

    const vh = window.innerHeight || 1;
    const p = Math.min(latestY / vh, 1); // 0..1
    const fade = Math.max(0, 1 - p * 1.5);

    // Reduced motion: no sliding, just a simple fade-out of colored layers
    if (reduceMotion) {
      waves[0].style.opacity = String(fade);
      waves[1].style.opacity = String(fade);
      waves[2].style.opacity = "1";
      return;
    }

    // Layer 0: slide LEFT
    waves[0].setAttribute(
      "transform",
      `translate(${base[0].x + -p * 2000}, ${base[0].y})`
    );
    waves[0].style.opacity = String(fade);

    // Layer 1: slide RIGHT
    waves[1].setAttribute(
      "transform",
      `translate(${base[1].x + p * 2000}, ${base[1].y})`
    );
    waves[1].style.opacity = String(fade);

    // Layer 2: rise UP (becomes background)
    waves[2].setAttribute(
      "transform",
      `translate(${base[2].x}, ${base[2].y + -p * 800})`
    );
    waves[2].style.opacity = "1";

    // Hide container once past hero (do it once to avoid thrashing)
    if (p >= 1 && !hidden) {
      hidden = true;
      waveContainer.style.opacity = "0";
      waveContainer.style.pointerEvents = "none";
    } else if (p < 1 && hidden) {
      hidden = false;
      waveContainer.style.opacity = "1";
      waveContainer.style.pointerEvents = "none";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll(); // initial paint
}
