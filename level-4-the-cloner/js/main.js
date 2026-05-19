/* ── Canvas dot-noise background ── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const GRID = 26;
  let w, h, dots = [];

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let x = GRID / 2; x < w; x += GRID) {
      for (let y = GRID / 2; y < h; y += GRID) {
        dots.push({ x, y, a: Math.random() * 0.35 + 0.02 });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,197,245,${d.a})`;
      ctx.fill();
    });
  }

  function tick() {
    dots.forEach(d => {
      d.a += (Math.random() - 0.5) * 0.015;
      if (d.a < 0.01) d.a = 0.01;
      if (d.a > 0.38) d.a = 0.38;
    });
    draw();
  }

  resize();
  window.addEventListener('resize', resize);

  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!noMotion) setInterval(tick, 2400);
  else draw();
})();

/* ── Feature slider: duplicate items for seamless loop ── */
(function () {
  const track = document.getElementById('slider-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

/* ── Feature card / pipeline card mouse-tracking glow ── */
document.querySelectorAll('.feat-card, .pipeline-card').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--cx', ((e.clientX - r.left) / r.width  * 100) + '%');
    el.style.setProperty('--cy', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});
