document.getElementById('year').textContent = new Date().getFullYear();
// mobile nav
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
// copy placeholder contract
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  const text = document.getElementById('contractText').textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById('copyStatus').textContent = 'Copied (placeholder).';
  } catch {
    document.getElementById('copyStatus').textContent = 'Copy failed: select the text manually.';
  }
});
// canvas stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width = canvas.offsetWidth * devicePixelRatio;
  canvas.height = canvas.offsetHeight * devicePixelRatio;
  stars = Array.from({length: 90}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + .4,
    s: Math.random() * .35 + .08
  }));
}
resize(); addEventListener('resize', resize);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
(function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(st => {
    ctx.globalAlpha = .35 + Math.abs(Math.sin(Date.now() / 1400 + st.x)) * .55;
    ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
    if (!reduced) { st.y -= st.s; if (st.y < -2) st.y = canvas.height + 2; }
  });
  if (!reduced) requestAnimationFrame(draw);
})();
// subtle parallax on hero art
const art = document.querySelector('.hero-art');
document.querySelector('.hero').addEventListener('pointermove', e => {
  if (reduced) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  art.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
});
