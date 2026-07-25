# Schedule Page — integration instructions

Assemble ten extracted ticket submissions into `Schedule/index.html`, `Schedule/style.css`, and `Schedule/script.js`. Every ticket is an HTML fragment named `submission.html`; every ticket's `assets/` directory is intentionally empty. Extract ZIPs before reading them.

## Shared shell contract (canonical — follow exactly)

The header, footer, shell tokens, and mobile-nav behavior are canonical across all five pages (Home, About, Schedule, Participate, Register). Copy the same shell CSS/JS verbatim into this page's `style.css` / `script.js`. Page-specific CSS must not override shell selectors.

### Header contract

Use the same `#site-header.site-header`, `.header-bar`, `.site-logo`, `#nav-toggle`, `#main-nav`, and `.main-nav-list` structure on every page. The header must contain exactly five links in this order: Home, About, Schedule, Participate, Register. The active page alone gets `class="is-active" aria-current="page"`; all other links have neither attribute. On this Schedule page, only the Schedule link is active. Use the exact accessibility attributes and three `.nav-toggle-bar` spans already specified by the ticket. Never add Hackathon or Panel navigation links, and never add a page-specific header class.

The canonical shell is a sticky white header with a 1px black bottom border, a 1600px header bar, two-line IBM Plex Mono logo, 2px signal-red active/hover underline, and a fixed right-side `.is-open` drawer at 860px or below (`left:30%`, full width at 420px). The Register CTA is always present. Header ticket fragments must not emit CSS; the integrator owns this one canonical shell stylesheet.

Schedule page nav URLs (nested under `Schedule/`, so use `../`):

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

## Required assembly order

1. Ticket 21 immediately inside `body`, then open `<main id="main">`.
2. Ticket 22 as a complete `.page-header` section.
3. Ticket 23 as the day toggle.
4. Ticket 24 as the complete `#schedule-day1` section.
5. Ticket 25 opens the complete `#panel` section and `.panel-grid`; Tickets 26, 27, 28 become its three grid children, and Ticket 28 closes it.
6. Ticket 29 as the complete `#schedule-day2` section, then close main.
7. Ticket 30 after `</main>`.

Do not alter the exact copy, schedule times, speaker roster, IDs, classes, data attributes, `hidden` behavior, or the required `../` links. Preserve the `<!-- SHARD: ... -->` markers. Do not add a Hackathon navigation link—the Hackathon is a Home section, not its own route.

## Shared design and behavior

Load IBM Plex Mono 400/500/600/700 and IBM Plex Sans 400/600/700. Retain the standard AI Conclave signal-field system: `#fafafa` base, `#f0f0ec`/`#e6e6e1` surfaces, `#0a0a0a` text, `#63635c` muted text, red `#ff1e1e`, 1180px container, thin/strong borders, shared button and stamp styles, sticky mobile header, skip link, scroll-progress bar, reveal animation, and reduced-motion behavior.

Add `initScheduleTabs()` to the standard page script. It must listen to `.day-toggle-btn`; group `#schedule-day1` and `#panel` as Day 1, and `#schedule-day2` as Day 2. Once JS loads, show Day 1 and hide Day 2 via the `hidden` attribute. On every switch, set `hidden`, toggle `.is-active`, and update `aria-pressed`. Without JavaScript, all sections must remain visible.

Schedule tables are full-width, border-collapse tables with Time/Event/Details columns. At 640px and below, hide the table header and make rows/cells display as stacked blocks. Panel cards form three columns at desktop, one at 900px or below.

## Verification

At first JavaScript render, Day 1 schedule and all three panel cards show; Day 2 is hidden. Clicking Day 2 reverses that. Test both tab buttons, the hamburger nav, and a desktop and mobile table layout. All details must remain in the DOM after tab switching, with no console errors. Do not create assets, remote APIs, frameworks, or extra content. Leave `ASSEMBLY_NOTES.md` listing the 10 ticket placements.
