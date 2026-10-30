# KATT Cosmetics — Website (PoE Project)

**Live site:** https://kuhle-tiki.github.io/KATTCosmetics/
**Repository:** https://github.com/Kuhle-Tiki/KATTCosmetics

A multi-page website for **KATT Cosmetics**, a fictional professional makeup and beauty brand created for academic coursework (IIE PoE, WEDE5020), inspired by the positioning of real professional makeup brands such as NYX Cosmetics.

KATT Cosmetics is a **showcase site, not an online store**. There is no cart or checkout. Every "purchase" path routes the customer to WhatsApp, email, phone, or an enquiry form.

> **Part 1** delivered the proposal document and a plain semantic HTML5 structure.
> **Part 2** added the external stylesheet, responsive design, wishlist and documentation.
> **Part 3** (this submission) adds JavaScript interactivity, dynamic content, SEO, validated forms with email processing, and deployment.

---

## Contents
1. [Live pages](#live-pages) · 2. [Folder structure](#folder-structure) · 3. [Tech stack](#tech-stack) · 4. [Design system](#design-system) · 5. [Part 3 features](#part-3-features) · 6. [Changelog](#changelog) · 7. [Running locally](#running-locally) · 8. [Known limitations](#known-limitations) · 9. [References](#references)

---

## Live pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, how-to-buy, category links, featured products, newsletter signup |
| About Us | `pages/about.html` | Brand history, mission, vision, values, target audience |
| Products | `pages/product.html` | Featured product with shade picker, plus a searchable, filterable, sortable catalogue |
| MUA Trade Portal | `pages/muatradeportal.html` | Trade benefits, eligibility, validated application form |
| Enquire to Purchase | `pages/enquiry.html` | Process explainer, validated enquiry form with instant price/availability estimate, FAQ accordion |
| Contact | `pages/contact.html` | Contact details, validated message form that builds an email, FAQ accordion, interactive store map |

---

## Folder structure

```
KATTCosmetics/
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
├── pages/            about, contact, enquiry, muatradeportal, product
└── assets/
    ├── css/          style.css (Part 2), part3.css (Part 3)
    ├── js/           wishlist.js, enhancements.js, forms.js
    ├── data/         products.json
    ├── vendor/leaflet/   Leaflet 1.9.4 (self-hosted map library)
    └── images/       product photography (WebP)
```

---

## Tech stack

- **HTML5**: semantic elements (`header`, `nav`, `main`, `section`, `article`, `figure`, `dl`, `details`, `table`).
- **CSS3**: custom properties, Flexbox, Grid, media queries, CSS transitions/animations.
- **Vanilla JavaScript (ES6)**: `fetch` (AJAX), DOM manipulation, `IntersectionObserver`, `localStorage`.
- **Leaflet 1.9.4** + OpenStreetMap tiles for the store map (library self-hosted).
- **Google Fonts**: Poppins and Inter.
- **Git/GitHub** for version control; **GitHub Pages** for hosting.

## Design system

| Token | Value | Use |
|---|---|---|
| Black | `#1A1A1A` | Header, footer, hero |
| Cream / dim | `#F5F1EB` / `#ECE5D8` | Page and alternating section backgrounds |
| Hot pink | `#E6007A` | Links, primary accent, results box |
| Gold | `#C9A227` | Secondary accent, focus rings |

Breakpoints: single column below 700px with a hamburger menu; grids and inline navigation above.

---

## Part 3 features

### 1. Interactive elements (`assets/js/enhancements.js`, `assets/css/part3.css`)
| Feature | Where | How it works |
|---|---|---|
| Accordion | Contact FAQ, Enquiry FAQ | Native `<details>` enhanced so opening one item closes the others; animated; keyboard accessible by default. |
| Lightbox (modal) | Product and featured images | Click or press Enter on an image to open a dialog with prev/next, caption, Esc to close, arrow keys and focus trapping. |
| Interactive map | Contact page | Leaflet map with a marker for each store/pop-up read from the table's `data-lat`/`data-lng`; "View map" links fly to a store and open its popup. |
| Animations | All pages | Sections fade and slide in on scroll (CSS transitions + `IntersectionObserver`); cards lift on hover; accordion panels fade open. All disabled for `prefers-reduced-motion`. |
| Mobile menu | All pages | The ☰ button toggles the navigation (`aria-expanded`), Esc closes it. |
| DOM manipulation | Throughout | Cards, result tables, error messages and the lightbox are built with `createElement`/`textContent`. |

### 2. Dynamic content, search, filter and sort (Products page)
`assets/data/products.json` holds 19 products. `enhancements.js` loads it with `fetch()` and renders the cards. Visitors can **search** (debounced, matches name/category/description/keywords), **filter by category** (also via links such as `product.html?category=Lips` from the home page), and **sort** by name or price. Cards include a wishlist button and an "Enquire" link that pre-fills the enquiry form.

### 3. SEO
**On-page**
- *Keywords:* terms such as "professional makeup", "MUA trade pricing", "matte foundation", "cruelty-free" and "South Africa" appear naturally in titles, headings and body copy.
- *Title tags and meta descriptions:* unique on every page (about 50–60 and 120–160 characters).
- *Headings:* exactly one `h1` per page, then `h2`/`h3` in order.
- *Images:* descriptive lowercase file names (e.g. `matte-foundation.webp`), meaningful `alt` text, `width`/`height`, `loading="lazy"`.
- *URLs:* short and descriptive (`/pages/product.html`, `/pages/contact.html`).
- *Internal linking:* header and footer navigation, category links with `?category=`, product-to-enquiry links, About ↔ Trade Portal ↔ Contact links.
- *Mobile-friendliness:* viewport meta tag, responsive layout, touch-sized controls.
- *Extras:* canonical link, Open Graph tags, `Store` structured data (JSON-LD) on the home page, a skip link and visible focus styles.

**Off-page** *(plan: edit to match what you actually did)*
- *Backlinks:* link to the site from the @kattcosmetics Instagram profile and relevant MUA/beauty directories.
- *Social media:* promote products and the website on Instagram.
- *Local SEO:* consistent name, phone number and email on every page, and a Google Business Profile listing for the Cape Town, Johannesburg and Durban locations.

**Additional requests**
- **robots.txt:** allows crawling and points to the sitemap.
- **sitemap.xml:** lists all six pages with priorities and last-modified dates.
- **Page speed:** WebP images (the two large JPGs were converted and resized, from about 1.4 MB and 115 KB to 41 KB and 86 KB), lazy loading, `defer` on scripts, font preconnect, no external frameworks, self-hosted map library, and the three heavy Google Maps iframes removed.
- **Security:** Content-Security-Policy meta tag (scripts and connections limited to this site); all dynamic text inserted with `textContent` (no `innerHTML` with user input) to prevent XSS; `rel="noopener noreferrer"` on external links; referrer policy; honeypot field against spam bots; no payments or sensitive data handled; HTTPS provided by GitHub Pages.

### 4. Forms and validation (`assets/js/forms.js`)
All four forms (enquiry, contact, newsletter, trade application) use HTML5 attributes (`required`, `type`, `min`, `max`, `maxlength`, `autocomplete`) plus JavaScript validation. Messages appear beside each field (`role="alert"`, `aria-invalid`, `aria-describedby`). Fields validate on blur, on input after an error, and on submit; the first invalid field receives focus.

| Field | Rule |
|---|---|
| Name | Required; 2–60 characters; letters, spaces, hyphens, apostrophes |
| Email | Required; `name@domain.tld` pattern |
| Phone | South African format: `0` or `+27` plus 9 digits (spaces/dashes ignored) |
| Contact details (enquiry) | Must match the chosen method: email for Email; SA number for Phone/WhatsApp |
| Quantity | Whole number 1–500 |
| Product(s) | Required; 3–200 characters |
| Message type | A real option must be selected |
| Message | 10–1000 characters, live counter |
| Notes / description / business | Optional, with maximum lengths |
| Portfolio link | Optional; must be a valid `http(s)` URL |

**enquiry.html (purpose: ask about products, cost and availability).** After validation the typed products are matched to `products.json` and the visitor sees an itemised table with price, availability and an estimated total. Quantities of 10 or more show a 10% trade discount; unpriced items show "Price on request". It is an estimate only; the team confirms details.

**contact.html (purpose: send a general message).** After validation the form compiles name, email, optional phone, message type and message into an email. A preview is shown with an **Open in my email app and send** button (a `mailto:` link to `hello@kattcosmetics.co.za`) and a **Copy message** button.

**Submission and AJAX.** Each form has an `action` (a `mailto:` fallback when JavaScript is unavailable). With JavaScript, submission is intercepted and handled without a page reload, product data is fetched with `fetch()`, and setting `AJAX_ENDPOINT` in `forms.js` (e.g. a Formspree URL) also posts the form data as JSON.

### 5. Version control and deployment
Changes were committed regularly with descriptive messages. The site is deployed with GitHub Pages at the live link above.

---

## Changelog

### Part 3 — *[DD Month 2026]*
**Added**
- `assets/js/forms.js`: client-side validation, inline error messages, character counters, honeypot, enquiry price/availability response, contact email compiler (`mailto:` + copy), optional AJAX endpoint, and `?product=&shade=` pre-fill of the enquiry form.
- `assets/js/enhancements.js`: mobile navigation toggle, scroll animations, accordion, lightbox, Leaflet store map and the dynamic product catalogue with search, category filter and sort.
- `assets/css/part3.css`, `assets/data/products.json`, `assets/vendor/leaflet/` (self-hosted Leaflet 1.9.4).
- `robots.txt`, `sitemap.xml`, canonical links, Open Graph tags, JSON-LD structured data, Content-Security-Policy, skip link and focus styles.
- Enquiry FAQ accordion; optional phone field on the contact form; validation on the newsletter and MUA trade forms.

**Fixed (bugs found while building Part 3)**
- Every page loaded `../js/script.js`, which does not exist (the file is `assets/js/wishlist.js`), so the wishlist and hamburger menu never ran. Script paths corrected and the file loaded with `defer`.
- `contact.html`: the message-type `<select>` opening tag was missing (a `<p>` was in its place), the inline script was never closed, `textcontent` should be `textContent`, the email link was never opened, `<thread>` should be `<thead>`, and Google Maps `<iframe>`s sat illegally inside table rows. Rebuilt with a valid table and a Leaflet map.
- `product.html`: mismatched tags (`</formm>`, unclosed `<article>`/`<div>`, `figcaption>` missing `<`, misplaced `</figure>`), `data-prodduct-id` and `aria-labelledyby` typos, links to `pages/product.html` from inside `pages/`, and duplicate heading ids. Page restructured and the static category lists replaced by the dynamic catalogue.
- `index.html`: the newsletter form had a `<label>` with no input, the "How to Buy" section id contained spaces, and the heading id did not match its `aria-labelledby`. Fixed.
- `about.html`: `if=` instead of `id=` on headings, a stray `=` in `aria-labelledby`, a footer nested inside a second `<main>`, and a duplicated "Our values" heading. Fixed.
- `enquiry.html`: a `</p>` closing an `<li>`. Fixed.
- `wishlist.js`: the generic form handler showed a placeholder `alert()` and conflicted with real form handling; removed. Buttons now work through event delegation so dynamically created cards work, and the wishlist shows product names.
- Inconsistent wishlist ids (`Foundation-24hr`, `foundation-24HR`, `velvel-lip-stain` used for a lipstick) unified to ids from `products.json`.
- Phone number made consistent (`+27 21 666 0140`); the home page "How to Buy" link used `…1340`.
- 24HR Matte Foundation price made consistent at R150 (the product page said R50).
- Spelling and grammar corrections across all pages, including "Acessible", "professionalrofessional-grade", "prodeucts", "availabe", "Joheannesburg", "purchse", "payements" and "FAGs".

**Changed**
- Unique, keyword-focused titles and meta descriptions for every page; navigation labels standardised (HOME, ABOUT, PRODUCTS, CONTACT, MUA TRADE PORTAL, ENQUIRY).
- Images renamed to descriptive names without spaces or brackets (e.g. `eye-shadow.jpg (2).webp` → `eye-palette.webp`, `Nyx-freezie.jpg.webp` → `face-freezie-primer.webp`) and the two large JPGs converted to WebP (`matte-foundation.webp`, `caramel-drip-lip-gloss.webp`).
- Home page category cards now open the product page pre-filtered (`?category=Face`, etc.).
- Forms rebuilt with labels, `autocomplete`, length limits and optional-field hints.

**Part 2 feedback → changes** *[Add one line per piece of feedback you received, then delete this note]*
- *Feedback:* [lecturer comment] → *Change:* [what changed, which file] → *Reason:* [why].

### Part 2 — *[DD Month 2026]*
- Added `assets/css/style.css`, responsive design, wishlist (`localStorage`), and documentation. *[Add detail and your Part 1 feedback changes.]*

### Part 1 — *[DD Month 2026]*
- Proposal document and semantic HTML structure for six pages. *[Add detail.]*

---

## Running locally
1. Clone the repository.
2. Open it in VS Code and run **Live Server** (a local server is needed because `fetch()` cannot read `products.json` from `file://`).
3. Optional: create a Formspree form and paste its URL into `AJAX_ENDPOINT` in `assets/js/forms.js`.

## Known limitations
- Product stock levels and the 10-unit trade discount are illustrative values for this coursework, and products without a price show "Price on request". Store addresses and prices are fictional.
- Client-side validation improves usability but can be bypassed, so a real deployment must validate again on a server (MDN Web Docs, n.d.).
- GitHub Pages serves this project under `/KATTCosmetics/`, and crawlers only read `robots.txt` at a domain root, so the file is included to demonstrate the technique.
- `mailto:` depends on the visitor having an email app; the **Copy message** button is the fallback.

---

## References
*(Harvard style, IIE format)*

GitHub, n.d. *GitHub Pages documentation.* [online] Available at: <https://docs.github.com/en/pages> [Accessed 20 October 2026].

Google Search Central, n.d. *Build and submit a sitemap.* [online] Available at: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap> [Accessed 20 October 2026].

Google Search Central, n.d. *Introduction to robots.txt.* [online] Available at: <https://developers.google.com/search/docs/crawling-indexing/robots/intro> [Accessed 20 October 2026].

Google Search Central, n.d. *Influencing your title links in search results.* [online] Available at: <https://developers.google.com/search/docs/appearance/title-link> [Accessed 20 October 2026].

Google Search Central, n.d. *Control your snippets in search results.* [online] Available at: <https://developers.google.com/search/docs/appearance/snippet> [Accessed 18 October 2026].

Leaflet, n.d. *Leaflet quick start guide.* [online] Available at: <https://leafletjs.com/examples/quick-start/> [Accessed 18 October 2026].

MDN Web Docs, n.d. *Client-side form validation.* [online] Available at: <https://developer.mozilla.org/docs/Learn_web_development/Extensions/Forms/Form_validation> [Accessed 18 October 2026].

MDN Web Docs, n.d. *Using the Fetch API.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch> [Accessed 20 October 2026].

MDN Web Docs, n.d. *Intersection Observer API.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API> [Accessed 20 October 2026].

MDN Web Docs, n.d. *Content Security Policy (CSP).* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP> [Accessed 20 October 2026].

MDN Web Docs, n.d. *<details>: The Disclosure element.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details> [Accessed 20 October 2026].

MDN Web Docs, n.d. *Web Storage API: Using the Web Storage API.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API> [Accessed 20 October 2026].

MDN Web Docs, n.d. *CSS box model.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model> [Accessed 18 2026].

MDN Web Docs, n.d. *Using media queries.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries> [Accessed 18 2026].

OpenStreetMap Foundation, n.d. *Copyright and license.* [online] Available at: <https://www.openstreetmap.org/copyright> [Accessed 20 October 2026].

Schema.org, n.d. *Store.* [online] Available at: <https://schema.org/Store> [Accessed 20 October 2026].

Sitemaps.org, 2008. *Sitemaps XML format.* [online] Available at: <https://www.sitemaps.org/protocol.html> [Accessed 20 October 2026].

W3C Web Accessibility Initiative, n.d. *ARIA Authoring Practices Guide: Disclosure (Navigation Menu) Pattern.* [online] Available at: <https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/> [Accessed 18 2026].

Google Fonts, n.d. *Poppins.* [online] Available at: <https://fonts.google.com/specimen/Poppins> [Accessed 20 2026].

Google Fonts, n.d. *Inter.* [online] Available at: <https://fonts.google.com/specimen/Inter> [Accessed 18 2026].

NYX Professional Makeup, n.d. *NYX Professional Makeup — Cruelty-Free & Affordable Makeup.* [online] Available at: <https://www.nyxcosmetics.com> [Accessed 18 2026]. (Brand-positioning inspiration for this fictional coursework brand. Product photographs are used for educational purposes only.)

---

## Author
Kuhle Tiki
ST10525713

Built for WEDE5020 — Web Design and Development, The Independent Institute of Education (IIE), 2026.
