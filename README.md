# KATT Cosmetics — Website (PoE Project)

A multi-page website for **KATT Cosmetics**, a fictional professional makeup and beauty brand created for academic coursework (IIE PoE, WEDE5020), inspired by the positioning of real professional makeup brands such as NYX Cosmetics.

KATT Cosmetics is a **showcase site, not an online store**. There is no cart or checkout. Every "purchase" path routes the customer to WhatsApp, email, phone, or an enquiry form instead.

> **Part 1** delivered the proposal document and a plain semantic HTML5 structure (no styling).
> **Part 2** (this submission) adds the external stylesheet, responsive design, and this documentation.

---

## Live pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, how-to-buy explainer, category grid, featured products, newsletter signup |
| About Us | `pages/about.html` | Brand history, mission, vision, values, target audience |
| Products | `pages/product.html` | Single product detail template — image, price, spec list, shade picker, wishlist |
| MUA Trade Portal | `pages/muatradeportal.html` | Trade account benefits, eligibility, application form |
| Enquire to Purchase | `pages/enquiry.html` | Explains the enquiry-based buying process + purchase enquiry form |
| Contact | `pages/contact.html` | Contact details, contact form, FAQ, store locator table |

---

## Folder structure

```
KATTCosmetics/
├── index.html
├── README.md
├── PART1-FEEDBACK-AND-CHANGELOG.md
├── pages/
│   ├── about.html
│   ├── contact.html
│   ├── enquiry.html
│   ├── muatradeportal.html
│   └── product.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── images/
│       └── (product photography)
└── js/
    └── script.js
```

---

## Tech stack

- **HTML5** — semantic elements throughout (`header`, `nav`, `main`, `section`, `article`, `figure`/`figcaption`, `dl`, `details`/`summary`, `table`)
- **CSS3** — external stylesheet (`assets/css/style.css`), custom properties (CSS variables), Flexbox and CSS Grid, mobile-first media queries
- **Vanilla JavaScript** (`js/script.js`) — wishlist functionality (`localStorage`, no backend) and the mobile navigation toggle
- **Google Fonts** — Poppins (headings) and Inter (body text)
- No build step, framework, or package manager — fully static, works when opened directly or hosted anywhere

---

## Design system

| Token | Value | Use |
|---|---|---|
| Black | `#1A1A1A` | Header, footer, hero background |
| Cream | `#F5F1EB` | Page background |
| Cream (dim) | `#ECE5D8` | Alternating section background |
| Hot pink | `#E6007A` | Links, primary accent, active states |
| Gold | `#C9A227` | Secondary accent, labels, highlights |
| Display font | Poppins (600/700) | Headings, nav, buttons |
| Body font | Inter (400/500/600) | Paragraphs, form fields |

### Responsive breakpoints (mobile-first)

| Breakpoint | Change |
|---|---|
| Base (< 768px) | Stacked hamburger navigation, single-column layout |
| ≥ 768px (tablet) | Full inline navigation, two-column contact details, wider card grids |
| ≥ 1024px (desktop) | Four-column product/category grids, product image floats beside content |
| ≤ 400px (small phones) | Reduced heading size and section padding |

---

## Running the site locally

1. Clone or download this repository.
2. Open `index.html` directly in a browser, **or** use a local server (e.g. VS Code / Cursor's "Live Server" extension) so relative links behave exactly as they will once hosted.
3. No installation, dependencies, or build step required.

---

## Functionality notes

- **No online purchasing.** All "buy" actions link to WhatsApp (`wa.me`), `mailto:`, `tel:`, or the enquiry form.
- **Wishlist** — the "Add to Wishlist" buttons on `index.html` and `pages/product.html` save product IDs to the browser's `localStorage`, so a visitor's wishlist persists across page visits without needing an account system.
- **Forms** (contact, enquiry, MUA trade application, newsletter) are currently front-end placeholders — they confirm receipt via an on-page message but don't send data anywhere yet. Connect to a backend or a form service (e.g. Formspree) before going live.
- **Mobile navigation** — below 768px, the nav collapses behind a hamburger button (`.nav-toggle` in `js/script.js`), toggled via `aria-expanded` for accessibility.

---

## Part 1 feedback & changelog

See [`PART1-FEEDBACK-AND-CHANGELOG.md`](./PART1-FEEDBACK-AND-CHANGELOG.md) for the full breakdown of Part 1 feedback and the specific changes made in Part 2 to address it.

---

## References

- Mozilla Developer Network (MDN), n.d. *CSS box model.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model> [Accessed 2026].
- Mozilla Developer Network (MDN), n.d. *Using media queries.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries> [Accessed 2026].
- Mozilla Developer Network (MDN), n.d. *:has() pseudo-class.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/:has> [Accessed 2026].
- Mozilla Developer Network (MDN), n.d. *ARIA: nav role, aria-expanded, aria-current.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA> [Accessed 2026].
- W3C Web Accessibility Initiative (WAI), n.d. *ARIA Authoring Practices Guide — Disclosure (Navigation Menu) Pattern.* [online] Available at: <https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/> [Accessed 2026].
- Google Fonts, n.d. *Poppins.* [online] Available at: <https://fonts.google.com/specimen/Poppins> [Accessed 2026].
- Google Fonts, n.d. *Inter.* [online] Available at: <https://fonts.google.com/specimen/Inter> [Accessed 2026].
- NYX Professional Makeup, n.d. *NYX Professional Makeup — Cruelty-Free & Affordable Makeup.* [online] Available at: <https://www.nyxcosmetics.com> [Accessed 2026]. (Used as brand-positioning inspiration for this fictional coursework brand — no NYX branding, imagery, or trademarks were used.)
- MDN Web Docs, n.d. *Web Storage API — Using the Web Storage API.* [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API> [Accessed 2026]. (Reference for the `localStorage`-based wishlist implementation.)

---

## Author
Kuhle Tiki
ST10525713

Built for WEDE5020 — Web Design and Development, The Independent Institute of Education (IIE), 2026.
