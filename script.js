/* Portfolio motion — no libraries required */

const revealTargets = document.querySelectorAll(
  '.section-label, .about-grid, .section-heading, .skill-card, .project, .process-grid > div, .contact > *'
);

revealTargets.forEach((el, index) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

/* Subtle portrait parallax */
const visual = document.querySelector('.hero-visual');
if (visual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    visual.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
  }, { passive: true });
}

/* Mouse-follow tilt on the portrait */
const portrait = document.querySelector('.portrait-frame');
if (portrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  portrait.addEventListener('mousemove', (e) => {
    const rect = portrait.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 5;
    const ry = (px - 0.5) * 5;
    portrait.style.transform = `scale(1.015) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  portrait.addEventListener('mouseleave', () => {
    portrait.style.transform = '';
  });
}

/* Header shadow */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 20
    ? '0 8px 30px rgba(0,0,0,.06)'
    : 'none';
}, { passive: true });

/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
