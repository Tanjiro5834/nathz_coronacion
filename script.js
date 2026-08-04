/* ══════════════ THEME TOGGLE ══════════════ */
const toggle = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);

toggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ══════════════ MOBILE MENU ══════════════ */
const navBurger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
navBurger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  navBurger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navBurger.setAttribute("aria-expanded", "false");
  });
});

/* ══════════════ TECH ICON MAP (Simple Icons CDN) ══════════════ */
// slug reference: https://simpleicons.org
const ICONS = {
  "HTML5": "html5",
  "HTML": "html5",
  "CSS3": "css3",
  "CSS": "css3",
  "JavaScript": "javascript",
  "JavaScript (ES6+)": "javascript",
  "Electron.js": "javascript",
  "PHP": "php",
  "Core PHP": "php",
  "MySQL": "mysql",
  "PostgreSQL": "postgresql",
  "SQLite": "sqlite",
  "Redis": "redis",
  "Git": "git",
  "GitHub": "github",
  "GitHub / GitHub Actions": "github",
  "Docker": "docker",
  "Unity": "unity",
  "Unity/Unity Version Control": "unity",
  "Java": "openjdk",
  "Java Swing": "openjdk",
  "Spring Boot": "springboot",
  "Flyway": "flyway",
  "Laravel": "laravel",
  "React.js": "react",
  "React Native": "react",
  "Vue.js": "vuedotjs",
  "TypeScript": "typescript",
  "Dexie.js": "javascript",
  "Node.js": "nodedotjs",
  "C/C++": "cplusplus",
  "Python": "python",
  "PyGame": "python",
  "Java Swing / JavaFX": "openjdk",
  "Java Swing/FX": "openjdk",
  "Tkinter": "python",
  "Tkinter (Python)": "python",
  "Unreal Engine": "unrealengine",
  "LibGDX (Java)": "openjdk",
  "Flutter": "flutter",
  "Android Studio": "androidstudio",
  "Electron.js": "electron",
  "Tailwind": "tailwindcss",
  "Postman": "postman",
  "phpMyAdmin": "phpmyadmin",
  "DBeaver": "dbeaver",
};

function iconUrl(name) {
  const slug = ICONS[name];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}`;
}

function techTag(name, variant = "tag") {
  const url = iconUrl(name);
  const cls =
    variant === "tag" ? "tag" : variant === "stack" ? "tech-tag" : "modal-stack-tag";
  if (url) {
    return `<span class="${cls} icon-only" title="${name}"><img src="${url}" alt="${name}" loading="lazy"></span>`;
  }
  return `<span class="${cls}">${name}</span>`;
}

/* ══════════════ DATA ══════════════ */
const experience = [
  {
    period: ["June 2023", "Present"],
    type: "Freelance",
    company: "Self-Employed",
    role: "Freelance Software Engineer",
    desc: "3 years of freelancing experience. Built 10+ applications for SMBs and diverse clients — across web, desktop, game, and mobile development.",
    bullets: [
      "Delivered end-to-end projects independently: requirements gathering, architecture, development, deployment, and client handoff.",
      "Offered services in web, game, desktop app, and mobile development",
      "Maintained a strong focus on clean architecture and security best practices across every engagement.",
      "Worked across multiple domains and stacks depending on client needs, adapting quickly to new requirements.",
    ],
    stack: ["Spring Boot", "PHP", "PostgreSQL", "MySQL", "JavaScript", "HTML", "Tailwind", "Laravel", "Node.js", "React", "React Native", "Unity", "PHP", "Java", "ESP32", "Arduino", "C/C++", "Java Swing/FX"],
  },
  {
    period: ["May 2026", "July 2026"],
    type: "Freelance",
    company: "Lumnaire",
    role: "Java Software Engineer",
    desc: "Worked on Trevix as a backend developer, a multi-tenant property management SaaS. Architected as a Spring Boot monolith (MVC), collaborating with the team lead and frontend developers on tickets and integration.",
    bullets: [
      "Built REST APIs, CRUD operations, and RBAC using Spring Boot.",
      "Contributed to the PostgreSQL multi-tenant schema design.",
      "Validated endpoint behavior and edge cases with Postman before handoff to frontend.",
      "Used MVC pattern and Monolith for software architecture",
      "Collaborated with team lead, frontend and senior developers for tasks, frontend integration, and project management"
    ],
    stack: ["Spring Boot", "PostgreSQL", "Postman", "Git"],
  },
  {
    period: ["February 2026", "April 2026"],
    type: "Internship",
    company: "The Thomas Aquinas Institute of Learning",
    role: "Backend Developer",
    desc: "Developed a Catholic school's public website and internal admin dashboard, working as one of two developers on the team.",
    bullets: [
      "Built a school's public-facing website with internal dashboard",
      "Implemented REST APIs, CRUD, RBAC, and authentication",
      "Implemented real-time notification using polling",
      "Handled large datasets using pagination via backend",
      "Implemented file-based caching, cutting cache response time from 19.5ms to 0.68ms.",
      "Designed the MySQL schema with proper indexing, collapsing a 19-query join into 1.",
      "Architected usign MVC and Monolith.",
      "Collaborated with a frontend developer for frontend integration, design, and version control.",
      "Handled Node.js file-system integration for internal tooling.",
      "Documented the SDLC using Iterative Waterfall Model."
    ],
    stack: ["HTML", "Tailwind", "JavaScript", "PHP 8.2", "MySQL", "Node.js", "Git"],
  },
];

const projects = [
  {
    status: "live",
    statusLabel: "Live",
    name: "HVAC E-Commerce Platform",
    category: ["web"],
    desc: "Full-stack HVAC marketplace with inventory, service booking, and admin dashboard.",
    why: "I built this to bring his ordering and service-booking process online — replacing manual phone bookings with a real e-commerce flow and an admin dashboard for online presence, better sales, and advertising.",
    whyStack: "PHP + MySQL for a lightweight, easy-to-host backend a small business can afford to maintain. Vanilla HTML/CSS/JS on the frontend to keep the footprint small and avoid unnecessary build tooling for a site of this scale.",
    stack: ["HTML5", "Tailwind", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/Tanjiro5834/aircon_website",
    live: "https://coronacionservices.com",
  },
  {
    status: "wip",
    statusLabel: "In progress",
    name: "Bladebound",
    category: ["game", "desktop"],
    desc: "Solo-developed first-person melee combat game with squad-based arena fights.",
    why: "I wanted to prove I could take a game from architecture to a playable build entirely on my own — combat systems, state management, and scene architecture — as a deliberate secondary lane alongside backend work.",
    whyStack: "Unity/C# gave me the fastest path to a working 3D combat prototype with strong tooling for physics and animation, while ScriptableObjects let me build a modular, data-driven weapon system without hardcoding stats.",
    stack: ["Unity", "Git"],
    github: "https://github.com/Tanjiro5834",
  },
  {
    status: "done",
    statusLabel: "Under Deployment",
    name: "Travi",
    category: ["web"],
    desc: "Travel planning platform with hierarchical itinerary management, JWT auth, and admin CMS.",
    why: "I wanted a project that exercised production-style backend concerns end to end — versioned schema migrations, proper auth, and a real admin layer — outside of a client contract, as a personal architecture exercise.",
    whyStack: "Spring Boot + PostgreSQL for a robust, typed backend, with Flyway to practice disciplined, versioned schema migrations the way I would on a real production team.",
    stack: ["Spring Boot", "PostgreSQL", "Flyway", "HTML5", "Tailwind", "JavaScript", "Docker"],
    github: "https://github.com/Tanjiro5834/travi",
  },
  {
    status: "wip",
    statusLabel: "Completed",
    name: "BIBO",
    category: ["web"],
    desc: "AI-driven e-learning platform for out-of-school youth with multi-role JWT auth and gamification.",
    why: "This was my thesis project — I wanted to address a real problem (access to structured learning for out-of-school youth) using an AI tutor rather than just static content, while also learning to integrate a third-party LLM API into a Spring Boot backend.",
    whyStack: "Spring Boot for a secure, role-based backend (student/teacher/admin), MySQL for straightforward relational data, and the Groq API for fast, low-cost AI tutoring responses without hosting my own model.",
    stack: ["Spring Boot", "HTML5", "Tailwind", "JavaScript", "MySQL"],
    github: "https://github.com/Tanjiro5834/bibo-elearning",
  },
  {
    status: "wip",
    statusLabel: "Completed",
    name: "Mitolohiya (Thesis)",
    category: ["game", "desktop"],
    desc: "Turn-based 2D card game built in Unity inspired by Filipino mythology.",
    why: "I wanted to combine my interest in game development with Filipino cultural storytelling — turning local mythology into an actual playable card-combat system instead of a purely academic thesis document.",
    whyStack: "Unity was the natural choice for 2D card-game mechanics, animation, and UI, with strong asset and version-control tooling for a small solo/duo team.",
    stack: ["Unity"],
  },
  {
    status: "wip",
    statusLabel: "Completed",
    name: "Suki",
    category: ["mobile/web", "mobile"],
    desc: "A web and mobile-based application for tracking customer credit (utang) for sari-sari stores.",
    why: "Sari-sari store owners in the Philippines track customer credit (utang) on paper notebooks. I wanted to build something that solves this for real small-business owners, working offline-first since store WiFi/data is often unreliable.",
    whyStack: "Laravel + MySQL for a stable, well-documented backend; React/TypeScript + Dexie.js for an offline-first PWA frontend that keeps working without a connection; React Native to extend the same logic to a mobile app.",
    stack: ["Laravel", "MySQL", "React.js", "React Native", "Dexie.js", "TypeScript"],
    github: "https://github.com/Tanjiro5834",
  },
  {
    status: "completed",
    statusLabel: "Deployed",
    name: "SJFS Cash Flow Monitoring System",
    category: ["web"],
    desc: "A multi-campus cash flow monitoring system for a school network, handling collections, disbursements, and bank reconciliation with role-based access control.",
    why: "The school needed a way to track cash flow across multiple campuses in real time, with proper audit trails and reconciliation against bank statements, replacing manual/disconnected tracking.",
    whyStack: "PHP MVC with a service-repository pattern for clean separation of business logic from data access; PostgreSQL for reliable relational integrity across multi-campus data; deployed on Hostinger for cost-effective production hosting.",
    stack: ["HTML5", "Tailwind", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/Tanjiro5834/sjfs-accounting-system",
  },

  {
    status: "wip",
    statusLabel: "In Progress",
    name: "Typing Game",
    category: ["web"],
    desc: "A full-stack typing speed game with real-time WPM/accuracy tracking, leaderboards, and personal stats, inspired by Monkeytype.",
    why: "Wanted to build a real-time competitive game with a custom typing engine and a proper API-first backend, separate from my usual CRUD-heavy business apps.",
    whyStack: "Vanilla JS for a lightweight, dependency-free typing engine on the frontend; Spring Boot + JPA/Hibernate + MySQL for a clean, scalable REST API backend.",
    stack: ["Java", "Spring Boot", "MySQL", "HTML", "Tailwind", "JavaScript"],
    github: "https://github.com/Tanjiro5834/typinggame",
  },
];

const skills = [
  { group: "Programming", items: ["Java", "PHP", "JavaScript", "C#", "C/C++", "Python"] },
  { group: "Frontend", items: ["HTML5", "Tailwind", "JavaScript (ES6+)", "React.js"] },
  { group: "Backend", items: ["Spring Boot", "PHP", "Laravel", "Node.js"] },
  { group: "Database", items: ["PostgreSQL", "MySQL", "Redis", "SQLite"] },
  { group: "Desktop Development", items: ["Java Swing / JavaFX", "Tkinter", "Electron.js"] },
  { group: "Game Development", items: ["Unity", "Unreal Engine", "Java Swing", "PyGame"] },
  { group: "Mobile Development", items: ["React Native", "Flutter", "Android Studio"] },
  { group: "DevOps", items: ["Git", "GitHub / GitHub Actions", "Docker"] },
  { group: "Tools", items: ["Postman", "phpMyAdmin", "DBeaver"] },
];

const services = [
  {
    name: "Capstone / Thesis Development",
    desc: "Get the full project with complete documentation, ERD, and SDLC. See more details.",
    price: "From ₱20,000",
    details: [
      { label: "Timeline", value: "3–7 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Source + docs" },
    ],
    stack: ["Spring Boot", "PHP", "Laravel", "MySQL", "PostgreSQL", "HTML5", "Tailwind", "JavaScript", "React.js"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Final payment due before source code handoff.",
      "Includes ERD, SDLC documentation, and deployment guide.",
      "Client must provide complete requirements before kickoff.",
      "Scope changes after kickoff may affect timeline and price.",
      "No refunds once development has begun.",
    ],
  },
  {
    name: "Mobile Development",
    desc: "Bring your mobile app to life with this complete package, including SDLC, ERD, and documentation.",
    price: "From ₱15,000",
    details: [
      { label: "Timeline", value: "4–8 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Apk/File + Source" },
    ],
    stack: ["Java", "Spring Boot", "PHP", "MySQL", "PostgreSQL", "JavaScript", "Docker"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Final payment due before source code handoff.",
      "Includes full documentation: ERD, architecture, and user manual.",
      "Client must provide complete requirements before kickoff.",
      "Scope changes after kickoff may affect timeline and price.",
      "No refunds once development has begun.",
    ],
  },
  {
    name: "Web Development",
    desc: "Need a website for your business, a booking system, e-commerce, SaaS, or CMS? Check this out.",
    price: "From ₱20,000",
    details: [
      { label: "Timeline", value: "2–5 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Deployed + source" },
    ],
    stack: ["PHP", "Laravel", "Node.js", "MySQL", "PostgreSQL", "HTML", "Tailwind", "JavaScript", "Spring Boot"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Hosting and domain costs not included unless stated.",
      "Final payment due before live deployment or source handoff.",
      "Client is responsible for providing content (text, images, logos).",
      "Scope changes after kickoff may affect timeline and price.",
      "No refunds once development has begun.",
    ],
  },
  {
    name: "Game Development",
    desc: "Have a game in mind? Let's bring it to life. I do game development using various technologies.",
    price: "From ₱10,000",
    details: [
      { label: "Timeline", value: "3–6 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "2 free · ₱750/extra" },
      { label: "Delivery", value: "Build + source" },
    ],
    stack: ["Unity", "Java", "PyGame", "Unreal Engine"],
    terms: [
      "50% downpayment required before development starts.",
      "2 free revision rounds. Additional revisions at ₱750 each.",
      "Art assets and audio must be provided by the client unless agreed.",
      "Final payment due before build or source code handoff.",
      "Game design document (GDD) must be agreed upon before kickoff.",
      "No refunds once development has begun.",
    ],
  },
  {
    name: "Desktop App Development",
    desc: "Get the exe file and full source code, guide, and documentation.",
    price: "From ₱10,000",
    details: [
      { label: "Timeline", value: "2–5 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Installer + source" },
    ],
    stack: ["Java Swing/FX", "Electron.js", "Tkinter (Python)", "SQLite", "MySQL"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Windows installer included. macOS/Linux packaging on request.",
      "Final payment due before installer or source code handoff.",
      "Client must provide complete requirements before kickoff.",
      "No refunds once development has begun.",
    ],
  },
];

const expList = document.getElementById("expList");
expList.innerHTML = experience
  .map(
    (e, i) => `
  <div class="exp-item" data-index="${i}">
    <button class="exp-trigger" aria-expanded="false">
      <div class="exp-meta">
        <div class="exp-period">${e.period[0]}<br>${e.period[1]}</div>
        <span class="exp-type">${e.type}</span>
      </div>
      <div class="exp-body">
        <div class="exp-company">${e.company}</div>
        <div class="exp-role-row">
          <div class="exp-role">${e.role}</div>
          <svg class="exp-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </button>
    <div class="exp-panel">
      <div class="exp-panel-inner">
        <div class="exp-content">
          <p class="exp-desc">${e.desc}</p>
          <div class="exp-bullets">
            ${e.bullets.map((b) => `<div class="exp-bullet">${b}</div>`).join("")}
          </div>
          <div class="exp-tags">${e.stack.map((s) => techTag(s, "tag")).join("")}</div>
        </div>
      </div>
    </div>
  </div>
`
  )
  .join("");

expList.querySelectorAll(".exp-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".exp-item");
    const isOpen = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

/* ══════════════ RENDER: PROJECTS (filters + grid + modal) ══════════════ */
const PROJECT_FILTERS = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "desktop", label: "Desktop" },
  { key: "mobile/web", label: "Mobile/Web" },
  { key: "game", label: "Game" },
  { key: "mobile", label: "Mobile" },
];

let activeFilter = "all";
const projectsGrid = document.getElementById("projectsGrid");
const projectsFilterBar = document.getElementById("projectsFilterBar");

function renderFilterBar() {
  projectsFilterBar.innerHTML = PROJECT_FILTERS.map(
    (f) =>
      `<button class="filter-pill${f.key === activeFilter ? " active" : ""}" data-filter="${f.key}">${f.label}</button>`
  ).join("");

  projectsFilterBar.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      renderFilterBar();
      renderProjects();
    });
  });
}

function renderProjects() {
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category && p.category.includes(activeFilter));

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `<div class="projects-empty">No projects in this category yet.</div>`;
    return;
  }

  projectsGrid.innerHTML = filtered
    .map((p) => {
      const realIndex = projects.indexOf(p);
      return `
    <button class="project-card" data-index="${realIndex}">
      <span class="project-expand-hint">Tap for details ↗</span>
      <div class="project-status ${p.status}">${p.statusLabel}</div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-stack">${p.stack.map((s) => techTag(s, "stack")).join("")}</div>
    </button>
  `;
    })
    .join("");

  projectsGrid.querySelectorAll(".project-card").forEach((el) => {
    el.addEventListener("click", () => openProjectModal(Number(el.dataset.index)));
  });
}

renderFilterBar();
renderProjects();

// Project modal — injected once
document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div class="modal-overlay" id="projectModalOverlay">
    <div class="modal" id="projectModal">
      <div class="modal-header">
        <div class="modal-title" id="pModalTitle"></div>
        <button class="modal-close" id="pModalClose" aria-label="Close">✕</button>
      </div>
      <div class="modal-price-row">
        <span class="modal-badge" id="pModalStatus"></span>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">What it is</div>
        <p class="modal-section-text" id="pModalDesc"></p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Why I built it</div>
        <p class="modal-section-text" id="pModalWhy"></p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Tech stack</div>
        <div class="modal-stack-list" id="pModalStack"></div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Why this stack</div>
        <p class="modal-section-text" id="pModalWhyStack"></p>
      </div>
      <div class="modal-divider"></div>
      <a href="#" class="modal-github-cta" id="pModalGithub" target="_blank">
        <div class="cta-left">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
              1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
              2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
              1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16
              8c0-4.42-3.58-8-8-8Z"/>
          </svg>
          <span class="cta-name">View on GitHub</span>
        </div>
        <span class="cta-arrow">↗</span>
      </a>
    </div>
  </div>
`
);

function openProjectModal(index) {
  const p = projects[index];
  document.getElementById("pModalTitle").textContent = p.name;
  const statusEl = document.getElementById("pModalStatus");
  statusEl.textContent = p.statusLabel;
  statusEl.className = "modal-badge" + (p.status === "wip" ? " wip" : p.status === "done" ? " done" : "");
  document.getElementById("pModalDesc").textContent = p.desc;
  document.getElementById("pModalWhy").textContent = p.why;
  document.getElementById("pModalWhyStack").textContent = p.whyStack;
  document.getElementById("pModalStack").innerHTML = p.stack
    .map((s) => techTag(s, "modal"))
    .join("");
  document.getElementById("pModalGithub").href = p.github || "#";

  const overlay = document.getElementById("projectModalOverlay");
  overlay.style.display = "flex";
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("open")));
}

function closeProjectModal() {
  const overlay = document.getElementById("projectModalOverlay");
  overlay.classList.remove("open");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 350);
}

document.getElementById("pModalClose").addEventListener("click", closeProjectModal);
document.getElementById("projectModalOverlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeProjectModal();
});

/* ══════════════ RENDER: SKILLS ══════════════ */
const skillsGrid = document.getElementById("skillsGrid");
skillsGrid.innerHTML = skills
  .map(
    (g) => `
  <div class="skill-group">
    <div class="skill-group-name">${g.group}</div>
    <div class="skill-list">
      ${g.items
        .map((item) => {
          const url = iconUrl(item);
          return url
            ? `<span class="skill-item icon-only" title="${item}"><img src="${url}" alt="${item}" loading="lazy"></span>`
            : `<span class="skill-item">${item}</span>`;
        })
        .join("")}
    </div>
  </div>
`
  )
  .join("");

/* ══════════════ RENDER: SERVICES + MODAL ══════════════ */
const servicesList = document.getElementById("servicesList");
servicesList.innerHTML = services
  .map(
    (s, i) => `
  <div class="service-item" data-index="${i}">
    <div class="service-left">
      <span class="service-name">${s.name}</span>
      <span class="service-desc">${s.desc}</span>
    </div>
    <div class="service-right">
      <span class="service-price">${s.price}</span>
      <span class="service-arrow">→</span>
    </div>
  </div>
`
  )
  .join("");

document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div class="modal-overlay" id="serviceModalOverlay">
    <div class="modal" id="serviceModal">
      <div class="modal-header">
        <div class="modal-title" id="modalTitle"></div>
        <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
      </div>
      <div class="modal-price-row">
        <span class="modal-price" id="modalPrice"></span>
        <span class="modal-badge">Starting rate</span>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Project details</div>
        <div class="detail-grid" id="modalDetails"></div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Usual tech stack</div>
        <div class="modal-stack-list" id="modalStack"></div>
        <p class="modal-stack-note">Flexible — I adapt to your preferred stack.</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Terms & conditions</div>
        <div class="terms-list" id="modalTerms"></div>
      </div>
      <div class="modal-divider"></div>
      <a href="mailto:nathanielcoronacion3@gmail.com" class="modal-contact-cta">
        <div class="cta-left">
          <span class="cta-small">Contact Nathaniel</span>
          <span class="cta-name">nathanielcoronacion3@gmail.com</span>
          <span class="cta-email-text">Opens Gmail · reply within 24h</span>
        </div>
        <span class="cta-arrow">↗</span>
      </a>
    </div>
  </div>
`
);

function openServiceModal(index) {
  const s = services[index];
  document.getElementById("modalTitle").textContent = s.name;
  document.getElementById("modalPrice").textContent = s.price;
  document.getElementById("modalDetails").innerHTML = s.details
    .map(
      (d) =>
        `<div class="detail-card"><div class="detail-label">${d.label}</div><div class="detail-value">${d.value}</div></div>`
    )
    .join("");
  document.getElementById("modalStack").innerHTML = s.stack
    .map((t) => techTag(t, "modal"))
    .join("");
  document.getElementById("modalTerms").innerHTML = s.terms
    .map((t) => `<div class="term-item">${t}</div>`)
    .join("");

  const overlay = document.getElementById("serviceModalOverlay");
  overlay.style.display = "flex";
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("open")));
}

function closeServiceModal() {
  const overlay = document.getElementById("serviceModalOverlay");
  overlay.classList.remove("open");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 350);
}

servicesList.querySelectorAll(".service-item").forEach((el, i) => {
  el.addEventListener("click", () => openServiceModal(i));
});
document.getElementById("modalClose").addEventListener("click", closeServiceModal);
document.getElementById("serviceModalOverlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeServiceModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeServiceModal();
    closeProjectModal();
  }
});

/* ══════════════ GITHUB STATS (live) ══════════════ */
const GH_USER = "Tanjiro5834";

async function loadGithubStats() {
  const ghGrid = document.getElementById("ghGrid");
  try {
    const userRes = await fetch(`https://api.github.com/users/${GH_USER}`);
    if (!userRes.ok) throw new Error("GitHub user fetch failed");
    const user = await userRes.json();

    // Contribution calendar via a public read-only proxy (no auth token needed client-side)
    let totalCommits = null;
    let longestStreak = null;
    let calendarDays = null;
    try {
      const calRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`
      );
      if (calRes.ok) {
        const cal = await calRes.json();
        if (cal.total) {
          const years = Object.keys(cal.total);
          totalCommits = years.reduce((sum, y) => sum + (cal.total[y] || 0), 0);
        }
        if (cal.contributions) {
          calendarDays = cal.contributions;
          let streak = 0,
            maxStreak = 0;
          for (const day of cal.contributions) {
            if (day.count > 0) {
              streak++;
              maxStreak = Math.max(maxStreak, streak);
            } else {
              streak = 0;
            }
          }
          longestStreak = maxStreak;
        }
      }
    } catch (_) {
      /* calendar endpoint optional; fall back gracefully */
    }

    const stats = [
      { num: user.public_repos ?? "—", label: "Public repos" },
      { num: user.followers ?? "—", label: "Followers" },
      { num: totalCommits !== null ? totalCommits : "—", label: "Commits (last yr)" },
      { num: longestStreak !== null ? `${longestStreak}d` : "—", label: "Longest streak" },
    ];

    ghGrid.innerHTML = stats
      .map(
        (s) => `
      <div class="gh-stat">
        <span class="gh-num">${s.num}</span>
        <span class="gh-label">${s.label}</span>
      </div>
    `
      )
      .join("");

    if (calendarDays) {
      renderGhCalendar(calendarDays.slice(-140));
    } else {
      document.getElementById("ghCalendar").innerHTML =
        '<div class="gh-error">Contribution graph unavailable — view live on GitHub.</div>';
    }
  } catch (err) {
    ghGrid.innerHTML = `<div class="gh-error" style="grid-column: 1 / -1;">Couldn't load GitHub stats right now — <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--accent)">view profile directly ↗</a></div>`;
    document.getElementById("ghCalendar").innerHTML = "";
  }
}

function renderGhCalendar(days) {
  const cal = document.getElementById("ghCalendar");
  const maxCount = Math.max(...days.map((d) => d.count), 1);
  cal.innerHTML = days
    .map((d) => {
      let level = 0;
      if (d.count > 0) {
        const ratio = d.count / maxCount;
        level = ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
      }
      return `<div class="gh-day" data-level="${level}" title="${d.date}: ${d.count} contribution${d.count === 1 ? "" : "s"}"></div>`;
    })
    .join("");
}

loadGithubStats();

/* ══════════════ SCROLL REVEAL ══════════════ */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
  io.observe(el);
});