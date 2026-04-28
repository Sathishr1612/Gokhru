
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


/* ----- Mega menu: hover on desktop, click on mobile ----- */
(function () {
  const DESKTOP_BP = 992; // px — matches Bootstrap's lg breakpoint

  document.querySelectorAll('.dropdown-mega').forEach(function (li) {
    const toggle = li.querySelector('[data-bs-toggle="dropdown"]');
    if (!toggle) return;

    // Lazily get (or create) Bootstrap Dropdown instance
    function getBSDropdown() {
      return bootstrap.Dropdown.getOrCreateInstance(toggle, { autoClose: 'outside' });
    }

    let leaveTimer = null;

    function isDesktop() { return window.innerWidth >= DESKTOP_BP; }

    /* --- DESKTOP hover open --- */
    li.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      clearTimeout(leaveTimer);
      getBSDropdown().show();
    });

    li.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      // Small delay so cursor can travel from trigger → panel without close
      leaveTimer = setTimeout(function () {
        getBSDropdown().hide();
      }, 80);
    });

    /* --- MOBILE: prevent hover from firing (CSS already blocks it,
       but we also stop any BS show triggered by mouseenter) --- */
    // Nothing extra needed — CSS disables hover show on mobile.
  });
}());


/* Close mobile navbar when a non-dropdown link is clicked */
document.querySelectorAll('.navbar .nav-link:not(.dropdown-toggle)').forEach(link => {
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


/* =========================
   INSURANCE FORM HANDLING
   ========================= */

const insuranceForm = document.getElementById('insuranceForm');

if (insuranceForm) {
  insuranceForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.btn-submit-premium');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      <span>Processing...</span>
    `;

    // Simulate API call
    setTimeout(() => {
      // Show success state
      this.innerHTML = `
        <div class="text-center py-5 animate__animated animate__fadeIn">
          <div class="success-icon-wrap mb-4 mx-auto">
            <i class="fa-solid fa-circle-check text-success display-1"></i>
          </div>
          <h3 class="fw-800 mb-3">Request Received!</h3>
          <p class="text-muted">Thank you, <span class="fw-700 text-dark">${document.getElementById('fullName').value}</span>. Our insurance expert will contact you shortly at <span class="fw-700 text-dark">${document.getElementById('mobileNumber').value}</span>.</p>
          <button type="button" class="btn btn-light-brand mt-4 px-5 py-3 rounded-pill fw-800" data-bs-dismiss="modal">
            Close Window
          </button>
        </div>
      `;

      // Optional: Close modal after a delay
      // setTimeout(() => {
      //   const modalEl = document.getElementById('insuranceModal');
      //   const modal = bootstrap.Modal.getInstance(modalEl);
      //   if (modal) modal.hide();
      // }, 5000);

    }, 1500);
  });
}