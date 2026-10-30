/*
 * KATT Cosmetics - Part 3: interactive elements, animations and dynamic content
 * Each feature only runs if its markup exists on the current page:
 *  1. Mobile navigation toggle   2. Scroll-reveal animations   3. FAQ accordion
 *  4. Image lightbox (modal)     5. Leaflet store map          6. Dynamic product catalogue
 */
(() => {
  'use strict';
  const BASE = location.pathname.includes('/pages/') ? '../' : '';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-enabled');

/* ---------- 1. Mobile navigation (hamburger) ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
      }
    });
  }  