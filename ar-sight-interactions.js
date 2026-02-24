/**
 * AR-SIGHT — Interactions JS v1.0
 * Micro-interactions légères : nav sticky, FAQ accordéon,
 * reveal au scroll, formulaire, toast, mode toggle.
 * Aucune dépendance externe. Vanilla JS ES6+.
 */

'use strict';

/* ============================================================
   1. NAV STICKY — scroll shadow + hamburger mobile
   ============================================================ */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Shadow au scroll
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger mobile
  const hamburger = document.querySelector('[data-nav-toggle]');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Fermer au clic sur lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer clic extérieur
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ============================================================
   2. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respecter prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   3. FAQ — ACCORDÉON
   ============================================================ */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    // Accessibilité
    const id = 'faq-answer-' + Math.random().toString(36).slice(2, 7);
    answer.setAttribute('id', id);
    question.setAttribute('aria-controls', id);
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', String(isOpen));

      // Fermer les autres
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
})();

/* ============================================================
   4. MODE TOGGLE — App vs Hub Laser
   ============================================================ */
(function initModeToggle() {
  const toggleBtns = document.querySelectorAll('.mode-toggle-btn');
  if (!toggleBtns.length) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Désactiver tous
      toggleBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      // Activer courant
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Afficher le panneau correspondant
      const target = btn.dataset.target;
      document.querySelectorAll('[data-mode-panel]').forEach(panel => {
        const isActive = panel.dataset.modePanel === target;
        panel.hidden = !isActive;
        panel.setAttribute('aria-hidden', String(!isActive));
        if (isActive) {
          panel.style.animation = 'fadeIn 0.3s ease';
        }
      });
    });
  });

  // Init : activer premier par défaut
  if (toggleBtns[0]) toggleBtns[0].click();
})();

/* ============================================================
   5. FORMULAIRE — Validation + soumission + toast
   ============================================================ */
(function initForm() {
  const form = document.querySelector('[data-form="contact"]');
  if (!form) return;

  // Validation légère
  const validators = {
    required: (val) => val.trim().length > 0,
    email:    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    minLength: (val, min) => val.trim().length >= Number(min),
  };

  const showError = (input, msg) => {
    const group = input.closest('.input-group');
    let error = group?.querySelector('.input-error');
    if (!error) {
      error = document.createElement('p');
      error.className = 'input-error';
      error.setAttribute('role', 'alert');
      group?.appendChild(error);
    }
    error.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id || (error.id = 'err-' + input.name));
  };

  const clearError = (input) => {
    const group = input.closest('.input-group');
    const error = group?.querySelector('.input-error');
    if (error) error.textContent = '';
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  };

  // Validation en temps réel (blur)
  form.querySelectorAll('.input-field, .select-field, .textarea-field').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  const validateField = (field) => {
    clearError(field);
    const rules = field.dataset.validate?.split(',') || [];
    for (const rule of rules) {
      const [type, param] = rule.trim().split(':');
      if (!validators[type]) continue;
      if (!validators[type](field.value, param)) {
        const messages = {
          required:  'Ce champ est obligatoire.',
          email:     'Adresse e-mail invalide.',
          minLength: `Minimum ${param} caractères requis.`,
        };
        showError(field, messages[type] || 'Champ invalide.');
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    const fields = form.querySelectorAll('.input-field, .select-field, .textarea-field');
    let valid = true;
    fields.forEach(field => {
      if (!validateField(field)) valid = false;
    });
    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent || 'Envoyer';

    // État chargement
    if (submitBtn) {
      submitBtn.textContent = 'Envoi en cours…';
      submitBtn.disabled = true;
    }

    try {
      // Simulation envoi — remplacer par fetch() vers endpoint réel
      await new Promise(resolve => setTimeout(resolve, 1200));

      showToast('✓ Message envoyé. Nous vous répondons sous 48h.');
      form.reset();

      // Tracking analytics (optionnel)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', { event_category: 'Contact', event_label: 'Demande démo' });
      }
    } catch {
      showToast('Erreur réseau. Veuillez réessayer.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
})();

/* ============================================================
   6. TOAST — Notifications légères
   ============================================================ */
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  if (type === 'error') {
    toast.style.backgroundColor = '#FF3B30';
  } else {
    toast.style.backgroundColor = '#1D1D1F';
  }

  toast.textContent = message;

  // Forcer reflow pour relancer l'animation
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4500);
}

/* ============================================================
   7. SMOOTH SCROLL — ancres internes
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   8. COUNTER ANIMATION — stats chiffrées
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const decimals = el.dataset.decimals ? Number(el.dataset.decimals) : 0;
        const duration = 1200;

        if (prefersReduced) {
          el.textContent = target.toFixed(decimals) + suffix;
          observer.unobserve(el);
          return;
        }

        let start = null;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          el.textContent = (eased * target).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

/* ============================================================
   9. COPY HASH — preuve numérique
   ============================================================ */
(function initHashCopy() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || btn.textContent;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copié !';
        setTimeout(() => { btn.textContent = original; }, 2000);
      } catch {
        // Clipboard API non disponible
      }
    });
  });
})();

/* ============================================================
   10. UTILITAIRES EXPORTS
   ============================================================ */
window.ARSIGHT = {
  showToast,
};
