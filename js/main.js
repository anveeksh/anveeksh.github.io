// ── CURSOR ──────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx - 2 + 'px';
  cursorDot.style.top  = my - 2 + 'px';
});
(function animCursor() {
  cx += (mx - cx) * 0.14; cy += (my - cy) * 0.14;
  cursor.style.left = cx - 9 + 'px'; cursor.style.top = cy - 9 + 'px';
  requestAnimationFrame(animCursor);
})();

// ── MATRIX RAIN ──────────────────────────────────────
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let cols, drops;
function initMatrix() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 16);
  drops = Array(cols).fill(1);
}
initMatrix();
window.addEventListener('resize', initMatrix);
const chars = '01アイウエオカキクケコ<>{}[]|#$@&*ABCDEF0x';
function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.045)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = Math.random() > 0.97 ? '#ffffff' : '#00ff41';
    ctx.font = '13px Share Tech Mono';
    ctx.fillText(ch, i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 55);

// ── CLOCK ─────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toISOString().replace('T',' ').slice(0,19) + ' UTC';
}
updateClock(); setInterval(updateClock, 1000);

// ── SCROLL REVEAL ─────────────────────────────────────
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => revObs.observe(r));

// ── COUNTER ANIMATION ─────────────────────────────────
function animCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = el.dataset.decimals || 0;
  let cur = 0, step = Math.max(1, Math.floor(target / 45));
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = decimals > 0 ? (cur / Math.pow(10, decimals)).toFixed(decimals) + suffix : cur + suffix;
    if (cur >= target) clearInterval(t);
  }, 35);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) {
      animCounter(e.target); cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

// ── SKILL BARS ────────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-fill').forEach(b => barObs.observe(b));

// ── TYPEWRITER ────────────────────────────────────────
function typewriter(el, text, speed = 65) {
  el.textContent = '';
  let i = 0;
  function next() {
    if (i < text.length) {
      el.textContent = text.slice(0, ++i) + (i < text.length ? '_' : '');
      setTimeout(next, speed + Math.random() * 50);
    } else { el.textContent = text; }
  }
  setTimeout(next, 300);
}
const nameEl = document.getElementById('typedName');
if (nameEl) typewriter(nameEl, nameEl.dataset.text || nameEl.textContent);

// ── ACTIVE NAV ────────────────────────────────────────
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});
