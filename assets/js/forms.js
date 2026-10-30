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

  