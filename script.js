// poke the blob (works on tap too)
const m = document.getElementById('mascot');
m.addEventListener('pointerdown', () => {
  m.classList.remove('boing');
  void m.offsetWidth; // restart the animation
  m.classList.add('boing');
});
m.querySelector('svg').addEventListener('animationend', (e) => {
  if (e.animationName === 'boing') m.classList.remove('boing');
});
