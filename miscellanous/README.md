KATT Cosmetics — Website (PoE Project)

Live site: https://kuhle-tiki.github.io/KATTCosmetics/ Repository: https://github.com/Kuhle-Tiki/KATTCosmetics

A multi-page website for KATT Cosmetics, a fictional professional makeup and beauty brand created for academic coursework (IIE PoE, WEDE5020), inspired by the positioning of real professional makeup brands such as NYX Cosmetics.

KATT Cosmetics is a showcase site, not an online store. There is no cart or checkout. Every "purchase" path routes the customer to WhatsApp, email, phone, or an enquiry form.

Part 1 delivered the proposal document and a plain semantic HTML5 structure. Part 2 added the external stylesheet, responsive design, wishlist and documentation. Part 3 (this submission) adds JavaScript interactivity, dynamic content, SEO, validated forms with email processing, and deployment.

Contents
Live pages · 2. Folder structure · 3. Tech stack · 4. Design system · 5. Part 3 features · 6. Changelog · 7. Running locally · 8. Known limitations · 9. References

Live pages
Page	File	Purpose
Home	index.html	Hero, how-to-buy, category links, featured products, newsletter signup
About Us	pages/about.html	Brand history, mission, vision, values, target audience
Products	pages/product.html	Featured product with shade picker, plus a searchable, filterable, sortable catalogue
MUA Trade Portal	pages/muatradeportal.html	Trade benefits, eligibility, validated application form
Enquire to Purchase	pages/enquiry.html	Process explainer, validated enquiry form with instant price/availability estimate, FAQ accordion
Contact	pages/contact.html	Contact details, validated message form that builds an email, FAQ accordion, interactive store map

Folder structure
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

Tech stack
HTML5: semantic elements (header, nav, main, section, article, figure, dl, details, table).
CSS3: custom properties, Flexbox, Grid, media queries, CSS transitions/animations.
Vanilla JavaScript (ES6): fetch (AJAX), DOM manipulation, IntersectionObserver, localStorage.
Leaflet 1.9.4 + OpenStreetMap tiles for the store map (library self-hosted).
Google Fonts: Poppins and Inter.
Git/GitHub for version control; GitHub Pages for hosting.    

Design system
Token	Value	Use
Black	
#1A1A1A	Header, footer, hero
Cream / dim	
#F5F1EB / 
#ECE5D8	Page and alternating section backgrounds
Hot pink	
#E6007A	Links, primary accent, results box
Gold	
#C9A227	Secondary accent, focus rings

Breakpoints: single column below 700px with a hamburger menu; grids and inline navigation above.