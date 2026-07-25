# Final Site Integrator — AI Conclave 2026

Before copying page outputs, validate them against `SHARED_SHELL_CONTRACT.md`. The five pages must have byte-identical header/footer markup and canonical shell CSS/JS, with only active nav state and relative URL prefixes varying. If outputs differ, normalize them to the contract before handoff.

You are the final assembly agent. Five page-integration jobs have already completed. Your job is to turn them into one deployable static website.

This phase is frontend assembly only. Do not create a database, Pages Functions, or database configuration here. After this site has been hosted on Cloudflare Pages, run `D1_DATABASE_CREATION_PROMPT.md` as a separate second phase.

## Input layout

The platform has extracted the page-level integration outputs into these directories. Each has its finished `index.html`, `style.css`, `script.js`, and optional `assets/` directory:

```text
integrated-pages/
  home/
  about/
  schedule/
  participate/
  register/
```

The original ticket submissions may also be present, but do **not** re-integrate individual tickets here. Treat the five completed page outputs as the source of truth. If a page output uses an `assets/` directory, copy those assets exactly; never omit an asset that its HTML/CSS/JS references.

Each completed page is already a self-contained static document. It must contain exactly one page header/navigation and exactly one footer. Do not merge headers or footers across pages, and do not create a duplicate header/footer while moving a completed page.

## Required output

Create a clean deployable folder named `final-site/` with this exact URL-facing structure:

```text
final-site/
  index.html
  style.css
  script.js
  assets/                 # only if Home needs assets
  About/
    index.html
    style.css
    script.js
    assets/               # only if About needs assets
  Schedule/
    index.html
    style.css
    script.js
    assets/               # only if Schedule needs assets
  Participate/
    index.html
    style.css
    script.js
    assets/               # only if Participate needs assets
  Register/
    index.html
    style.css
    script.js
    assets/               # only if Register needs assets
```

Map sources exactly:

| Completed page source | Destination |
| --- | --- |
| `integrated-pages/home/` | `final-site/` |
| `integrated-pages/about/` | `final-site/About/` |
| `integrated-pages/schedule/` | `final-site/Schedule/` |
| `integrated-pages/participate/` | `final-site/Participate/` |
| `integrated-pages/register/` | `final-site/Register/` |

`final-site/index.html` is mandatory. It is the Home page and is what Cloudflare Pages serves for the domain root. Do not leave Home nested in `final-site/Home/`.

## Cross-page contract

Make these exact navigation destinations work on every page:

| Link text | On Home (`/`) | On nested pages |
| --- | --- | --- |
| Home | `index.html` | `../index.html` |
| About | `About/index.html` | `../About/index.html` |
| Schedule | `Schedule/index.html` | `../Schedule/index.html` |
| Participate | `Participate/index.html` | `../Participate/index.html` |
| Register | `Register/index.html` | `../Register/index.html` |

The Home nav’s `Home` link alone has `class="is-active" aria-current="page"`. The equivalent active nav link must appear on each nested page. There must be no `Hackathon/index.html` link or `Panel/index.html` link: Hackathon is a section on Home, and the panel discussion belongs to Schedule.

Keep every per-page stylesheet and script alongside its HTML. Do not convert the project to React, Vite, a framework, modules, a backend, or a database. Do not add build tooling, a package manager, or deploy configuration. This phase produces a plain static HTML/CSS/JS site.

## Asset rules

1. Preserve asset paths relative to the page that references them whenever possible.
2. If two pages have assets with the same filename but different contents, keep them in their respective page-local `assets/` directories; do not overwrite either.
3. If two pages share an identical asset, it is acceptable to keep copies page-local. Do not rewrite valid paths merely to deduplicate.
4. Do not create placeholder images, fonts, or empty asset files. This particular site may legitimately have no assets.

## Functional preservation

Do not discard page-specific behavior:

- Home: mobile nav, reveal, scroll-progress, prize count-up.
- About: mobile nav, reveal, scroll-progress, statistic count-up.
- Schedule: Day 1/Day 2 toggle; Day 1 includes the panel section; no-JavaScript fallback shows both days.
- Participate: mobile nav, reveal, scroll-progress.
- Register: local-only validation and confirmation panel; do not invent a backend or network request in this phase. The follow-up database phase is specified in `D1_DATABASE_CREATION_PROMPT.md`.

## Required validation before handoff

1. Confirm these files exist: root `index.html`, nested page `index.html` files, and every locally referenced stylesheet/script.
2. Open `final-site/index.html` through a local static server and verify Home loads without console errors.
3. From Home, open About, Schedule, Participate, and Register through the nav. From each nested page, use Home and one sibling link to return/navigate successfully.
4. On Schedule, click Day 2 and confirm Day 1 plus its panel hide while Day 2 shows; click Day 1 and confirm the reverse.
5. On Register, submit once with empty required fields and once with valid fields; confirm inline error and confirmation panel respectively.
6. Test the mobile navigation at or below 860px and the responsive page layouts at their specified breakpoints.
7. Confirm no navigation points to missing routes, no `file://` URLs are embedded in source, and no page is blank.

Create `final-site/ASSEMBLY_NOTES.md` with:

- the source directory used for each destination page;
- every modified relative path and why;
- assets copied for each page (or `none`);
- validation results and any unresolved problem.

Do not hand off until the root Home page and all four nested pages work as one static site.
