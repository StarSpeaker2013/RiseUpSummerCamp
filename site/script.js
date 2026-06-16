// Simple reveal-on-scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(
    '.info-card, .day-card, .act-card, .gallery figure, .timeline li, .section-head, .signup-card, .cta-copy'
  )
  .forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

// Active nav highlight on scroll
const sections = ['overview', 'schedule', 'activities', 'days', 'gallery', 'register']
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll('.nav-links a');

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => spy.observe(s));

// Mobile hamburger menu toggle
(function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when a link inside the menu is clicked
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when window resizes back to desktop width
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 800) closeMenu();
    }, 100);
  });
})();
