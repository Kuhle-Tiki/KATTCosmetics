# KATT Cosmetics

**Live site:** https://kuhle-tiki.github.io/KATTCosmetics/
**Repository:** [ADD YOUR GITHUB REPO LINK]
**Student:** [YOUR NAME] | **Student number:** [NUMBER] | **Module:** [MODULE CODE]

KATT Cosmetics is a professional makeup brand for backstage makeup artists (MUAs) and everyday beauty lovers. The website showcases the product range and lets customers enquire via WhatsApp, email, phone, or the enquiry form. **The business does not sell directly through the website**; payment and delivery are arranged with the team after an enquiry.

---

## Table of contents
1. [Project structure](#project-structure)
2. [Technologies](#technologies)
3. [Part 1: Planning, structure and content](#part-1-planning-structure-and-content)
4. [Part 2: Styling and responsiveness](#part-2-styling-and-responsiveness)
5. [Part 3: Functionality, SEO and forms](#part-3-functionality-seo-and-forms)
6. [Changelog](#changelog)
7. [Running locally](#running-locally)
8. [References](#references)

---

## Project structure
```
KATTCosmetics/
├── index.html
├── pages/
│   ├── about.html
│   ├── product.html
│   ├── contact.html
│   ├── enquiry.html
│   └── muatradeportal.html
├── css/                 (site styles + part3.css)
├── js/
│   ├── forms.js          (Part 3: validation, enquiry response, contact email)
│   └── enhancements.js   (Part 3: accordion, lightbox, map, catalogue, animations)
├── data/products.json   (Part 3: product data loaded with fetch)
├── assets/images/
├── robots.txt
├── sitemap.xml
└── README.md
```
*[Adjust the tree if your folder names differ.]*

## Technologies
HTML5, CSS3, vanilla JavaScript (ES6), [Leaflet](https://leafletjs.com/) with OpenStreetMap tiles, Git and GitHub, GitHub Pages (hosting).

---

## Part 1: Planning, structure and content
*[Replace with your own Part 1 details, keeping the headings.]*
- **Storyline / business:** KATT Cosmetics, a makeup brand serving MUAs and everyday customers, with enquiry-based purchasing.
- **Target audience:** professional makeup artists, students and beauty enthusiasts looking for quality, affordable makeup.
- **Pages:** Home, About, Products, Contact, MUA Trade Portal, Enquiry.
- **Structure:** semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`), consistent navigation and footer on every page.
- **Content:** product categories (Face, Eyes, Lips, Tools), featured products with prices, a "How to Buy" section, and contact details (WhatsApp, email, Instagram).
- **Forms (basic):** enquiry form (`enquiry.html`) and contact form (`contact.html`), plus a newsletter sign-up on the home page.

## Part 2: Styling and responsiveness
*[Replace with your own Part 2 details.]*
- External CSS used for consistent branding across pages.
- Responsive layout for mobile, tablet and desktop, including a collapsible hamburger (☰) menu.
- Styled product cards, buttons and footer; image optimisation using WebP where possible.
- Feedback received for Part 2 and how it was addressed is recorded in the [Changelog](#changelog).

---

## Part 3: Functionality, SEO and forms

### 1. JavaScript interactivity
| Feature | Where | Description |
|---|---|---|
| Accordion (FAQ) | `enquiry.html` / `about.html` | Expandable questions built with `button` + `aria-expanded`; keyboard accessible (arrow keys, Home/End). |
| Lightbox gallery | Product images | Clicking an image opens a larger view with previous/next buttons, caption, Esc to close and focus trapping. |
| Interactive map | `contact.html` | Leaflet map with OpenStreetMap tiles and a marker popup for the business location. |
| Animations | All pages | Sections fade and slide in on scroll using `IntersectionObserver` and CSS transitions. Disabled for users who prefer reduced motion. |
| Dynamic content | `product.html` | Products are loaded from `data/products.json` with `fetch()` and rendered with DOM manipulation (`createElement`, `textContent`). |
| Search, filter and sort | `product.html` | Live search (debounced), category filter and sorting by name or price. |
| Enquire shortcut | Product cards | "Enquire about this" opens `enquiry.html?product=…` and pre-fills the product field. |

### 2. Search Engine Optimisation (SEO)
**On-page**
- *Keywords:* researched terms such as "professional makeup South Africa", "MUA makeup supplies", "matte foundation" and "affordable makeup" were worked into headings and body text.
- *Titles and meta descriptions:* unique title (about 50–60 characters) and description (about 120–155 characters) on every page.
- *Headings:* one `h1` per page with logical `h2`/`h3` nesting.
- *Images:* descriptive file names, meaningful `alt` text, `loading="lazy"`, and set `width`/`height`.
- *URLs:* short, lowercase, descriptive paths (`/pages/product.html`).
- *Internal linking:* navigation, footer, call-to-action buttons and product-to-enquiry links.
- *Mobile-friendliness:* responsive layout with the viewport meta tag.
- *Extras:* canonical links, Open Graph tags and `Store` structured data (JSON-LD).

**Off-page** *(plans / actions; edit to match what you actually did)*
- *Backlinks:* link to the site from the Instagram profile and relevant makeup-artist directories.
- *Social media:* promote products and the website on Instagram (@kattcosmetics).
- *Local SEO:* consistent business name, phone number and email across the site; Google Business Profile listing.

**Additional**
- `robots.txt` allows crawling and points to the sitemap.
- `sitemap.xml` lists all six pages.
- *Page speed:* WebP images, lazy loading, `defer` on scripts, no external frameworks, small JS and CSS files.
- *Security:* all user input is rendered with `textContent` (never `innerHTML`) to prevent XSS; a Content-Security-Policy meta tag; `rel="noopener noreferrer"` on external links; a honeypot field against spam bots; no payment or sensitive data is handled. HTTPS is provided by GitHub Pages.

### 3. Forms and validation
Both forms use `novalidate` and the same validation script (`js/forms.js`), so error messages are styled consistently and shown next to each field (with `role="alert"` and `aria-invalid` for screen readers). Validation runs on blur, while typing (after an error), and on submit.

| Field | Rules |
|---|---|
| Name | Required, 2–60 characters, letters, spaces, hyphens and apostrophes only |
| Email | Required where applicable, pattern `name@domain.tld` |
| Phone | South African format: `0` or `+27` followed by 9 digits (spaces and dashes ignored) |
| Quantity | Whole number between 1 and 500 |
| Product(s) | Required, 3–200 characters |
| Contact method | One radio option must be selected; the contact detail is checked against the chosen method |
| Message type | A real option must be selected |
| Message | Required, 10–1000 characters with a live character counter |
| Notes | Optional, maximum 500 characters |

**enquiry.html (purpose: ask about products, prices and availability).** After validation, the entered products are matched to `products.json` and the user sees an itemised response with price, availability and an estimated total. Orders of 10 or more of an item receive a 10% trade discount in the estimate. Items without a listed price show "Price on request". The estimate is not a final quote and the team confirms it.

**contact.html (purpose: send a general message).** After validation, the form compiles the name, email, optional phone, message type and message into an email. A preview is displayed with an **"Open in my email app and send"** button (a `mailto:` link addressed to `hello@kattcosmetics.co.za`) and a **"Copy message"** button.

**Form submission and AJAX.** Forms have an `action` attribute (`mailto:` for contact) as a no-JavaScript fallback. With JavaScript, submission is intercepted and handled asynchronously with `fetch()`. Product data is fetched from `data/products.json`, and an optional `AJAX_ENDPOINT` (e.g. Formspree) can receive the form data as JSON without reloading the page.

### 4. Version control
Changes were committed regularly with descriptive messages (e.g. `feat: add JS validation to enquiry form`, `seo: add robots.txt and sitemap.xml`).

### 5. Deployment
Hosted on GitHub Pages: https://kuhle-tiki.github.io/KATTCosmetics/

---

## Changelog

### Part 3 *(date: [DD Month 2026])*
**Added**
- `js/forms.js`: client-side validation (formats, lengths, required fields) with inline error messages, a character counter, a honeypot spam trap, an enquiry response (price, availability, estimated total) and a contact-email composer with `mailto:` and copy buttons.
- `js/enhancements.js`: accordion, image lightbox, scroll animations, Leaflet map and a dynamic product catalogue with search, category filter and sorting.
- `data/products.json`: product data source used by the catalogue and the enquiry response.
- `css/part3.css`: styles for validation states, result boxes, accordion, lightbox, map and catalogue, including `prefers-reduced-motion` support.
- `robots.txt` and `sitemap.xml` for search engine crawlers.
- Open Graph tags, canonical links and structured data (JSON-LD) on all pages.
- Content-Security-Policy meta tag and `rel="noopener noreferrer"` on external links.

**Changed (from Part 2 feedback and ICE Task 4 feedback)**
- ICE Task 4 feedback said the next step was JavaScript form validation, email processing and feedback. Both forms now validate with JavaScript, give error and success feedback, and process the data as described above.
- Unique, keyword-focused title tags and meta descriptions written for every page.
- Corrected spelling errors that affected SEO and professionalism: "Acessible" (page title), "professionalrofessional-grade" (meta description), "prodeucts" and "availabe" (home page).
- Standardised the phone number to `+27 21 666 0140` (the home page previously had `+27 21 666 1340` in the "How to Buy" section) so contact details are consistent for users and local SEO.
- Product images given descriptive alt text, `loading="lazy"` and dimensions to improve accessibility and page speed.

**Part 2 feedback entries** *[Add one entry per piece of feedback in this format, then delete this line]*
- *Feedback:* [quote or summarise the lecturer's comment]. *Change made:* [what you changed, in which file]. *Reason:* [why it improves the site].

### Part 2 *(date: [DD Month 2026])*
- [List the main changes made during Part 2.]

### Part 1 *(date: [DD Month 2026])*
- Initial site created: home, about, products, contact, enquiry and MUA trade portal pages with shared navigation and footer.

---

## Running locally
1. Clone the repository: `git clone [YOUR REPO LINK]`
2. Open the folder in VS Code and start it with the **Live Server** extension. A local server is needed because `fetch()` cannot load `data/products.json` from `file://` URLs.
3. To receive form submissions without a mail app, create a free Formspree form and paste its URL into `AJAX_ENDPOINT` in `js/forms.js`.

## Known limitations
- Prices and availability in `products.json` are examples for this assignment and not live stock levels.
- Client-side validation improves user experience but cannot replace server-side validation, because it can be bypassed (MDN Web Docs, n.d.).
- GitHub Pages serves this project under `/KATTCosmetics/`, so search engines only honour `robots.txt` placed at a domain root. It is included to demonstrate the technique.

---

## References
*(Harvard style. Check the access dates match when you actually used each source, and keep only the ones you used.)*

Google Search Central (n.d.) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 20 October 2026).

Google Search Central (n.d.) *Influencing your title links in search results*. Available at: https://developers.google.com/search/docs/appearance/title-link (Accessed: 20 October 2026).

Google Search Central (n.d.) *Control your snippets in search results (meta descriptions)*. Available at: https://developers.google.com/search/docs/appearance/snippet (Accessed: 20 October 2026).

Google Search Central (n.d.) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 20 October 2026).

Leaflet (n.d.) *Leaflet quick start guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 20 October 2026).

MDN Web Docs (n.d.) *Client-side form validation*. Mozilla. Available at: https://developer.mozilla.org/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 20 October 2026).

MDN Web Docs (n.d.) *Using the Fetch API*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 20 October 2026).

MDN Web Docs (n.d.) *Intersection Observer API*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 20 October 2026).

MDN Web Docs (n.d.) *Content Security Policy (CSP)*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP (Accessed: 20 October 2026).

OpenStreetMap Foundation (n.d.) *Copyright and license*. Available at: https://www.openstreetmap.org/copyright (Accessed: 20 October 2026).

Schema.org (n.d.) *Store*. Available at: https://schema.org/Store (Accessed: 20 October 2026).

Sitemaps.org (2008) *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html (Accessed: 30 October 2026).

W3C Web Accessibility Initiative (n.d.) *Accordion pattern*, in *ARIA Authoring Practices Guide*. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (Accessed: 20 October 2026).

GitHub (n.d.) *GitHub Pages documentation*. Available at: https://docs.github.com/en/pages (Accessed: 20 October 2026).

