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
const PROJECTS = [{"id": "travi", "name": "Travi", "status": "For Deployment", "statusClass": "status-deployed", "stack": ["Spring Boot", "PostgreSQL", "Flyway", "Docker", "Nginx", "JavaScript"], "repo": "https://github.com/Tanjiro5834/travi", "why": "I built Travi to solve a real pain point in group travel planning: fragmented tools, lost itineraries, and no unified way to manage trips day by day. As a backend engineer, I wanted to design a clean, layered system where the domain logic (Trip → Day → Activity) drives everything. It became a playground for implementing JWT auth, RBAC, Flyway migrations, and an AI-ready data structure — all wrapped in a production-grade Docker + Nginx setup. Travi is my reference architecture for what a modern, scalable travel backend should look like.", "features": ["Hierarchical itinerary system: Trip → Day → Activity", "JWT authentication with secure token management", "Role-based access control (User / Admin)", "Admin content management dashboard", "Modular vanilla JS frontend architecture", "Docker + Nginx production deployment pipeline", "Flyway-managed database migrations", "AI-ready data structure for future integrations"], "architecture": "Travi follows a strict layered architecture: Presentation Layer (REST controllers with DTOs) → Service Layer (business logic, validation, transactions) → Repository Layer (JDBC data access) → Domain Layer (entities, value objects). The API is RESTful with versioned endpoints (/api/v1/...). Database schema is fully normalized with foreign key constraints between trips, days, and activities. Flyway manages schema versioning. The cache-aside strategy uses Redis for session data and frequently accessed entities. Docker Compose orchestrates Spring Boot, PostgreSQL, Nginx, and Redis."}, {"id": "verdant-siege", "name": "Verdant Siege", "status": "In Progress", "statusClass": "status-progress", "stack": ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker", "WebSockets"], "repo": "https://github.com/Tanjiro5834/verdant-siege", "why": "I built Verdant Siege because I wanted to push beyond traditional web backends and tackle real-time multiplayer systems. Tower defense felt like the perfect fit: fast-paced state sync, WebSocket reliability, and leaderboard contention. This project let me implement Redis-backed session management, game state broadcasting, and a scalable multiplayer loop. It's an engineering challenge I took on to grow my skills in concurrency, low-latency communication, and event-driven architecture.", "features": ["Real-time WebSocket game state synchronization", "Redis-backed session and leaderboard management", "Scalable multiplayer backend on Spring Boot", "Tower defense game loop and wave system", "React-based game client interface", "Persistent player stats and progression system"], "architecture": "Real-time state is managed via STOMP over WebSocket with a custom message broker. Redis handles session affinity and pub/sub for cross-instance game state synchronization. The game loop runs server-authoritative with client-side prediction. Each match is a self-contained state machine managed by a GameSessionService. Player data is persisted in PostgreSQL with Redis caching for leaderboard hot paths."}, {"id": "school-cms", "name": "School CMS Platform", "status": "Completed", "statusClass": "status-completed", "stack": ["PHP MVC", "PDO", "MySQL", "Tailwind CSS", "JavaScript", "Electron"], "repo": "https://github.com/Tanjiro5834/school-cms", "why": "During my internship at Thomas Aquinas Institute of Learning, I was tasked with building the school's official website and admin dashboard from scratch. The existing system was static and unmanageable. I designed a full PHP MVC + PDO platform with granular RBAC for staff, events, news, and registration pipelines. The biggest win was implementing a custom cache-aside strategy (JSON + MD5 keys) that cut database overhead by 10–30%. This project taught me how to deliver production software under real institutional constraints.", "features": ["Official school website with full CMS", "Granular RBAC with multiple admin role tiers", "Analytics dashboard with operational metrics", "Custom cache-aside: JSON serialization + MD5 keys", "10–30% reduction in database overhead achieved", "Event, news, and personnel management modules", "Registration and content API pipelines", "Internal desktop tools built with Electron"], "architecture": "The system uses a custom PHP MVC framework with a front controller pattern. PDO with prepared statements handles all database interactions. The caching layer intercepts read queries: results are serialized to JSON, keyed by MD5 of the SQL + parameters, and stored as flat files with TTL. RBAC is implemented via a roles-permissions junction table with middleware-level checks. The Electron desktop app shares the same API client as the web frontend."}, {"id": "bibo", "name": "BIBO", "status": "In Progress", "statusClass": "status-progress", "stack": ["Java", "Spring Boot", "MySQL", "JavaScript"], "repo": "https://github.com/Tanjiro5834/bibo", "why": "BIBO was commissioned by a group of 4th-year CS students building their thesis on AI-driven learning for out-of-school youth. They hired me as the lead developer to turn their concept into a working platform. My role was to design the adaptive learning engine, AI tutoring callbacks, and gamification backend — while keeping the codebase clean enough for them to extend. It's a paid project I'm proud of because it bridges social impact with real engineering: progress tracking, parent dashboards, and an architecture that's ready for ML integration.", "features": ["Adaptive learning path engine", "AI-assisted tutoring system", "Progress tracking and learning analytics", "Gamification with rewards, badges, and streaks", "Parent and educator dashboards", "Lesson and curriculum content management"], "architecture": "The platform uses a microservice-inspired modular monolith. The adaptive engine tracks student mastery via a weighted knowledge graph. Each correct/incorrect answer adjusts difficulty and recommends Remedial or Enrichment paths. AI tutoring is implemented as webhook-ready callbacks for future ML service integration. Gamification uses an event-sourced point-and-badge system. Data is normalized with separate schemas for curriculum, progress, and gamification to maintain clean separation of concerns."}, {"id": "vybe", "name": "VYBE", "status": "In Progress", "statusClass": "status-progress", "stack": ["Spring Boot", "MySQL", "JavaScript", "Tailwind CSS"], "repo": "https://github.com/Tanjiro5834/vybe", "why": "VYBE started as a personal answer to music discovery fatigue. I wanted to build a platform where recommendations feel intentional, not black-boxed. As the backend engineer, I focused on designing a recommendation-ready data model (listening history, artist affinity, track metadata) and a monetization layer that doesn't leak into the core domain. VYBE is my ongoing exploration of data-driven systems and how to structure backend services for personalization at scale.", "features": ["Recommendation-driven music discovery", "User listening dashboard and history", "Playlist and library management", "Monetization-ready infrastructure", "Artist and track data management system"], "architecture": "The data model is built around normalized entities: Users, Tracks, Artists, ListeningEvents, and Playlists. Listening events are recorded as time-series data for collaborative filtering. The recommendation engine (planned) will use a hybrid approach: content-based (artist/track similarity) + collaborative (user listening patterns). Monetization is isolated in a separate module with Subscription and Payment entities, keeping core domain agnostic of billing logic."}, {"id": "hvac", "name": "HVAC E-Commerce", "status": "Completed", "statusClass": "status-completed", "stack": ["PHP MVC", "PDO", "MySQL", "JavaScript"], "repo": "https://github.com/Tanjiro5834/hvac-ecommerce", "why": "This was a complete HVAC marketplace I built for a client who needed inventory management, service booking workflows, and an operational backend. Off-the-shelf solutions didn't fit their niche (HVAC products + installation services). I designed a PHP MVC system with custom booking logic, customer accounts, and admin dashboards. The project reinforced my belief that clean architecture pays off even in smaller e-commerce systems — every change was easy to trace and deploy.", "features": ["HVAC product catalog with inventory management", "Service booking and scheduling workflows", "Customer account and order management", "Admin operational backend dashboard", "Product search, filter, and category system"], "architecture": "The application uses a classic MVC structure with routers mapping to controllers. The booking workflow has a custom state machine (Pending → Confirmed → In Progress → Completed/Cancelled). Inventory tracks stock levels with low-stock alerts. The service layer handles the business rules (availability windows, technician allocation, conflict detection). PDO with transactions ensures data integrity during checkout and booking."}, {"id": "typedash", "name": "TYPEDASH", "status": "Completed", "statusClass": "status-completed", "stack": ["Spring Boot", "MySQL", "JavaScript"], "repo": "https://github.com/Tanjiro5834/typedash", "why": "I built TYPEDASH as a pure backend-driven typing test with leaderboards and analytics. No heavy frameworks on the frontend — just JS, a Spring Boot API, and a normalized MySQL schema. I wanted to explore how to handle real-time WPM calculation, score validation server-side, and rank persistence without overcomplicating the stack. It's a small project that taught me how to build leaderboard systems that feel fast and fair.", "features": ["Real-time WPM and accuracy tracking", "Global leaderboard with ranking system", "Per-session analytics and historical stats", "Multiple typing test modes and difficulties", "User account and statistics persistence"], "architecture": "WPM is calculated client-side using keypress timestamps and validated server-side upon test completion to prevent manipulation. The leaderboard uses a computed column for WPM scores with proper indexes for rank queries. Spring Boot exposes REST endpoints for submitting results, fetching leaderboards (global/daily/monthly), and retrieving user history. The frontend is vanilla JS with no framework overhead."}, {"id": "mitolohiya", "name": "MITOLOHIYA", "status": "Completed", "statusClass": "status-completed", "stack": ["C#", "Unity"], "repo": "https://github.com/Tanjiro5834/mitolohiya", "why": "MITOLOHIYA is my undergraduate thesis. I chose to build a 2D turn-based card game rooted in Filipino mythology because I wanted to combine my love for game development with cultural representation. As the sole developer, I designed the entire battle system, AI opponent logic, card abilities, and deck management in Unity with C#. It wasn't just a thesis — it was my proof that my skills as a programmer can also design complex state machines, game loops, and engaging AI. This project represents the creative side of my engineering journey.", "features": ["2D turn-based card battle system", "Filipino mythology-inspired card roster", "Card ability, effect, and combo system", "AI opponent with decision-making logic", "Deck building and card collection", "Full Unity game loop and scene management"], "architecture": "The game uses a finite state machine for battle states: StartTurn → DrawPhase → PlayPhase → BattlePhase → EndTurn → CheckWinCondition. The card system follows a ScriptableObject-driven design where each card has an Effect class that implements IEffect with Apply() and Validate() methods. The AI uses a weighted scoring system to evaluate possible plays (damage potential, healing, board control, synergy) with some randomness to avoid predictability. Unity's event system decouples UI updates from game logic."}];

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
