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
const sections = ['overview', 'schedule', 'days', 'gallery', 'register']
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

// Hero photo carousel — rotate through all camp images
(function setupHeroCarousels() {
  const images = [
    'images/image1.png',
    'images/image2.jpeg',
    'images/image3.png',
    'images/image4.png',
    'images/image5.png',
    'images/image6.png',
    'images/image7.png',
    'images/image8.png',
    'images/image9.png',
    'images/image10.png',
    'images/image11.png',
    'images/image12.jpg',
    'images/image13.png',
    'images/image14.png',
    'images/image15.png',
    'images/image.png',
    'images/image%20(1).png',
    'images/image%20(2).png',
    'images/image%20(3).png',
    'images/image%20(4).png',
    'images/image%20(5).png',
  ];

  const cards = document.querySelectorAll('.photo-card[data-carousel]');
  if (!cards.length) return;

  const cardStates = [];

  cards.forEach((card) => {
    images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'RiseUp Summer Camp moment';
      img.loading = i < 2 ? 'eager' : 'lazy';
      card.appendChild(img);
    });

    const imgs = card.querySelectorAll('img');
    const offset = parseInt(card.getAttribute('data-carousel-offset') || '0', 10);
    const startIdx = ((offset % imgs.length) + imgs.length) % imgs.length;
    imgs[startIdx].classList.add('is-active');
    cardStates.push({ card, imgs, idx: startIdx });
  });

  const advance = () => {
    cardStates.forEach((state) => {
      state.imgs[state.idx].classList.remove('is-active');
      state.idx = (state.idx + 1) % state.imgs.length;
      state.imgs[state.idx].classList.add('is-active');
    });
  };

  let timer = setInterval(advance, 3500);

  // Pause when the tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
      timer = null;
    } else if (!timer) {
      timer = setInterval(advance, 3500);
    }
  });
})();

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
