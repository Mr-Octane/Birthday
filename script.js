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
const createEntryCelebration = (duration = 3500) => {
  if (prefersReducedMotion) return;
  const container = document.getElementById('entry-celebration');
  if (!container) return;

  const colors = ['#ffd1dc', '#fff1f6', '#ffd88a', '#ffe9f0', '#f8c8d8'];
  const confettiCount = 40;

  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const w = 6 + Math.round(Math.random() * 10);
    const h = w + Math.round(Math.random() * 6);
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = -Math.random() * 20 + 'vh';
    el.style.background = colors[i % colors.length];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    const delay = Math.random() * 0.6;
    const dur = 2.6 + Math.random() * 2;
    el.style.animation = `confetti-fall ${dur}s ${delay}s cubic-bezier(.2,.7,.3,1) forwards`;
    container.appendChild(el);
  }

  // a few poppers near the top center for celebration effect
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'popper';
    p.style.background = colors[i % colors.length];
    p.style.left = 45 + Math.random() * 10 + '%';
    p.style.bottom = '2%';
    const delay = 0.1 + Math.random() * 0.6;
    p.style.animation = `popper-move 1.2s ${delay}s cubic-bezier(.2,.7,.3,1) forwards`;
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
  const ENTRY_MS = 3200; // duration of entry animation (ms)
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
    
      setTimeout(() => {
  console.log("Removing confetti...");
  container.innerHTML = '';
  container.style.display = 'none';
}, duration + 700);
    });
  }
});
