# Kapoor's Cafe Website

A premium, fully responsive **demonstration website concept** for **Kapoor's Cafe – HITEC City**, Hyderabad. Designed as a modern Punjabi-kitchen and rooftop-dining brand experience, the site pairs an editorial layout with an elegant burgundy-and-gold palette and carefully art-directed sections.

> **Note:** This is an independent design concept created for presentation purposes. It is **not** an official or authorised Kapoor's Cafe website. All dishes, prices and contact details shown are illustrative sample content.

---

## Website Preview

🔗 **Live site:** [https://kapoors-cafe-website.vercel.app](https://kapoors-cafe-website.vercel.app)

Deployed as a static site on **Vercel**. Open the link on any device — desktop, tablet or mobile.

---

## About the Project

The website presents the cafe's identity through a cinematic, story-driven experience — rich Punjabi cuisine photography, a filterable menu, signature dish showcases, an immersive rooftop section and a validated reservation enquiry form. It is built with clean, dependency-free HTML, CSS and JavaScript and is optimised for fast loading, accessibility and reduced-motion preferences.

---

## Features

- **Sticky, scroll-aware navigation** with an elegant full-screen mobile menu
- **Cinematic hero** with an asymmetric editorial layout and animated text reveal
- **Our Story** section with layered image composition
- **Signature dishes** presented as alternating, full-width editorial rows
- **Interactive menu** with 9 category filters and 24 sample dishes
- **Rooftop experience** section with an immersive photographic backdrop
- **Responsive gallery** with a keyboard-accessible lightbox
- **Validated reservation enquiry form** (demo only — no booking is created or sent)
- **Contact & location** with Google Maps embed, WhatsApp and directions links
- **Accessibility:** semantic HTML, skip link, ARIA labels, visible focus states
- **Reduced-motion support** via `prefers-reduced-motion`
- **SEO metadata** and Open Graph tags

### Website Sections

| Section | Description |
| --- | --- |
| Home / Hero | Headline, supporting copy and primary calls to action |
| Our Story | The cafe's narrative and brand pillars |
| Signature Dishes | Six featured dishes with photography and descriptions |
| Menu | Filterable list of starters, Punjabi specialities, tandoor, mains, breads, rice, desserts and beverages |
| Experiences (Rooftop) | Rooftop dining concept with an image collage |
| Gallery | Magazine-style mosaic with lightbox viewer |
| Reserve a Table | Validated enquiry form (demonstration only) |
| Contact | Address, hours, map and WhatsApp enquiry |
| Footer | Navigation, contact summary and demo disclaimer |

---

## Technologies Used

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, responsive and motion design
- **JavaScript (Vanilla)** — navigation, filtering, lightbox, form validation and scroll reveals
- **Google Fonts** — Bodoni Moda (serif) and Jost (sans-serif)
- **Google Maps Embed** — location map
- No frameworks, build tools or runtime dependencies

---

## Project Structure

```
kapoors-cafe-website/
├── index.html          # Main page and all sections
├── css/
│   └── style.css       # Complete stylesheet (design system + responsive)
├── js/
│   └── main.js         # Navigation, menu filtering, lightbox, form validation
├── images/             # All website photography (dishes, rooftop, gallery)
├── .gitignore
└── README.md
```

---

## Run the Website Locally

The site is fully static — no build step required.

**Option 1 — Open directly:**
Double-click `index.html` to open it in a browser.

**Option 2 — Local server (recommended):**

```bash
# Python
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then visit **http://localhost:8000**.

---

## Deploy on Vercel

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New → Project**.
3. Import the `kapoors-cafe-website` repository.
4. Keep the defaults:
   - **Framework Preset:** Other
   - **Build Command:** _(leave empty)_
   - **Output Directory:** _(leave empty / root)_
5. Click **Deploy**. Vercel serves `index.html` directly as a static site.
6. Update the **Website Preview** link above with the generated URL.

---

## Credits

**Concept, design & development:** Nandini & Bhavya — freelance website developers based in Hyderabad.

- **Photography:** Dish and interior photographs sourced from Wikimedia Commons and Unsplash, used under their respective licences for this demonstration.
- **Fonts:** [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) and [Jost](https://fonts.google.com/specimen/Jost) via Google Fonts.

---

## Project Information

- **Project:** Kapoor's Cafe — Website Concept
- **Location:** HITEC City, Hyderabad, Telangana, India
- **Cuisine:** Punjabi & North Indian
- **Type:** Demonstration / portfolio website concept
- **Status:** Completed design — live on Vercel

---

_This website is a demonstration concept and is not affiliated with or authorised by Kapoor's Cafe. All unverified details, dishes and prices are illustrative sample content._
