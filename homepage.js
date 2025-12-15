
(() => {
  const navLinks = document.querySelectorAll("nav a");
  if (!navLinks.length) return;

  const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  navLinks.forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
})();

(() => {
  const buttons = document.querySelectorAll("[data-copy]");
  const statusEl = document.querySelector(".copy-status");
  if (!buttons.length) return;

  let statusTimeoutId = null;

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.dataset.copy;

  
      if (!textToCopy) {
        if (statusEl) statusEl.textContent = "Nothing to copy.";
        return;
      }

      try {
        await navigator.clipboard.writeText(textToCopy);

        
        if (statusEl) {
          statusEl.textContent = "Copied to clipboard.";

          if (statusTimeoutId) clearTimeout(statusTimeoutId);

          statusTimeoutId = setTimeout(() => {
            statusEl.textContent = "";
            statusTimeoutId = null;
          }, 2000);
        }
        const originalText = btn.textContent;
        btn.textContent = "Copied!";

        setTimeout(() => {
          btn.textContent = originalText || "Copy";
        }, 900);

      } catch (err) {
        if (statusEl) statusEl.textContent = "Copy failed — please copy manually.";
      }
    });
  });
})();
