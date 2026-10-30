/*
 * KATT Cosmetics - Part 3: JavaScript form validation & processing
 * Handles: #enquiryForm, #contactForm, #newsletterForm, #tradeForm
 * - Client-side validation (formats, lengths, required fields) with inline error messages
 * - enquiryForm: processes the input and shows a response (price, availability, estimate)
 * - contactForm: compiles a validated email that the visitor sends to RECIPIENT
 * - Optional AJAX delivery (fetch) if AJAX_ENDPOINT is set (e.g. a Formspree URL)
 */
(() => {
  'use strict';

  const RECIPIENT = 'hello@kattcosmetics.co.za';
  const AJAX_ENDPOINT = '';            // e.g. 'https://formspree.io/f/xxxxxxxx' (leave '' to disable)
  const TRADE_QTY = 10;                // quantity that earns the trade discount in the estimate
  const TRADE_DISCOUNT = 0.10;
  const BASE = location.pathname.includes('/pages/') ? '../' : '';

  const $ = id => document.getElementById(id);
  const trim = v => (v || '').trim();
  const NAME_RE = /^\p{L}[\p{L}\s'’.-]{1,59}$/u;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^(\+27|0027|0)[1-9]\d{8}$/;
  const cleanPhone = v => v.replace(/[\s()-]/g, '');
  const isEmail = v => EMAIL_RE.test(v);
  const isPhone = v => PHONE_RE.test(cleanPhone(v));

  /* ---------- Reusable rules: each returns '' when valid, otherwise the error message ---------- */
  const rules = {
    name: v => !v ? 'Please enter your full name.'
      : !NAME_RE.test(v) ? 'Use letters, spaces, hyphens or apostrophes only (2-60 characters).' : '',
    email: v => !v ? 'Please enter your email address.'
      : !isEmail(v) ? 'Enter a valid email address, e.g. name@example.com.' : '',
    optPhone: v => v && !isPhone(v) ? 'Enter a valid South African number, e.g. 021 666 0140 or +27 82 123 4567.' : '',
    optUrl: v => {
      if (!v) return '';
      try { const u = new URL(v); return /^https?:$/.test(u.protocol) ? '' : 'Link must start with http:// or https://'; }
      catch { return 'Enter a full link, e.g. https://instagram.com/yourname'; }
    },
    textMax: (max, label) => v => v.length > max ? label + ' must be ' + max + ' characters or fewer (currently ' + v.length + ').' : '',
    selectChosen: label => v => !v ? 'Please choose ' + label + '.' : ''
  };

  /* ---------- Per-form configuration ---------- */
  const CONFIG = {
    enquiryForm: {
      fields: {
        'pe-name': { rule: rules.name },
        'pe-product': { rule: v => !v ? 'Tell us which product(s) you are interested in.'
          : v.length < 3 ? 'Please enter at least 3 characters.'
          : v.length > 200 ? 'Please keep this under 200 characters.' : '' },
        'pe-quantity': { rule: v => !v ? 'Please enter a quantity.'
          : !/^\d+$/.test(v) ? 'Quantity must be a whole number.'
          : (+v < 1 || +v > 500) ? 'Quantity must be between 1 and 500.' : '' },
        'pe-contact-method': { rule: rules.selectChosen('a contact method') },
        'pe-contact-details': { rule: v => {
          if (!v) return 'Please enter your email address or phone number.';
          const m = $('pe-contact-method').value;
          if (m === 'email') return isEmail(v) ? '' : 'You chose email, so enter a valid email address (name@example.com).';
          if (m === 'phone' || m === 'whatsapp') return isPhone(v) ? '' : 'Enter a valid South African number, e.g. 021 666 0140 or +27 82 123 4567.';
          return isEmail(v) || isPhone(v) ? '' : 'Enter a valid email address or South African phone number.';
        } },
        'pe-message': { rule: rules.textMax(500, 'Notes'), optional: true, counter: 500 }
      },
      revalidate: { 'pe-contact-method': 'pe-contact-details' },
      onValid: handleEnquiry
    },
    contactForm: {
      fields: {
        'c-name': { rule: rules.name },
        'c-email': { rule: rules.email },
        'c-phone': { rule: rules.optPhone, optional: true },
        'c-subject': { rule: rules.selectChosen('a message type') },
        'c-message': { rule: v => !v ? 'Please type your message.'
          : v.length < 10 ? 'Your message must be at least 10 characters (currently ' + v.length + ').'
          : v.length > 1000 ? 'Your message must be 1000 characters or fewer (currently ' + v.length + ').' : '',
          counter: 1000 }
      },
      onValid: handleContact
    },
    newsletterForm: {
      fields: { 'newsletter-email': { rule: rules.email } },
      onValid: async (form, data) => {
        await ajaxSubmit({ form: 'newsletter', ...data });
        return { type: 'success', message: 'Thanks for subscribing! Launch news and tutorials are on their way.', reset: true };
      }
    },
    tradeForm: {
      fields: {
        't-name': { rule: rules.name },
        't-email': { rule: rules.email },
        't-business': { rule: rules.textMax(80, 'Business name'), optional: true },
        't-portfolio': { rule: rules.optUrl, optional: true },
        't-message': { rule: rules.textMax(800, 'Your description'), optional: true, counter: 800 }
      },
      onValid: async (form, data) => {
        await ajaxSubmit({ form: 'trade-application', ...data });
        return { type: 'success', message: 'Thank you, ' + data['t-name'].split(' ')[0] + '! Your trade application has been received. Our team will review it and contact you.', reset: true };
      }
    }
  };

/* ---------- Error display helpers ---------- */
  function errorSpan(el) {
    const id = el.id + '-error';
    let s = $(id);
    if (!s) {
      s = document.createElement('span');
      s.id = id; s.className = 'field-error'; s.setAttribute('role', 'alert');
      const anchor = $(el.id + '-count') || el;
      anchor.insertAdjacentElement('afterend', s);
      el.setAttribute('aria-describedby', id);
    }
    return s;
}
 function setError(el, msg) {
    errorSpan(el).textContent = msg;
    el.classList.toggle('is-invalid', !!msg);
    el.classList.toggle('is-valid', !msg && trim(el.value) !== '');
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
     function addCounter(el, max) {
    const c = document.createElement('span');
    c.id = el.id + '-count'; c.className = 'char-count';
    el.insertAdjacentElement('afterend', c);
    const upd = () => { c.textContent = el.value.length + ' / ' + max; };
    el.addEventListener('input', upd); upd();
  }

  /* ---------- AJAX (fetch) ---------- */
  async function ajaxSubmit(payload) {
    if (!AJAX_ENDPOINT) return { skipped: true };
    const res = await fetch(AJAX_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('server status ' + res.status);
    return res.json().catch(() => ({}));
  }
  let catalogue = null;
  async function loadCatalogue() {
    if (catalogue) return catalogue;
    try {
      const res = await fetch(BASE + 'assets/data/products.json');      // AJAX request
      if (!res.ok) throw new Error(res.status);
      catalogue = await res.json();
    } catch { catalogue = []; }
    return catalogue;
  }

  /* ---------- Wire up each form that exists on the page ---------- */
  Object.entries(CONFIG).forEach(([formId, cfg]) => {
    const form = $(formId);
    if (!form) return;
    form.setAttribute('novalidate', '');

    const els = Object.keys(cfg.fields).map(id => ({ el: $(id), ...cfg.fields[id], id })).filter(f => f.el);
    els.forEach(f => {
      f.el.removeAttribute('required');                // our messages replace the browser's
      if (f.counter) addCounter(f.el, f.counter);
      const run = () => setError(f.el, validateField(f));
      f.el.addEventListener('blur', run);
      f.el.addEventListener('input', () => { if (f.el.classList.contains('is-invalid')) run(); });
      f.el.addEventListener('change', run);
    });
    Object.entries(cfg.revalidate || {}).forEach(([src, target]) => {
      const t = els.find(f => f.id === target);
      if (t && $(src)) $(src).addEventListener('change', () => { if (trim(t.el.value)) setError(t.el, validateField(t)); });
    });

    // honeypot against bots (hidden from people)
    const hp = document.createElement('input');
    hp.type = 'text'; hp.name = 'website'; hp.tabIndex = -1; hp.autocomplete = 'off';
    hp.className = 'hp-field'; hp.setAttribute('aria-hidden', 'true');
    form.appendChild(hp);

    // status + result areas
    const status = document.createElement('p');
    status.className = 'form-status'; status.hidden = true;
    status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    const result = document.createElement('div');
    result.className = 'result-box'; result.hidden = true; result.id = formId + '-result';
    form.insertAdjacentElement('afterend', result);
    form.insertAdjacentElement('afterend', status);
    const say = (msg, type) => { status.textContent = msg; status.className = 'form-status ' + (type || ''); status.hidden = !msg; };

    function validateField(f) {
      const v = trim(f.el.value);
      if (f.optional && v === '') return '';
      return f.rule(v);
    }