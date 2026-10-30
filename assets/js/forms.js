/*
 * KATT Cosmetics - Part 3: JavaScript form validation & processing
 * Handles: #enquiryForm, #contactForm, #newsletterForm, #tradeForm
 * - Client-side validation (formats, lengths, required fields) with inline error messages
 * - enquiryForm: processes the input and shows a response (price, availability, estimate)
 * - contactForm: compiles a validated email that the visitor sends to RECIPIENT
 * - Optional AJAX delivery (fetch) if AJAX_ENDPOINT is set (e.g. a Formspree URL)
 */