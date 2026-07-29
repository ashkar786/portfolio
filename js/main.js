/**
 * Portfolio — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initContactForm();
  initActiveNavLink();
});

/* ---- Sticky header & mobile menu ---- */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll reveal animations ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---- Active nav link on scroll ---- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: `-${getHeaderHeight()}px 0px -50% 0px` }
  );

  sections.forEach((section) => observer.observe(section));
}

function getHeaderHeight() {
  return document.getElementById('header').offsetHeight;
}

/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate form submission — replace with your backend or Formspree/Netlify Forms
    setTimeout(() => {
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;
      successMsg.hidden = false;

      setTimeout(() => {
        successMsg.hidden = true;
      }, 5000);
    }, 1200);
  });
}
