document.addEventListener('DOMContentLoaded', () => {

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href').includes(current)) {
        a.style.color = 'var(--orange)';
      }
    });
  });

  // Mobile Menu
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('menuClose');

  if (btn && menu && close) {
    btn.addEventListener('click', () => menu.classList.add('open'));
    close.addEventListener('click', () => menu.classList.remove('open'));
  }

  // Expose global close function for inline onclicks
  window.closeMM = function() {
    if (menu) menu.classList.remove('open');
  };

  // FAQ Accordion
  const faqs = document.querySelectorAll('.faq-q');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      // Close others
      faqs.forEach(other => {
        if (other !== faq) {
          other.classList.remove('open');
          other.nextElementSibling.classList.remove('open');
        }
      });
      // Toggle current
      faq.classList.toggle('open');
      faq.nextElementSibling.classList.toggle('open');
    });
  });

  // Intersection Observer for scroll animations (.fi to .vis)
  const fadeElements = document.querySelectorAll('.fi');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Form submission mock
  const form = document.getElementById('supportForm');
  const formOk = document.getElementById('formOk');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formOk.classList.add('show');
      setTimeout(() => formOk.classList.remove('show'), 5000);
      form.reset();
    });
  }

});
