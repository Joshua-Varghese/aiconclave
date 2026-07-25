# About Page — integration instructions

You are assembling ten independently submitted HTML fragments into the AI Conclave 2026 About page. Extract every submitted ZIP first. Each extracted ticket folder contains `instructions.md`, its developer's `submission.html`, and an intentionally empty `assets/` folder.

## Shared shell contract (canonical — follow exactly)

The header, footer, shell tokens, and mobile-nav behavior are canonical across all five pages (Home, About, Schedule, Participate, Register). Copy the same shell CSS/JS verbatim into this page's `style.css` / `script.js`. Page-specific CSS must not override shell selectors.

### Header contract

Use the same `#site-header.site-header`, `.header-bar`, `.site-logo`, `#nav-toggle`, `#main-nav`, and `.main-nav-list` structure on every page. The header must contain exactly five links in this order: Home, About, Schedule, Participate, Register. The active page alone gets `class="is-active" aria-current="page"`; all other links have neither attribute. On this About page, only the About link is active. Use the exact accessibility attributes and three `.nav-toggle-bar` spans already specified by the ticket. Never add Hackathon or Panel navigation links, and never add a page-specific header class.

The canonical shell is a sticky white header with a 1px black bottom border, a 1600px header bar, two-line IBM Plex Mono logo, 2px signal-red active/hover underline, and a fixed right-side `.is-open` drawer at 860px or below (`left:30%`, full width at 420px). The Register CTA is always present. Header ticket fragments must not emit CSS; the integrator owns this one canonical shell stylesheet.

About page nav URLs (nested under `About/`, so use `../`):

| Link | href |
| --- | --- |
| Home | `../index.html` |
| About | `../About/index.html` |
| Schedule | `../Schedule/index.html` |
| Participate | `../Participate/index.html` |
| Register | `../Register/index.html` |

### Footer contract

Every page must use exactly this footer markup and no additional footer content:

```html
<footer id="footer">
  <div class="container footer-grid">
    <div class="footer-org">
      <span class="site-logo">AI CONCLAVE <span class="logo-year">2026</span></span>
      <p class="footer-departments">Organised by AI Club, Student Council &ndash; AJCE &middot; CA &middot; CSE &middot; AD &middot; ECE &middot; EEE</p>
    </div>
    <div class="footer-meta">
      <p>Amal Jyothi College of Engineering<br />Kanjirappally, Kerala</p>
      <p>&copy; 2026 AI Conclave</p>
    </div>
  </div>
</footer>
```

Footer CSS is also canonical: 1.25rem vertical padding, no bottom border, wrapping flex columns with space-between, muted IBM Plex Mono metadata right-aligned on desktop and left-aligned at 640px. Footer ticket fragments must not emit CSS.

### Shell CSS selectors that page CSS must not redefine

Do not redefine: `.site-logo`, `.header-bar`, `.main-nav`, `.main-nav-list`, `.nav-toggle`, `#footer`, `.footer-grid`, `.footer-org`, `.footer-departments`, or `.footer-meta`.

Create `About/index.html`, `About/style.css`, and `About/script.js`. Build the body in this exact order:

1. Ticket 11 immediately inside `body`, then open `<main id="main">`.
2. Open `<section id="about" class="section"><div class="container about-grid">`; append Tickets 12–15 as the left grid column.
3. Append Tickets 16–19 as the right grid column. Ticket 19 closes `.about-stats`, the right column, `.about-grid`, the section, and `main`.
4. Append Ticket 20 after `</main>`.

Every `<!-- SHARD: ... -->` marker, exact copy, element ID/class, link path, accessibility attribute, and `data-*` value is contractual. Keep `../` links because this assembled page is in the `About/` directory. Do not add a separate header, footer, section wrapper, or content outside the ticket contracts.

## Shared system

Use IBM Plex Mono 400/500/600/700 and IBM Plex Sans 400/600/700. Preserve the same design tokens and shared behavior as Home: near-white base `#fafafa`, surface `#f0f0ec`, black text `#0a0a0a`, muted `#63635c`, signal red `#ff1e1e`, `--container-width:1180px`, 1px line borders, a sticky header, button styles, stamps, skip link, scroll-progress bar, reveal animation, reduced-motion fallback, and the mobile-nav drawer. Load the existing shared script functionality: navigation toggle, reveal, scroll progress, and count-up.

The About-specific layout is `.about-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:5.5rem; align-items:start; }`; stack to one column at 860px. `.about-stats` is a 2×2 strongly bordered grid. Each statistic has `data-count-to`; leave its real displayed number in place as its no-JS fallback.

## Assets and verification

No assets are required. Do not invent images, logos, illustrations, or external content.

Verify a desktop layout with prose on the left and the 2×2 statistic grid on the right; verify a single-column layout at 860px or narrower; confirm About is the active nav link; confirm every `../` page URL remains exact; confirm count-up, hamburger nav, scroll progress and reveal work without console errors. Leave `ASSEMBLY_NOTES.md` with each ticket's insertion point and any conflict resolved.
