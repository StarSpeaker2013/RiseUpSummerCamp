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
    '.info-card, .day-card, .act-card, .gallery figure, .timeline li, .section-head, .register-form, .cta-copy'
  )
  .forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

// Demo register handler (no backend) — keeps everything client-side
function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const note = document.getElementById('formNote');
  const data = Object.fromEntries(new FormData(form).entries());

  // Lightweight client-side validation (form already has required attrs)
  if (!data.parent || !data.camper || !data.email) {
    note.textContent = 'Please fill out all required fields.';
    note.classList.remove('success');
    return false;
  }

  // Persist locally so it survives reloads (demo only)
  try {
    const existing = JSON.parse(localStorage.getItem('riseup_registrations') || '[]');
    existing.push({ ...data, at: new Date().toISOString() });
    localStorage.setItem('riseup_registrations', JSON.stringify(existing));
  } catch (_) {}

  note.textContent = `🎉 Thanks, ${data.parent.split(' ')[0]}! We've saved ${data.camper}'s spot — we'll be in touch at ${data.email}.`;
  note.classList.add('success');
  form.reset();
  return false;
}

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
