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

// ── Service Modal ──
const serviceData = [
  {
    name: "Capstone / Thesis Development",
    price: "From ₱15,000",
    details: [
      { label: "Timeline", value: "3–6 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Source + docs" },
    ],
    stack: ["Java", "Spring Boot", "PHP", "MySQL", "PostgreSQL", "HTML/CSS/JS"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Final payment due before source code handoff.",
      "Includes ERD, SDLC documentation, and deployment guide.",
      "Client must provide complete requirements before kickoff.",
      "Scope changes after kickoff may affect timeline and price.",
      "No refunds once development has begun.",
    ]
  },
  {
    name: "Custom Software Development",
    price: "From ₱15,000",
    details: [
      { label: "Timeline", value: "4–8 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Source + docs" },
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
    ]
  },
  {
    name: "Web Development",
    price: "From ₱10,000",
    details: [
      { label: "Timeline", value: "2–5 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Deployed + source" },
    ],
    stack: ["PHP", "MySQL", "PostgreSQL", "HTML/CSS", "JavaScript", "Spring Boot", "Tailwind"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Hosting and domain costs not included unless stated.",
      "Final payment due before live deployment or source handoff.",
      "Client is responsible for providing content (text, images, logos).",
      "Scope changes after kickoff may affect timeline and price.",
      "No refunds once development has begun.",
    ]
  },
  {
    name: "Game Development",
    price: "From ₱8,000",
    details: [
      { label: "Timeline", value: "3–6 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "2 free · ₱750/extra" },
      { label: "Delivery", value: "Build + source" },
    ],
    stack: ["Unity (C#)", "LibGDX (Java)", "PyGame", "C++"],
    terms: [
      "50% downpayment required before development starts.",
      "2 free revision rounds. Additional revisions at ₱750 each.",
      "Art assets and audio must be provided by the client unless agreed.",
      "Final payment due before build or source code handoff.",
      "Game design document (GDD) must be agreed upon before kickoff.",
      "No refunds once development has begun.",
    ]
  },
  {
    name: "Desktop App Development",
    price: "From ₱8,000",
    details: [
      { label: "Timeline", value: "2–5 weeks" },
      { label: "Downpayment", value: "50% upfront" },
      { label: "Revisions", value: "3 free · ₱500/extra" },
      { label: "Delivery", value: "Installer + source" },
    ],
    stack: ["Java Swing/FX", "Electron.js", "WinForms (C#)", "Tkinter (Python)", "SQLite", "MySQL"],
    terms: [
      "50% downpayment required before development starts.",
      "3 free revision rounds. Additional revisions at ₱500 each.",
      "Windows installer included. macOS/Linux packaging on request.",
      "Final payment due before installer or source code handoff.",
      "Client must provide complete requirements before kickoff.",
      "No refunds once development has begun.",
    ]
  },
];

// Inject modal HTML into body
document.body.insertAdjacentHTML('beforeend', `
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
`);

function openServiceModal(index) {
  const s = serviceData[index];
  document.getElementById('modalTitle').textContent = s.name;
  document.getElementById('modalPrice').textContent = s.price;
  document.getElementById('modalDetails').innerHTML = s.details
    .map(d => `<div class="detail-card"><div class="detail-label">${d.label}</div><div class="detail-value">${d.value}</div></div>`)
    .join('');
  document.getElementById('modalStack').innerHTML = s.stack
    .map(t => `<span class="modal-stack-tag">${t}</span>`).join('');
  document.getElementById('modalTerms').innerHTML = s.terms
    .map(t => `<div class="term-item">${t}</div>`).join('');

  const overlay = document.getElementById('serviceModalOverlay');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));
}

function closeServiceModal() {
  const overlay = document.getElementById('serviceModalOverlay');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 250);
}

// Attach click handlers to service items (order matches serviceData array)
document.querySelectorAll('.service-item').forEach((el, i) => {
  el.addEventListener('click', () => openServiceModal(i));
});

document.getElementById('modalClose').addEventListener('click', closeServiceModal);
document.getElementById('serviceModalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeServiceModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeServiceModal();
});