const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initFloatingHearts = () => {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const heartShapes = ['💗', '💕', '❣️'];

  // Increased from 16 to 40 hearts for more animation
  for (let i = 0; i < 40; i += 1) {
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

document.addEventListener('DOMContentLoaded', () => {
  // Reveal hero + other sections FIRST, independent of the confetti effect.
  // This runs no matter what happens with the animations below, so the
  // page can never end up permanently blank.
  const ENTRY_MS = 3000; // duration of entry animation (ms)

  const revealPage = () => {
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.classList.add('is-visible');
    }
    revealOnScroll();
  };

  setTimeout(revealPage, ENTRY_MS - 300);
  // Absolute safety net: no matter what, force everything visible after 5s.
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('is-visible'));
  }, 5000);

  // Purely decorative effects go in their own try/catch so a failure here
  // (e.g. an unsupported animation on some browsers) can never block the
  // reveal logic above.
  try {
    if (!prefersReducedMotion) {
      initFloatingHearts();
    }
    createEntryCelebration(ENTRY_MS);
  } catch (err) {
    console.error('Entry celebration failed (page content is unaffected):', err);
    const container = document.getElementById('entry-celebration');
    if (container) container.remove();
  }

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
