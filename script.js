// ═══════════════════════ GLOW ═══════════════════════════════
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ═══════════════════════ BG GRID CANVAS ═════════════════════
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 60;
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= canvas.width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Accent dots at intersections near top
  ctx.fillStyle = 'rgba(79,156,249,0.15)';
  for (let x = 0; x <= canvas.width; x += size) {
    for (let y = 0; y <= 300; y += size) {
      const dist = Math.sqrt(Math.pow(x - canvas.width * 0.3, 2) + Math.pow(y, 2));
      if (dist < 400) {
        const alpha = (1 - dist / 400) * 0.25;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;
}
drawGrid();
window.addEventListener('resize', drawGrid);

// ═══════════════════════ SCROLL PROGRESS ════════════════════
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

// ═══════════════════════ NAV SCROLL ═════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ═══════════════════════ HERO ANIMATIONS ════════════════════
function animate(el, delay) {
  if (!el) return;
  el.style.transition = `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
}

window.addEventListener('load', () => {
  setTimeout(() => animate(document.getElementById('heroBadge'), 0), 100);
  setTimeout(() => animate(document.getElementById('heroName'), 0), 200);
  setTimeout(() => animate(document.getElementById('heroTitle'), 0), 300);
  setTimeout(() => animate(document.getElementById('heroTagline'), 0), 400);
  setTimeout(() => animate(document.getElementById('heroActions'), 0), 500);
  setTimeout(() => {
    const stats = document.getElementById('heroStats');
    if (stats) { stats.style.transition = 'opacity 1s 0.7s ease'; stats.style.opacity = '1'; }
  }, 200);
});

// ═══════════════════════ SCROLL REVEAL ══════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = Array.from(el.parentElement?.children || []);
      const idx = siblings.indexOf(el);
      const delay = (idx % 4) * 100;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Timeline items
const timelineObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
      timelineObs.unobserve(el);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline-item').forEach(el => timelineObs.observe(el));

// ═══════════════════════ PROJECT FILTERS ════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.style.transition = 'opacity 0.3s, transform 0.3s';
      card.style.opacity = show ? '1' : '0.2';
      card.style.transform = show ? 'scale(1)' : 'scale(0.97)';
    });
  });
});

// ═══════════════════════ ARCHITECTURE CODE ══════════════════
const archLines = [
`<span class="code-comment">// Travi — Layered Architecture</span>`,
``,
`<span class="code-keyword">package</span> <span class="code-accent">com.travi.architecture</span>;`,
``,
`<span class="code-comment">// ┌────────────────────────────────────┐</span>`,
`<span class="code-comment">// │        Presentation Layer          │  ← REST Controllers, DTOs</span>`,
`<span class="code-comment">// ├────────────────────────────────────┤</span>`,
`<span class="code-comment">// │         Service Layer              │  ← Business Logic, Validation</span>`,
`<span class="code-comment">// ├────────────────────────────────────┤</span>`,
`<span class="code-comment">// │        Repository Layer            │  ← Data Access, JDBC</span>`,
`<span class="code-comment">// ├────────────────────────────────────┤</span>`,
`<span class="code-comment">// │        Domain / Model              │  ← Entities, Value Objects</span>`,
`<span class="code-comment">// └────────────────────────────────────┘</span>`,
``,
`<span class="code-keyword">@RestController</span>`,
`<span class="code-keyword">@RequestMapping</span>(<span class="code-string">"/api/v1/trips"</span>)`,
`<span class="code-keyword">public class</span> <span class="code-class">TripController</span> {`,
``,
`  <span class="code-keyword">@PostMapping</span>`,
`  <span class="code-keyword">@PreAuthorize</span>(<span class="code-string">"hasRole('USER')"</span>)`,
`  <span class="code-keyword">public</span> ResponseEntity<<span class="code-class">TripDto</span>> createTrip(`,
`    <span class="code-keyword">@Valid @RequestBody</span> CreateTripRequest req,`,
`    <span class="code-keyword">@AuthenticationPrincipal</span> UserPrincipal principal) {`,
``,
`    <span class="code-keyword">return</span> ResponseEntity.<span class="code-accent">ok</span>(`,
`      tripService.<span class="code-accent">createTrip</span>(req, principal.<span class="code-accent">getId</span>())`,
`    );`,
`  }`,
`}`,
];

const archEl = document.getElementById('arch-code');
let lineIdx = 0;
function typeArch() {
  if (lineIdx >= archLines.length) return;
  archEl.innerHTML += archLines[lineIdx] + '\n';
  lineIdx++;
  setTimeout(typeArch, lineIdx < 5 ? 40 : 60);
}

const archObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { typeArch(); archObs.disconnect(); }
}, { threshold: 0.3 });
archObs.observe(document.getElementById('stack'));

// ═══════════════════════ MOBILE MENU ════════════════════════
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navClose = document.getElementById('navClose');

menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
navClose.addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ═══════════════════════ COMMAND PALETTE ════════════════════
const cmdOverlay = document.getElementById('cmd-overlay');
const cmdInput = document.getElementById('cmdInput');
const cmdResults = document.getElementById('cmdResults');

const cmdItems = [
  { label: 'About Me', sub: 'Who I am', href: '#about', icon: '👤' },
  { label: 'Tech Stack', sub: 'Languages & tools', href: '#stack', icon: '⚙' },
  { label: 'Experience', sub: 'Where I\'ve worked', href: '#experience', icon: '💼' },
  { label: 'Projects', sub: 'What I\'ve built', href: '#projects', icon: '🚀' },
  { label: 'Contact', sub: 'Get in touch', href: '#contact', icon: '✉' },
  { label: 'Email', sub: 'nathanielcoronacion3@gmail.com', href: 'mailto:nathanielcoronacion3@gmail.com', icon: '📧' },
  { label: 'GitHub', sub: 'github.com/Tanjiro5834', href: 'https://github.com/Tanjiro5834', icon: '⌥' },
  { label: 'LinkedIn', sub: 'Connect professionally', href: 'https://linkedin.com/in/nathaniel-coronacion-dev901278', icon: 'in' },
  { label: 'Travi', sub: 'Travel planning platform', href: '#projects', icon: '✈' },
  { label: 'Verdant Siege', sub: 'Multiplayer tower defense', href: '#projects', icon: '🎮' },
];

function renderCmd(query = '') {
  const q = query.toLowerCase();
  const filtered = q ? cmdItems.filter(i =>
    i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)
  ) : cmdItems;
  cmdResults.innerHTML = filtered.map(item => `
    <a class="cmd-result" href="${item.href}">
      <div class="cmd-result-icon">${item.icon}</div>
      <span class="cmd-result-label">${item.label}</span>
      <span class="cmd-result-sub">${item.sub}</span>
    </a>
  `).join('');
}

renderCmd();
cmdInput.addEventListener('input', () => renderCmd(cmdInput.value));

function openCmd() { cmdOverlay.classList.add('open'); cmdInput.focus(); cmdInput.value = ''; renderCmd(); }
function closeCmd() { cmdOverlay.classList.remove('open'); }

document.getElementById('cmdBtn').addEventListener('click', openCmd);
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmd(); }
  if (e.key === 'Escape') closeCmd();
});
cmdOverlay.addEventListener('click', e => { if (e.target === cmdOverlay) closeCmd(); });

// ═══════════════════════ STATS COUNTER ══════════════════════
function countUp(el, target, suffix = '', duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.innerHTML = Math.floor(start) + '<span>' + suffix + '</span>';
    if (start >= target) clearInterval(timer);
  }, 16);
}

const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    // Already visible from hero load — just a visual hook
    statsObs.disconnect();
  }
}, { threshold: 0.5 });
if (document.getElementById('heroStats')) statsObs.observe(document.getElementById('heroStats'));

// ═══════════════════════ SMOOTH SECTION ANCHORS ═════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════ THEME TOGGLE ════════════════════════
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const htmlEl = document.documentElement;

function applyTheme(mode) {
  if (mode === 'light') {
    htmlEl.classList.add('light');
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    htmlEl.classList.remove('light');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
  localStorage.setItem('theme', mode);
}

// Load saved preference
const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.classList.contains('light') ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
});


// ═══════════════════════ PROJECT MODAL ═══════════════════════
const PROJECTS = [
  {id:"travi",name:"Travi",status:"For Deployment",statusClass:"status-deployed",stack:["Spring Boot","PostgreSQL","Flyway","Docker","Nginx","JavaScript"],repo:"https://github.com/Tanjiro5834/travi",why:"Built to solve group travel planning with hierarchical itineraries, JWT auth, RBAC, and AI-ready data structure.",features:["Hierarchical itinerary: Trip→Day→Activity","JWT auth + RBAC","Admin dashboard","Docker + Nginx","Flyway migrations"],architecture:"Layered architecture: Controllers→Services→Repositories→Domain. REST APIs, normalized DB with FK constraints, Redis caching."},
  {id:"verdant-siege",name:"Verdant Siege",status:"In Progress",statusClass:"status-progress",stack:["Java","Spring Boot","React","PostgreSQL","Redis","Docker","WebSockets"],repo:"https://github.com/Tanjiro5834/verdant-siege",why:"Real-time multiplayer tower defense with WebSocket sync, Redis sessions, and scalable backend.",features:["WebSocket game sync","Redis leaderboards","Multiplayer backend","React client"],architecture:"STOMP over WebSocket, Redis pub/sub, server-authoritative game loop, PostgreSQL for persistence."},
  {id:"school-cms",name:"School CMS Platform",status:"Completed",statusClass:"status-completed",stack:["PHP MVC","PDO","MySQL","Tailwind CSS","JavaScript","Electron"],repo:"https://github.com/Tanjiro5834/thomas_aquinas",why:"Full CMS for school with RBAC, analytics, and custom cache-aside reducing DB overhead 10-30%.",features:["RBAC multi-role","Analytics dashboard","Cache-aside (JSON+MD5)","Electron desktop tools"],architecture:"Custom PHP MVC, PDO prepared statements, flat-file caching with TTL, roles-permissions RBAC."},
  {id:"bibo",name:"BIBO",status:"In Progress",statusClass:"status-progress",stack:["Java","Spring Boot","MySQL","JavaScript"],repo:"https://github.com/Tanjiro5834/bibo",why:"AI-driven e-learning for out-of-school youth with adaptive learning engine and gamification.",features:["Adaptive learning","AI tutoring","Progress tracking","Gamification","Parent dashboards"],architecture:"Modular monolith, knowledge graph mastery tracking, event-sourced gamification, webhook-ready AI."},
  {id:"vybe",name:"VYBE",status:"In Progress",statusClass:"status-progress",stack:["Spring Boot","MySQL","JavaScript","Tailwind CSS"],repo:"https://github.com/Tanjiro5834/vybe",why:"Music discovery platform with recommendation-ready data model and isolated monetization layer.",features:["Music discovery","Listening history","Playlist management","Monetization ready"],architecture:"Normalized entities (Users,Tracks,Artists,ListeningEvents), time-series data, hybrid recommendation engine planned."},
  {id:"hvac",name:"HVAC E-Commerce",status:"Completed",statusClass:"status-completed",stack:["PHP MVC","PDO","MySQL","JavaScript"],repo:"https://github.com/Tanjiro5834/aircon_website",why:"HVAC marketplace with inventory, service booking workflows, and admin dashboards.",features:["Product catalog","Booking scheduler","Customer accounts","Admin dashboard"],architecture:"MVC pattern, booking state machine (Pending→Confirmed→Completed), PDO transactions."},
  {id:"typedash",name:"TYPEDASH",status:"Completed",statusClass:"status-completed",stack:["Spring Boot","MySQL","JavaScript"],repo:"https://github.com/Tanjiro5834/typinggame",why:"Typing test with leaderboards, WPM tracking, and server-side score validation.",features:["WPM tracking","Global leaderboard","Session analytics","Multiple test modes"],architecture:"Client-side WPM calc + server validation, computed columns for ranking, REST endpoints."},
  {id:"mitolohiya",name:"MITOLOHIYA",status:"Completed",statusClass:"status-completed",stack:["C#","Unity"],repo:"https://docs.google.com/document/d/1zHovC0SUZhQt_hkvR4NLVXy1JBO4WuxNXRbYTxu4mlw/edit?usp=sharing",why:"2D turn-based card game inspired by Filipino mythology. Thesis project combining game dev with cultural representation.",features:["Turn-based card battle","Filipino mythology theme","AI opponent","Deck building"],architecture:"FSM for battle states, ScriptableObject card system with IEffect interface, weighted AI scoring."}
];

const modalOverlay = document.getElementById('project-modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalCloseBtn = document.getElementById('modal-close-btn');

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  // Populate
  const badge = document.getElementById('modal-status-badge');
  badge.textContent = p.status;
  badge.className = p.statusClass;

  document.getElementById('modal-title').textContent = p.name;

  const stackEl = document.getElementById('modal-stack');
  stackEl.innerHTML = p.stack.map(s => `<span class="modal-tag">${s}</span>`).join('');

  document.getElementById('modal-why').textContent = p.why;

  const featEl = document.getElementById('modal-features');
  featEl.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  document.getElementById('modal-architecture').textContent = p.architecture;

  document.getElementById('modal-repo-link').href = p.repo;

  // Open
  document.body.style.overflow = 'hidden';
  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => modalOverlay.setAttribute('aria-hidden', 'true'), 300);
}

modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal(); });

if (menuBtn && mobileNav && navClose) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  
  navClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

const SERVICES = {
  thesis: {
    name: "Thesis Development",
    price: "₱15,000",
    desc: "A comprehensive end-to-end thesis development service designed for Computer Science and IT students. This includes requirements gathering, system design (UML diagrams, ERDs), full-stack implementation, documentation assistance, and deployment support. I ensure academic compliance while delivering production-ready codebases that can be defended confidently during presentations.",
    subtext: "Revision: ₱4,500 each",
    stack: ["Java", "Spring Boot", "MySQL/PostgreSQL", "Tailwind CSS", "JavaScript", "Docker"]
  },
  web: {
    name: "Web Development",
    price: "₱40,000",
    desc: "Professional web development services covering frontend and backend. I build responsive, scalable, and secure applications with clean architecture. Includes RESTful APIs, authentication/authorization, database design, and deployment pipelines. Ideal for startups, school systems, or business platforms needing robust online presence.",
    subtext: "Revision: ₱3,500 each",
    stack: ["Spring Boot", "React/Vanilla JS", "PostgreSQL/MySQL", "Redis", "Docker", "Nginx"]
  },
  game: {
    name: "Game Development",
    price: "₱5,500",
    desc: "Custom game development from concept to playable product. I specialize in 2D/3D mechanics, multiplayer systems, and AI-driven opponents. Services include game loop design, asset integration, and deployment across PC or web. Perfect for thesis projects or indie developers wanting a unique gameplay experience.",
    subtext: "Revision: ₱2,000 each",
    stack: ["C#", "Unity", "Java (Spring Boot for multiplayer backends)", "WebSockets", "PostgreSQL", "Redis"]
  },
  desktop: {
    name: "Desktop Application",
    price: "₱10,000",
    desc: "Cross-platform desktop applications tailored for business workflows, internal tools, or specialized utilities. I design intuitive UIs, efficient data handling, and offline-first capabilities. Includes installer packaging, database integration, and optional Electron-based dashboards for hybrid web/desktop solutions.",
    subtext: "Revision: ₱3,000 each",
    stack: ["Electron", "Java", "Spring Boot", "MySQL/PostgreSQL", "Tailwind CSS", "JavaScript"]
  },
  custom: {
    name: "Custom Software",
    price: "₱5,500",
    desc: "Bespoke software solutions such as automation scripts, API integrations, or specialized logic components. I focus on clean, modular code that solves specific pain points — whether it’s streamlining workflows, connecting systems, or building lightweight utilities. Delivered with documentation and deployment support.",
    subtext: "Revision: ₱1,500 each",
    stack: ["Java", "Spring Boot", "Node.js", "REST APIs", "MySQL/PostgreSQL", "Docker"]
  }
};

const serviceModalOverlay = document.getElementById('service-modal-overlay');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalPrice = document.getElementById('service-modal-price');
const serviceModalDesc = document.getElementById('service-modal-desc');
const serviceModalSub = document.getElementById('service-modal-sub');
const serviceModalClose = document.getElementById('service-modal-close');

function openService(id) {
  const s = SERVICES[id];
  if (!s) return;
  serviceModalTitle.textContent = s.name;
  serviceModalPrice.textContent = "Starting Price: " + s.price;
  serviceModalDesc.textContent = s.desc;
  serviceModalSub.textContent = s.subtext;
  serviceModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeService() {
  serviceModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

serviceModalClose.addEventListener('click', closeService);
serviceModalOverlay.addEventListener('click', e => {
  if (e.target === serviceModalOverlay) closeService();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && serviceModalOverlay.classList.contains('open')) closeService();
});

// Ensure services and policies sections are observed for scroll reveal
const servicesSection = document.getElementById('services');
const policiesSection = document.getElementById('policies');

if (servicesSection) {
  const serviceReveals = servicesSection.querySelectorAll('.reveal');
  serviceReveals.forEach(el => observer.observe(el));
}

if (policiesSection) {
  const policyReveals = policiesSection.querySelectorAll('.reveal');
  policyReveals.forEach(el => observer.observe(el));
}

// Optional: Add staggered delay for service cards based on index
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  card.style.setProperty('--order', index);
});
/* ═══════════════════════════════════════════
   PROFESSIONAL SERVICES MODAL
═══════════════════════════════════════════ */
const serviceData = {
  capstone: {
    icon: '🎓',
    title: 'Capstone / Thesis Development',
    price: '₱8,000',
    description: 'I build complete capstone and thesis systems from scratch — fully functional, properly documented, and aligned with academic requirements. Whether it\'s a web system, desktop app, or a mixed platform, I handle the full SDLC: from requirements analysis and ERD design to implementation, testing, and documentation.',
    includes: [
      'Full system development (web, desktop, or hybrid)',
      'Entity-Relationship Diagram (ERD) and database design',
      'Complete SDLC documentation (Iterative Waterfall or Agile)',
      'User roles and access control (RBAC)',
      'Admin dashboard and reporting features',
      'Source code with clean MVC architecture',
      'Deployment-ready build and setup guide',
      'Revision support during defense preparation',
    ],
    terms: [
      { key: 'Downpayment', val: '50% before work begins' },
      { key: 'Balance', val: '50% upon delivery' },
      { key: 'Timeline', val: '3 – 6 weeks depending on scope' },
      { key: 'Revisions', val: '2 rounds of minor revisions free' },
      { key: 'Ownership', val: 'Full source code transferred on final payment' },
      { key: 'Rush Fee', val: '+30% for under 2-week turnaround' },
    ],
    note: 'Documentation includes system proposal, technical specifications, test plans, and user manual. Scope is finalized before development starts to avoid scope creep.',
  },
  game: {
    icon: '🎮',
    title: 'Game Development',
    price: '₱5,000',
    description: 'I develop 2D and 3D games using Unity, LibGDX (Java), or PyGame. From casual single-player games to real-time multiplayer systems with leaderboards and matchmaking — I architect the game systems, implement the mechanics, and deliver a polished build.',
    includes: [
      '2D or 3D game development (Unity / LibGDX / PyGame)',
      'Game mechanics, physics, and collision systems',
      'Player progression, scoring, and leaderboard',
      'UI/UX: menus, HUD, game over/win screens',
      'Real-time multiplayer support (if required)',
      'Sound integration and basic animations',
      'Packaged build (Windows executable or web build)',
      'Source project files included',
    ],
    terms: [
      { key: 'Downpayment', val: '50% before work begins' },
      { key: 'Balance', val: '50% upon delivery of build' },
      { key: 'Timeline', val: '2 – 5 weeks depending on complexity' },
      { key: 'Revisions', val: '2 rounds of gameplay tweaks included' },
      { key: 'Platform', val: 'Windows / Web / Android (scope-dependent)' },
      { key: 'Rush Fee', val: '+30% for under 10-day turnaround' },
    ],
    note: 'Multiplayer, AI opponents, procedural generation, or advanced physics each add to the base price. A detailed scope discussion is done before any commitment.',
  },
  web: {
    icon: '🌐',
    title: 'Web Development',
    price: '₱6,000',
    description: 'I build full-stack web systems — from REST API backends with Spring Boot or PHP MVC, to complete platforms with admin dashboards, authentication, payment integration, and frontend UIs. Every system is built with clean architecture, security best practices, and scalability in mind.',
    includes: [
      'Full-stack web system (backend + frontend)',
      'REST API design and implementation',
      'Database design, migrations, and optimization',
      'JWT authentication and role-based access control',
      'Admin dashboard with CRUD and reporting',
      'Third-party integrations (payment, SMS, email, etc.)',
      'Security: CSRF protection, input sanitization, HTTPS',
      'Deployment-ready with Nginx/Apache configuration',
    ],
    terms: [
      { key: 'Downpayment', val: '50% before work begins' },
      { key: 'Balance', val: '50% upon final delivery' },
      { key: 'Timeline', val: '3 – 8 weeks depending on features' },
      { key: 'Revisions', val: '2 rounds of UI/UX revisions included' },
      { key: 'Hosting', val: 'Client provides hosting; setup assistance included' },
      { key: 'Rush Fee', val: '+30% for under 2-week turnaround' },
    ],
    note: 'Additional modules (e.g. real-time features via WebSocket, IoT integration, mobile API) are scoped and priced separately. A feature list is agreed upon before development begins.',
  },
  desktop: {
    icon: '🖥️',
    title: 'Desktop App Development',
    price: '₱5,000',
    description: 'I build cross-platform desktop applications using Java Swing/FX, Electron.js, WinForms (C#), or Tkinter (Python). From internal business tools and POS systems to inventory management and operational dashboards — I deliver functional, user-friendly desktop software.',
    includes: [
      'Desktop application with full UI (Java / Electron / C# / Python)',
      'Database integration (SQLite, MySQL, or MS SQL)',
      'User authentication and role management',
      'CRUD operations and data management screens',
      'Report generation and data export (PDF/Excel)',
      'Installer/packaged executable for Windows',
      'Source code with documentation',
      'Basic user manual included',
    ],
    terms: [
      { key: 'Downpayment', val: '50% before work begins' },
      { key: 'Balance', val: '50% upon delivery' },
      { key: 'Timeline', val: '2 – 5 weeks depending on scope' },
      { key: 'Revisions', val: '2 rounds of UI revisions included' },
      { key: 'Platform', val: 'Windows-first; cross-platform on request' },
      { key: 'Rush Fee', val: '+30% for under 10-day turnaround' },
    ],
    note: 'Hardware integrations (barcode scanners, printers, RFID, etc.) and network/server syncing features are scoped separately and may affect pricing.',
  },
};

function openServiceModal(key) {
  const data = serviceData[key];
  if (!data) return;

  const termsHTML = data.terms.map(t => `
    <div class="svc-term-item">
      <div class="svc-term-key">${t.key}</div>
      <div class="svc-term-val">${t.val}</div>
    </div>
  `).join('');

  const includesHTML = data.includes.map(i => `<li>${i}</li>`).join('');

  document.getElementById('svc-modal-inner').innerHTML = `
    <div class="svc-modal-header">
      <div class="svc-modal-icon">${data.icon}</div>
      <div class="svc-modal-title">${data.title}</div>
      <div class="svc-modal-price-row">
        <span class="svc-modal-price-label">Starting at</span>
        <span class="svc-modal-price">${data.price}</span>
      </div>
    </div>

    <div class="svc-section">
      <div class="svc-section-label">Overview</div>
      <p>${data.description}</p>
    </div>

    <div class="svc-section">
      <div class="svc-section-label">What's Included</div>
      <ul class="svc-list">${includesHTML}</ul>
    </div>

    <div class="svc-section">
      <div class="svc-section-label">Terms & Timelines</div>
      <div class="svc-terms-grid">${termsHTML}</div>
    </div>

    <div class="svc-section">
      <div class="svc-section-label">Important Notes</div>
      <p>${data.note}</p>
    </div>

    <div class="svc-modal-footer">
      <a href="mailto:nathanielcoronacion3@gmail.com?subject=Inquiry: ${encodeURIComponent(data.title)}" class="svc-cta">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1 5l6 4 6-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        Get in Touch
      </a>
    </div>
  `;

  const overlay = document.getElementById('svc-modal-overlay');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSvcModal() {
  const overlay = document.getElementById('svc-modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('svc-modal-close').addEventListener('click', closeSvcModal);
document.getElementById('svc-modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeSvcModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSvcModal();
});