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
