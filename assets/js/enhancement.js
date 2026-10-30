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
    }
  function show(i) {
    const img = list[i]; current = i;
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt;
    overlay.querySelector('.lb-prev').hidden = overlay.querySelector('.lb-next').hidden = list.length < 2;
  }
  function step(d) { show((current + d + list.length) % list.length); }
  function openLb(img) {
    if (!overlay) buildLightbox();
    list = [...document.querySelectorAll(IMG_SEL)];
    lastFocus = document.activeElement;
    show(list.indexOf(img)); overlay.hidden = false;
    overlay.querySelector('.lb-close').focus();
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    overlay.hidden = true; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', e => {
    const img = e.target.closest ? e.target.closest(IMG_SEL) : null;
    if (img) openLb(img);
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches(IMG_SEL)) { e.preventDefault(); openLb(e.target); }
  });
  function markLightbox() {
    document.querySelectorAll(IMG_SEL).forEach(img => {
      img.tabIndex = 0; img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'View larger image: ' + (img.alt || 'product'));
    });
  }
  markLightbox();

  /* ---------- 5. Interactive store map (Leaflet + OpenStreetMap) ---------- */
  const mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    const rows = [...document.querySelectorAll('#stores tbody tr[data-lat]')];
    const map = L.map(mapEl, { scrollWheelZoom: false }).setView([-29.0, 25.0], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const markers = new Map();
    rows.forEach(tr => {
      const lat = parseFloat(tr.dataset.lat), lng = parseFloat(tr.dataset.lng);
      const city = tr.cells[0].textContent.trim(), place = tr.cells[1].textContent.trim(), notes = tr.cells[2].textContent.trim();
      const popup = document.createElement('div');
      const b = document.createElement('strong'); b.textContent = 'KATT Cosmetics - ' + city;
      popup.append(b, document.createElement('br'), document.createTextNode(place), document.createElement('br'), document.createTextNode(notes));
      const m = L.marker([lat, lng], { title: city, alt: 'KATT Cosmetics ' + city }).addTo(map).bindPopup(popup);
      markers.set(tr, m);
      const link = tr.querySelector('a.map-link');
      if (link) link.addEventListener('click', e => {
        e.preventDefault();
        map.flyTo([lat, lng], 15, { animate: !reduceMotion });
        m.openPopup();
        mapEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      });
    });
    if (markers.size) map.fitBounds(L.featureGroup([...markers.values()]).getBounds().pad(0.25));
    map.once('focus', () => map.scrollWheelZoom.enable());
  } else if (mapEl) {
    mapEl.textContent = 'The interactive map could not load. Use the "View map" links in the table below.';
  }
  
 /* ---------- 6. Dynamic product catalogue: load, search, filter, sort ---------- */
  const grid = document.getElementById('product-grid');
  if (grid) {
    const search = document.getElementById('product-search');
    const cat = document.getElementById('category-filter');
    const sort = document.getElementById('sort-products');
    const count = document.getElementById('results-count');
    const clear = document.getElementById('clear-filters');
    let products = [];
    const STOCK = { 'in-stock': 'In stock', limited: 'Limited stock', 'out-of-stock': 'Out of stock' };
     