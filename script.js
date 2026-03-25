const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const matrixCanvas = document.getElementById("matrixCanvas");
const typeLine = document.getElementById("typeLine");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((el) => observer.observe(el));

if (typeLine) {
  const commands = [
    "initiating_portfolio.exe",
    "loading_projects --secure",
    "connecting_social_handles",
    "status: online",
  ];

  let commandIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    const current = commands[commandIndex];

    if (!deleting) {
      charIndex += 1;
      typeLine.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1100);
        return;
      }
    } else {
      charIndex -= 1;
      typeLine.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
      }
    }

    setTimeout(typeLoop, deleting ? 30 : 70);
  };

  typeLoop();
}

if (matrixCanvas) {
  const ctx = matrixCanvas.getContext("2d");

  if (ctx) {
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}#@%$";
    const fontSize = 16;
    let columns = 0;
    let drops = [];

    const resetMatrix = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      matrixCanvas.width = width;
      matrixCanvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -30));
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(1, 8, 5, 0.12)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const text = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "rgba(116, 255, 197, 0.95)";
        ctx.fillText(text, x, y);

        if (y > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 1;
      }
    };

    resetMatrix();
    setInterval(drawMatrix, 52);
    window.addEventListener("resize", resetMatrix);
  }
}
