    
    (() => {
      const links = document.querySelectorAll(".nav a");
      links.forEach(a => {
        const href = a.getAttribute("href");
        if (href && href.includes("resume")) a.classList.add("active");
      });
    })();

    (() => {
      const btns = document.querySelectorAll("[data-copy]");
      const status = document.querySelector(".copy-status");
      if (!btns.length) return;

      btns.forEach(btn => {
        btn.addEventListener("click", async () => {
          const text = btn.dataset.copy;
          try {
            await navigator.clipboard.writeText(text);
            if (status) status.textContent = "Copied to clipboard.";
            btn.textContent = "Copied!";
            setTimeout(() => (btn.textContent = "Copy"), 900);
          } catch {
            if (status) status.textContent = "Copy failed — please copy manually.";
          }
        });
      });
    })();