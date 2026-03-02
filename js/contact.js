/* ============================================
   AlgoTech IT — Contact Form Validation
   Client-side validation for Netlify Forms
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  const fields = {
    name: {
      el: contactForm.querySelector('#name'),
      validate: (val) => val.trim().length >= 2,
      message: 'Please enter your name (at least 2 characters).'
    },
    email: {
      el: contactForm.querySelector('#email'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: 'Please enter a valid email address.'
    },
    company: {
      el: contactForm.querySelector('#company'),
      validate: () => true, // Optional field
      message: ''
    },
    service: {
      el: contactForm.querySelector('#service'),
      validate: (val) => val !== '',
      message: 'Please select a service.'
    },
    message: {
      el: contactForm.querySelector('#message'),
      validate: (val) => val.trim().length >= 10,
      message: 'Please enter a message (at least 10 characters).'
    }
  };

  function showError(fieldName) {
    const field = fields[fieldName];
    const group = field.el.closest('.form-group');
    group.classList.add('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = field.message;
  }

  function clearError(fieldName) {
    const field = fields[fieldName];
    const group = field.el.closest('.form-group');
    group.classList.remove('error');
  }

  // Real-time validation on blur
  Object.keys(fields).forEach(name => {
    const field = fields[name];
    if (!field.el) return;
    
    field.el.addEventListener('blur', () => {
      if (!field.validate(field.el.value)) {
        showError(name);
      } else {
        clearError(name);
      }
    });

    field.el.addEventListener('input', () => {
      if (field.validate(field.el.value)) {
        clearError(name);
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', function (e) {
    let hasErrors = false;

    Object.keys(fields).forEach(name => {
      const field = fields[name];
      if (!field.el) return;

      if (!field.validate(field.el.value)) {
        showError(name);
        hasErrors = true;
      } else {
        clearError(name);
      }
    });

    if (hasErrors) {
      e.preventDefault();
      return;
    }

    // If Netlify Forms is handling it, let it submit naturally.
    // For local testing, show success message:
    const isNetlify = contactForm.hasAttribute('data-netlify');
    if (!isNetlify) {
      e.preventDefault();
      const successEl = document.querySelector('.form-success');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();
      }
    }
  });
});
