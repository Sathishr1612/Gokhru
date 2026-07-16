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
  const DESKTOP_BP = 992; 

  document.querySelectorAll('.dropdown-mega').forEach(function (li) {
    const toggle = li.querySelector('[data-bs-toggle="dropdown"]');
    if (!toggle) return;

   
    function getBSDropdown() {
      return bootstrap.Dropdown.getOrCreateInstance(toggle, { autoClose: 'outside' });
    }

    let leaveTimer = null;

    function isDesktop() { return window.innerWidth >= DESKTOP_BP; }

    
    li.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      clearTimeout(leaveTimer);
      getBSDropdown().show();
    });

    li.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      leaveTimer = setTimeout(function () {
        getBSDropdown().hide();
      }, 80);
    });


  });
}());


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
   FORM HANDLING (MODAL & PAGE)
   ========================= */

const scriptURL = "https://script.google.com/macros/s/AKfycbyy6OrPYBC5QuH-vtAebsJk_svH1UgP8t5Xdq9N6qmWRY3k1Eaf8Z4yuvnMW29QVug/exec";

const PhoneValidation = /^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/;
const EmailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return false;
  const error = input.parentElement.querySelector(".error-msg");
  if (error) {
    error.innerText = message;
    error.classList.remove("d-none");
  }
  input.classList.add("is-invalid");
  return false;
}

function clearFieldError(input) {
  const error = input.parentElement.querySelector(".error-msg");
  if (error) error.classList.add("d-none");
  input.classList.remove("is-invalid");
}

function validateField(id) {
  const input = document.getElementById(id);
  if (!input) return true;
  const value = input.value.trim();

  if (!value) {
    return showFieldError(id, "This field is required.");
  }

  if (input.type === "email" && !EmailValidation.test(value)) {
    return showFieldError(id, "Please enter a valid email address.");
  }

  if (input.type === "tel" && !PhoneValidation.test(value)) {
    return showFieldError(id, "Please enter a valid phone number.");
  }

  return true;
}

// Add input listeners for real-time clearing of errors
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("input", function () {
    clearFieldError(this);
  });
});

/**
 * Generic function to handle form submissions
 * @param {string} btnId - ID of the submit button
 * @param {string} successId - ID of the success message element
 * @param {object} fieldIds - Object mapping generic keys to specific element IDs
 */
function handleFormSubmission(btnId, successId, fieldIds) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  btn.addEventListener("click", function (event) {
    event.preventDefault();

    // Validate fields
    const fieldsToValidate = [fieldIds.name, fieldIds.email, fieldIds.phone, fieldIds.dob];
    let isValid = true;
    for (const fieldId of fieldsToValidate) {
      if (!validateField(fieldId)) {
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    // Validate Insurance Type Select
    const select = document.getElementById(fieldIds.insurancetype);
    if (!select || !select.value) {
      showFieldError(fieldIds.insurancetype, "Please select an insurance type.");
      return;
    }

    const successMsg = document.getElementById(successId);
    successMsg.classList.remove("d-none", "text-danger");
    successMsg.classList.add("text-success");
    successMsg.innerText = "Processing your request...";

    const formData = {
      name: document.getElementById(fieldIds.name).value.trim(),
      email: document.getElementById(fieldIds.email).value.trim(),
      phone: document.getElementById(fieldIds.phone).value.trim(),
      dob: document.getElementById(fieldIds.dob).value.trim(),
      typeofinsurance: select.value,
      sendmail: "true"
    };

    const fullURL = `${scriptURL}?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&dob=${encodeURIComponent(formData.dob)}&typeofinsurance=${encodeURIComponent(formData.typeofinsurance)}&sendmail=${encodeURIComponent(formData.sendmail)}`;

    fetch(fullURL)
      .then((response) => {
        if (response.ok) {
          successMsg.innerText = "Form Submitted Successfully!";
          // Clear fields
          Object.values(fieldIds).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
          });
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        successMsg.classList.remove("text-success");
        successMsg.classList.add("text-danger");
        successMsg.innerText = "Submission failed. Please try again.";
      });
  });
}

// Initialize On-Page Form
handleFormSubmission("submitform", "formSuccess", {
  name: "name",
  email: "email",
  phone: "phone",
  dob: "dob",
  insurancetype: "insurancetype"
});

// Initialize Modal Form
handleFormSubmission("submitform1", "formSuccessModal", {
  name: "modal_name",
  email: "modal_email",
  phone: "modal_phone",
  dob: "modal_dob",
  insurancetype: "modal_insurancetype"
});


