# Home Page — integration instructions

You are assembling ten independently submitted HTML fragments into the AI Conclave 2026 Home page. The ZIP files have already been extracted into sibling folders named `ticket-01-header` through `ticket-10-footer`. Each folder contains `instructions.md`, optional `assets/`, and the developer's `submission.html`.

## Shared shell contract (canonical — follow exactly)

The header, footer, shell tokens, and mobile-nav behavior are canonical across all five pages (Home, About, Schedule, Participate, Register). Copy the same shell CSS/JS verbatim into this page's `style.css` / `script.js`. Page-specific CSS must not override shell selectors.

### Header contract

Use the same `#site-header.site-header`, `.header-bar`, `.site-logo`, `#nav-toggle`, `#main-nav`, and `.main-nav-list` structure on every page. The header must contain exactly five links in this order: Home, About, Schedule, Participate, Register. The active page alone gets `class="is-active" aria-current="page"`; all other links have neither attribute. On this Home page, only the Home link is active. Use the exact accessibility attributes and three `.nav-toggle-bar` spans already specified by the ticket. Never add Hackathon or Panel navigation links, and never add a page-specific header class.

The canonical shell is a sticky white header with a 1px black bottom border, a 1600px header bar, two-line IBM Plex Mono logo, 2px signal-red active/hover underline, and a fixed right-side `.is-open` drawer at 860px or below (`left:30%`, full width at 420px). The Register CTA is always present. Header ticket fragments must not emit CSS; the integrator owns this one canonical shell stylesheet.

Home page nav URLs (no `../` prefix):

| Link | href |
| --- | --- |
| Home | `index.html` |
| About | `About/index.html` |
| Schedule | `Schedule/index.html` |
| Participate | `Participate/index.html` |
| Register | `Register/index.html` |

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

## Required final structure

Create one `index.html`, `style.css`, and `script.js` at the final site root. Extract every ZIP before reading it. Assemble the page in this exact order:

1. Ticket 01: shared top-level utilities, then the site header.
2. Open `<main id="main">`, then Ticket 02, Ticket 03, and Ticket 04 inside one `<section id="hero" class="dot-field">` and one `.hero-ticket`.
3. Ticket 05, then Tickets 06, 07, and 08 inside one `<section id="hackathon" class="section">` and one `.hackathon-grid`.
4. Ticket 09 inside `<section id="explore" class="section">`.
5. Close `</main>`, then Ticket 10 as the footer.

Do not nest the footer in `main`. Preserve all `<!-- SHARD: ... -->` comments, all required IDs/classes, text, links, attributes, and data attributes. The existing five-page site uses `About/index.html`, `Schedule/index.html`, `Participate/index.html`, and `Register/index.html`; retain those exact relative URLs.

## Shared visual system

Load Google Fonts: IBM Plex Mono weights 400/500/600/700 and IBM Plex Sans weights 400/600/700. Use the existing signal-field system exactly:

```css
:root { --color-base:#fafafa; --color-surface:#f0f0ec; --color-text:#0a0a0a; --color-text-soft:#63635c; --color-line:rgba(10,10,10,.08); --color-line-strong:#8f8f86; --color-signal:#ff1e1e; --color-signal-bright:#ff4545; --font-display:"IBM Plex Mono",monospace; --font-body:"IBM Plex Sans",sans-serif; --space-xs:.5rem; --space-sm:.75rem; --space-md:1.25rem; --space-lg:2rem; --space-xl:3.5rem; --space-2xl:5.5rem; --container-width:1180px; }
body { margin:0; background:var(--color-base); color:var(--color-text); font-family:var(--font-body); line-height:1.6; }
.container { width:100%; max-width:var(--container-width); margin-inline:auto; padding-inline:var(--space-md); }
.section { padding-block:var(--space-2xl); border-bottom:1px solid var(--color-line); }
```

Respect each fragment's scoped CSS. Consolidate it into `style.css` only when no selector changes meaning. Add the existing Home behavior to `script.js`: mobile-navigation toggle (`#nav-toggle` / `#main-nav`), reveal of `[data-reveal]`, scroll progress (`#scroll-progress`), and count-up of `[data-count-to]`. Respect `prefers-reduced-motion`.

## Assets

This Home shard has no image, video, icon, or font assets. Do not invent or request assets. The `assets/` directories are intentionally empty and should stay empty unless a developer actually supplies an asset in their submission.

## Verification checklist

- Confirm no omitted tickets, duplicate header/footer, duplicate `id`, or orphaned wrapper.
- At desktop: show the wide sticky navigation, boarding-pass hero, three-column hero metadata, three-column hackathon grid, and four Explore cards.
- At 860px or below: hamburger nav works. At 780px or below: hackathon grid stacks. At 720px or below: hero metadata stacks. At 560px or below: Explore cards stack.
- `₹1,00,000` remains visible without JavaScript and animates when visible when JavaScript is enabled.
- All four page links resolve relatively and the active Home link has `aria-current="page"`.
- Do not add a framework, build tool, placeholder, database, remote API, or page content not present in a shard.

Leave `ASSEMBLY_NOTES.md` listing each ticket and its insertion point, plus any conflicts resolved.
