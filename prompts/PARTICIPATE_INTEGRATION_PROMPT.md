# Participate Page — integration instructions

Combine ten extracted `submission.html` fragments into `Participate/index.html`, `Participate/style.css`, and `Participate/script.js`. Ticket assets are intentionally empty; no assets are required.

## Shared shell contract (canonical — follow exactly)

The header, footer, shell tokens, and mobile-nav behavior are canonical across all five pages (Home, About, Schedule, Participate, Register). Copy the same shell CSS/JS verbatim into this page's `style.css` / `script.js`. Page-specific CSS must not override shell selectors.

### Header contract

Use the same `#site-header.site-header`, `.header-bar`, `.site-logo`, `#nav-toggle`, `#main-nav`, and `.main-nav-list` structure on every page. The header must contain exactly five links in this order: Home, About, Schedule, Participate, Register. The active page alone gets `class="is-active" aria-current="page"`; all other links have neither attribute. On this Participate page, only the Participate link is active. Use the exact accessibility attributes and three `.nav-toggle-bar` spans already specified by the ticket. Never add Hackathon or Panel navigation links, and never add a page-specific header class.

The canonical shell is a sticky white header with a 1px black bottom border, a 1600px header bar, two-line IBM Plex Mono logo, 2px signal-red active/hover underline, and a fixed right-side `.is-open` drawer at 860px or below (`left:30%`, full width at 420px). The Register CTA is always present. Header ticket fragments must not emit CSS; the integrator owns this one canonical shell stylesheet.

Participate page nav URLs (nested under `Participate/`, so use `../`):

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

## Exact assembly order

1. Ticket 31 inside `body`, then open `<main id="main">`.
2. Open `<section id="participants" class="section"><div class="container">`; insert Ticket 32.
3. Insert Ticket 33, which opens `.participants-grid`.
4. Insert Tickets 34 and 35 as the single Agriculture card; Tickets 36 and 37 as the single Health card; Tickets 38 and 39 as the single Education card. Ticket 39 closes the grid, section, and main.
5. Insert Ticket 40 after main.

Preserve every required shard comment, ID, class, exact list item, `data-reveal`, and `../` page path. Do not add a Hackathon nav route, imagery, a form, a database, or extra audience groups.

## Shared system and verification

Use the standard AI Conclave shared system: IBM Plex Mono + IBM Plex Sans, signal-field colors, 1180px container, sticky responsive header, red active marker, skip link, scroll progress, reveal behavior, and reduced-motion fallback. The participants grid has three equal desktop columns and one column at 900px or below. Every sector card has a thin border, 3px signal-red top border, and 2rem padding. List entries are muted 0.95rem and use an em dash as the CSS pseudo-element, not literal added glyphs in each list item.

Verify all three sector cards, their full 11/12/12 item rosters, header active state, 900px one-column layout, no-console-error reveal/mob-nav behavior, and no missing closures. Leave `ASSEMBLY_NOTES.md` with all ticket placements.
