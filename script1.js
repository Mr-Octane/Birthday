const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* FLOATING HEARTS */
function initFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const shapes = ['💗', '💕', '❣️'];

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = shapes[i % shapes.length];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    heart.style.opacity = `${0.35 + Math.random() * 0.35}`;

    container.appendChild(heart);
  }
}

/* FADE-UP SCROLL REVEAL */
function revealOnScroll() {
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
}

/* MAIN */
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();

  if (!prefersReducedMotion) {
    initFloatingHearts();
  }
});
