
/* =========================
NAVBAR AND FOOTER
========================== */

const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));



document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {

    const nav = document.getElementById('mainNav');
    const bsCollapse = bootstrap.Collapse.getInstance(nav);

    if (window.innerWidth < 992 && bsCollapse) {
      bsCollapse.hide();
    }

  });
});


/* Active nav link on scroll */
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }

  });

});

/* =========================
HERO SECTION
========================== */

const heroItems = document.querySelectorAll('.hero-reveal');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('hero-show');
    }
  });
}, { threshold: 0.15 });

heroItems.forEach((item) => heroObserver.observe(item));



/* =========================
ABOUT SECTION
========================== */


const aboutItems = document.querySelectorAll('.about-reveal');

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('about-show');
    }
  });
}, { threshold: 0.14 });

aboutItems.forEach((item) => aboutObserver.observe(item));


/* =========================
PARTNER SECTION
========================== */

const partnershipItems = document.querySelectorAll('.partnership-reveal');

const partnershipObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('partnership-show');
    }
  });
}, { threshold: 0.14 });

partnershipItems.forEach((item) => partnershipObserver.observe(item));

/* =========================
SERVICE SECTION
========================== */

const servicesItems = document.querySelectorAll('.services-reveal');

const servicesObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('services-show');
    }
  });
}, { threshold: 0.14 });

servicesItems.forEach((item) => servicesObserver.observe(item));


/* =========================
SERVICE SECTION
========================== */

const whyItems = document.querySelectorAll('.why-reveal');

if ('IntersectionObserver' in window) {
  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('why-show');
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  whyItems.forEach((item) => whyObserver.observe(item));
} else {
  whyItems.forEach((item) => item.classList.add('why-show'));
}


/* =========================
TESTIMONIAYL SECTION
========================== */
const testimonialItems = document.querySelectorAll('.testimonial-reveal');

const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('testimonial-show');
    }
  });
}, { threshold: 0.14 });

testimonialItems.forEach((item) => testimonialObserver.observe(item));