# Register Page — integration instructions

Assemble ten extracted ticket submissions into `Register/index.html`, `Register/style.css`, and `Register/script.js`. Each ticket provides `submission.html` and has an empty `assets/` directory. Do not create, expect, or invent assets.

## Shared shell contract (canonical — follow exactly)

The header, footer, shell tokens, and mobile-nav behavior are canonical across all five pages (Home, About, Schedule, Participate, Register). Copy the same shell CSS/JS verbatim into this page's `style.css` / `script.js`. Page-specific CSS must not override shell selectors.

### Header contract

Use the same `#site-header.site-header`, `.header-bar`, `.site-logo`, `#nav-toggle`, `#main-nav`, and `.main-nav-list` structure on every page. The header must contain exactly five links in this order: Home, About, Schedule, Participate, Register. The active page alone gets `class="is-active" aria-current="page"`; all other links have neither attribute. On this Register page, only the Register link is active. Use the exact accessibility attributes and three `.nav-toggle-bar` spans already specified by the ticket. Never add Hackathon or Panel navigation links, and never add a page-specific header class.

The canonical shell is a sticky white header with a 1px black bottom border, a 1600px header bar, two-line IBM Plex Mono logo, 2px signal-red active/hover underline, and a fixed right-side `.is-open` drawer at 860px or below (`left:30%`, full width at 420px). The Register CTA is always present. Header ticket fragments must not emit CSS; the integrator owns this one canonical shell stylesheet.

Register page nav URLs (nested under `Register/`, so use `../`):

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

1. Ticket 41 inside `body`, then open `<main id="main">`.
2. Ticket 42 is the full registration page-header.
3. Open `<section id="registration-form" class="section"><div class="container register-layout">`; insert Tickets 43–47 as one form. Ticket 43 opens `<form id="register-form" novalidate>`; Ticket 47 closes it.
4. Insert Ticket 48 as the confirmation panel. Ticket 49 closes the layout, section, and main.
5. Insert Ticket 50 after main.

Do not modify required comments, text, IDs, label/for pairs, `name` values, values, input types, autocomplete values, `novalidate`, or `aria-*` attributes. Preserve the `../` page paths and do not add a Hackathon route.

## Registration behavior — required

This competition version intentionally has **no database, backend, Google Form, API call, or network request**. Implement the current local demo behavior only. On submit: prevent default; validate nonempty `name`, `email`, `phone`, `organisation`, and `category`; show `#register-error` with `.is-visible` when invalid. Tracks remain optional. If valid, read checked `input[name="tracks"]`, build a local formData object, and show the confirmation panel. Populate `#confirmation-summary` with escaped Name, Email, Category, and comma-separated Tracks (`None selected` when empty). Hide the form, add `.is-visible` to the panel, set `tabindex="-1"`, and focus it. `#register-again` resets the form, hides the panel, restores the form, and focuses the name field. Avoid unsafe direct interpolation: escape all user text before using `innerHTML`.

Also include the standard nav toggle, reveal, scroll-progress, count-up no-op, and reduced-motion behavior. Form layout is max 760px centered; two columns for rows and tracks, one column at 640px. Checkboxes use signal-red accent and their card border changes red when checked. The confirmation panel is hidden until success.

## Verification

Test invalid required submission, valid submit with no tracks, valid submit with multiple tracks, user text containing `<` or `&`, and Register Another Person. Check all five required inputs, four optional track checkboxes, form labels, active Register nav link, responsive form layout, and no console errors. Leave `ASSEMBLY_NOTES.md` with all 10 ticket insertions.
