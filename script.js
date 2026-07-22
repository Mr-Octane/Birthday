const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initFloatingHearts = () => {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const heartShapes = ['💗', '💕', '❣️'];

  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartShapes[i % heartShapes.length];
    heart.style.left = `${Math.random() * 80 + 10}%`;
    heart.style.top = `${Math.random() * 70 + 10}%`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    heart.style.opacity = `${0.35 + Math.random() * 0.35}`;
    container.appendChild(heart);
  }
};

/* Create a lightweight entry celebration: confetti + poppers.
   Confetti is CSS-animated and removed after a short timeout to avoid blocking.
*/
const createEntryCelebration = (duration = 4000) => {
  if (prefersReducedMotion) return;
  const container = document.getElementById('entry-celebration');
  if (!container) return;

  const colors = ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#2979F3', '#00B0FF', '#00E5FF', '#1DE9B6', '#00E676', '#76FF03', '#FFEA00', '#FFC400', '#FF9100', '#FF3D00'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const w = 8 + Math.round(Math.random() * 12);
    const h = w + Math.round(Math.random() * 6);
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = -Math.random() * 20 + 'vh';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    const delay = Math.random() * 0.5;
    const dur = 3 + Math.random() * 1.5;
    el.style.animation = `confetti-fall ${dur}s ${delay}s cubic-bezier(.2,.7,.3,1) forwards`;
    container.appendChild(el);
  }

  // a few poppers near the top center for celebration effect
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'popper';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = 45 + Math.random() * 10 + '%';
    p.style.bottom = '2%';
    const delay = 0.1 + Math.random() * 0.5;
    p.style.animation = `popper-move 1.5s ${delay}s cubic-bezier(.2,.7,.3,1) forwards`;
    container.appendChild(p);
  }

  // remove the overlay after duration + small buffer
  setTimeout(() => {
    container.innerHTML = '';
    container.remove();
  }, duration + 700);
};

const revealOnScroll = () => {
  const elements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
};

if (!prefersReducedMotion) {
  initFloatingHearts();
}

document.addEventListener('DOMContentLoaded', () => {
  // play entry celebration first, then reveal hero and other sections
  const ENTRY_MS = 4000; // duration of entry animation (ms)
  createEntryCelebration(ENTRY_MS);

  // initialize reveal after entry finishes, slight buffer for smoothness
  setTimeout(() => {
    revealOnScroll();
  }, ENTRY_MS - 300);

  // wire scroll arrow to gallery
  const arrow = document.querySelector('.scroll-arrow');
  if (arrow) {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      const gallery = document.querySelector('.gallery-section');
      if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
