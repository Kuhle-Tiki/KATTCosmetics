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
  
/* ---------- 2. Scroll-reveal animation (CSS transition + IntersectionObserver) ---------- */
  if (typeof window.IntersectionObserver === 'function' && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('main > section').forEach((el, i) => {
      if (i === 0) return;                         // first section is already on screen
      el.classList.add('reveal'); io.observe(el);
    });
  }
  
/* ---------- 3. Accordion: opening one FAQ closes the others ---------- */
  document.querySelectorAll('[data-accordion]').forEach(group => {
    const items = [...group.querySelectorAll('details')];
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    }));
  });
  
/* ---------- 4. Lightbox ---------- */
  const IMG_SEL = '[data-lightbox] img';
  let overlay, lbImg, lbCap, current = 0, list = [], lastFocus;

  function buildLightbox() {
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay'; overlay.hidden = true;
    overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML =
      '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">&times;</button>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
      '<img alt=""><p class="lb-caption"></p>' +
      '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(overlay);
    lbImg = overlay.querySelector('img'); lbCap = overlay.querySelector('.lb-caption');
    overlay.querySelector('.lb-close').addEventListener('click', closeLb);
    overlay.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    overlay.querySelector('.lb-next').addEventListener('click', () => step(1));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeLb(); });
    document.addEventListener('keydown', e => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'Tab') {                       // keep keyboard focus inside the dialog
        const b = [...overlay.querySelectorAll('button:not([hidden])')];
        const first = b[0], last = b[b.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });  