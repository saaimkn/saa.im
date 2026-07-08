// saga search-bar shimmer on links
const RAINBOW = ['#22d3ee', '#2dd4bf', '#4ade80', '#facc15', '#fb923c', '#f472b6', '#c084fc'];
function colorAt(f) {
  const n = RAINBOW.length - 1;
  const i = Math.min(Math.floor(f * n), n - 1);
  const t = f * n - i;
  const c = (hex) => [1, 3, 5].map((k) => parseInt(hex.substr(k, 2), 16));
  const [a, b] = [c(RAINBOW[i]), c(RAINBOW[i + 1])];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(',')})`;
}
document.querySelectorAll('a').forEach((a) => {
  const chars = [...a.textContent];
  const n = chars.length;
  a.textContent = '';
  chars.forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = ch;
    if (ch === ' ') s.style.whiteSpace = 'pre';
    const f = n > 1 ? i / (n - 1) : 0.5;
    s.style.setProperty('--c', colorAt(f));
    s.style.setProperty('--d', `${(f * 0.5).toFixed(3)}s`);
    a.appendChild(s);
  });
  let sweeping = false;
  const sweep = () => {
    if (sweeping || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sweeping = true;
    a.classList.add('sweep');
    setTimeout(() => { a.classList.remove('sweep'); sweeping = false; }, 1100);
  };
  a.addEventListener('mouseenter', sweep);
  a.addEventListener('touchstart', sweep, { passive: true });
});
