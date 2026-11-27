# Panabo City Website Redesign – Student Prototype

> PROPOSED STUDENT PROTOTYPE – NOT THE OFFICIAL WEBSITE.
> Official site: https://panabocity.gov.ph/

A clickable, responsive prototype of a redesigned City Government of Panabo website.
Plain HTML, CSS and JavaScript: no build step, no install.

## How to launch

**Option 1 – just open it:** double-click `index.html` (any modern browser).

**Option 2 – local server (recommended for presenting):**

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```
or `npx serve .` if you have Node.js.

To view the mobile layout, open browser DevTools (F12) → device toolbar → set 390 × 844.

## Screens

| Screen | File |
|---|---|
| Desktop homepage (1440 × 2200; first screen 1440 × 1024) | `index.html` |
| Desktop Downloadable Forms (1440 × 1024) | `forms.html` |
| Mobile homepage (390 × 844) + open-menu screen | `index.html` at 390 px, tap **Menu** |
| Optional: Executive Orders (year filter, 2026 empty state) | `executive-orders.html` |
| Optional: Public Documents (Preview → failure message) | `public-documents.html` |
| Optional: Contact Us (form, validation, confirmation, map) | `contact.html` |
| Optional: Site Map | `sitemap.html` |
| Optional: Transparency Seal | `transparency.html` |
| Supporting pages | `services.html`, `citizens-charter.html`, `directory.html`, `hotlines.html`, `faqs.html`, `news.html`, `privacy.html` |

PNG exports (2×) are in `exports/`: `after_homepage_desktop.png`, `after_homepage_desktop_firstscreen.png`,
`after_forms_desktop.png`, `after_homepage_mobile.png`.

## What works

- Text size A− / A / A+ and High Contrast toggle (remembered across pages).
- Homepage search filters services, forms and offices as you type.
- Carousel with Pause/Play, Previous/Next and dots; pauses while focused; starts paused if the user prefers reduced motion.
- Forms page: live search by form name + office filter, empty state, `?q=` links from the homepage.
- Mobile full-screen menu with Close button, Esc to close and focus trapping.

## Content sources and sample data

Verified from panabocity.gov.ph (November 26, 2026): tagline, menu structure, emergency hotline numbers,
news headlines and dates, the Business Permit Application Form PDF, eBOSS link, Facebook page.

Marked **Sample** in the UI: City Hall address, trunk line, email, office hours, all other forms,
executive orders, public documents, FAQ answers and office phone numbers. Demo download buttons show
a notice instead of downloading. The city seal and Transparency Seal are placeholder graphics, and the
carousel images are illustrations standing in for real photos.

## Design system

Colors, type scale and components are defined as CSS custom properties in `assets/css/styles.css`
(Panabo green `#1E7B34`, dark green `#15572A`, light green `#EEF6ED`, text `#1A1A1A` / `#4A4A4A`,
links `#0B57D0`, banner yellow `#F2C94C`; Source Sans 3; H1 32 / H2 24 / H3 18 / body 17 at 150%).
The page chrome follows the Philippine government web template pattern: GOVPH bar with Philippine Standard
Time, official masthead, white menu bar with keyboard-accessible dropdowns, and the standard GOVPH footer.
Desktop content width 1200 px with 24 px gutters; mobile 16 px margins. Targets are at least 44 px (48 px on mobile).
