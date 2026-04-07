const reveals = document.querySelectorAll(".section-reveal");

reveals.forEach((el, index) => {
  el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
);

reveals.forEach((el) => {
  if (!el.classList.contains("visible")) observer.observe(el);
});

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuButton?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const internalLinks = document.querySelectorAll('a[href^="#"]');

const easeOutExpo = (progress) =>
  progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

function ultraSmoothScrollTo(targetY, duration = 980) {
  if (prefersReducedMotion.matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOutExpo(progress));

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    const offset = 104;
    const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

    ultraSmoothScrollTo(targetY);
    history.pushState(null, "", hash);
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveNav = () => {
  let current = "about";
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height)
      current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active", "text-white");
    if (link.getAttribute("href") === `#${current}`)
      link.classList.add("active", "text-white");
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);

document.addEventListener("DOMContentLoaded", () => {
  const typingConsole = document.getElementById("typingConsole");
  const typingCursor = document.getElementById("typingCursor");

  if (!typingConsole || !typingCursor) return;

  const lines = [
    'System.out.println("Thank you for visiting");',
    'echo "Software Engineer, Backend Developer";',
    'Console.WriteLine("Open for commissions and collaborations");',
    'cout << "Visit my github and linkedin for more information (Tanjiro5834, nathaniel-coronacion-dev901278/)"'
  ];

  const typeSpeed = 36;
  const linePause = 700;
  const restartDelay = 1800;

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        typingConsole.textContent = "";
        lineIndex = 0;
        charIndex = 0;
        typeLine();
      }, restartDelay);
      return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      typingConsole.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, typeSpeed);
      return;
    }

    typingConsole.textContent += "\n";
    lineIndex++;
    charIndex = 0;
    setTimeout(typeLine, linePause);
  }

  typeLine();
});
