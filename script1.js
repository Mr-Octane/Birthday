const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 💖 FLOATING HEARTS
const initFloatingHearts = () => {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const heartShapes = ['💗', '💕', '❣️'];

  for (let i = 0; i < 40; i++) {
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

// ✨ SCROLL REVEAL
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-up").forEach(el => {
    el.classList.add("is-visible");
  });
});

// 🚀 MAIN LOAD
document.addEventListener('DOMContentLoaded', () => {
  const ENTRY_MS = 1200; // small delay for smooth feel

  const revealPage = () => {
    const hero = document.querySelector('#hero');
    if (hero) hero.classList.add('is-visible');

    revealOnScroll();
  };

  // show content quickly (no blocking animation anymore)
  setTimeout(revealPage, ENTRY_MS);

  // safety fallback (never blank page again)
  setTimeout(() => {
    document.querySelectorAll('.fade-up')
      .forEach((el) => el.classList.add('is-visible'));
  }, 3000);

  // 💖 hearts only (no confetti anymore)
  if (!prefersReducedMotion) {
    initFloatingHearts();
  }

  function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 3) + 's';

  document.querySelector('.hearts').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);

  // scroll arrow
  const arrow = document.querySelector('.scroll-arrow');
  if (arrow) {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      const gallery = document.querySelector('.gallery-section');
      if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

