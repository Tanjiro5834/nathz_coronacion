const reveals = document.querySelectorAll(".section-reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
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
