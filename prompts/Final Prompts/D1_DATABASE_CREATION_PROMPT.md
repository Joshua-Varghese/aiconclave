# D1 Database Creation and Integration Prompt — AI Conclave 2026

Run this prompt only after:

1. The final static site has been assembled with `FINAL_INTEGRATOR_INSTRUCTIONS.md`.
2. The static site has been hosted on Cloudflare Pages.
3. The Pages project name and deployed site directory are known.

This is a separate second phase. The first phase must not create database files, Pages Functions, or a D1 database.

## Role

You are the database integration agent for the already-hosted AI Conclave 2026 Cloudflare Pages site. Add database functionality without breaking its existing routes, layout, navigation, or static behavior.

Use Cloudflare D1 and Cloudflare Pages Functions. Do not create a standalone Workers project.

## Fresh database requirement

Create a completely new, dedicated D1 database for this site.

- Do not reuse any existing D1 database.
- Do not attach to a database discovered by listing the account.
- Do not modify or migrate an unrelated database.
- If the requested database name already exists, stop and choose a new database name rather than attaching to it.
- Do not claim success until the newly created database ID, binding, and remote migration have all been verified.

Use a unique name such as `ai-conclave-2026-db-<unique-suffix>` if necessary.

## Required files

Add these paths to the hosted site source directory:

```text
final-site/
  Database/
    README.md
    schema.sql
    migrations/
      0001_initial_schema.sql
  functions/
    api/
      registrations.js
  wrangler.jsonc
```

`Database/schema.sql` is the readable current schema. The numbered migration is the SQL applied to D1. Keep both equivalent.

## Create and configure D1

Run the creation command first and capture the newly generated database ID:

```bash
npx wrangler d1 create ai-conclave-2026-db-<unique-suffix>
```

Then configure `wrangler.jsonc` with:

- the existing Pages project name;
- `pages_build_output_dir` for the existing site;
- the current compatibility date;
- a D1 binding named `DB`;
- the newly created database name;
- the newly created database ID;
- `migrations_dir` pointing to `Database/migrations`.

Never put credentials, API tokens, or private secrets in browser files or committed source.

## Registration schema

Recreate this exact schema. Do not rename columns, change types, remove constraints, normalize `tracks_json` into another table, or add/remove indexes during the initial creation:

```sql
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL CHECK (length(full_name) BETWEEN 1 AND 120),
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  phone TEXT NOT NULL CHECK (length(phone) BETWEEN 3 AND 40),
  organisation TEXT NOT NULL CHECK (length(organisation) BETWEEN 1 AND 160),
  category TEXT NOT NULL CHECK (
    category IN (
      'Student',
      'Faculty',
      'Farmer',
      'Healthcare Professional',
      'Industry',
      'Other'
    )
  ),
  tracks_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registrations_created_at
  ON registrations(created_at);

CREATE INDEX IF NOT EXISTS idx_registrations_category
  ON registrations(category);
```

Write this same SQL to `Database/schema.sql` and to
`Database/migrations/0001_initial_schema.sql` (with only explanatory comments
allowed to differ). Normal migrations must not delete existing data.

## Registration API

The existing Register page is the source of truth for field names and values:

```json
{
  "name": "Full Name",
  "email": "person@example.com",
  "phone": "+91...",
  "organisation": "College or Organisation",
  "category": "Student",
  "tracks": ["Workshops", "Panel Discussion"]
}
```

Implement this Pages Function endpoint:

```text
POST /api/registrations
```

The function must:

1. Parse JSON safely.
2. Validate required fields, email format, allowed categories, allowed tracks, and sensible length limits server-side.
3. Normalize the email before storage.
4. Use a prepared D1 statement; never concatenate request data into SQL.
5. Return HTTP 201 only after the insert succeeds.
6. Return HTTP 409 when the unique email constraint detects a duplicate.
7. Return useful 400, 409, and 500 JSON errors without exposing SQL details or secrets.

The browser must never connect directly to D1. It may only call the Pages Function endpoint.

## Register page integration

Update only the Register page behavior needed to submit the existing form to `/api/registrations`. Preserve:

- field names and values;
- client-side validation;
- the existing confirmation panel and escaped summary;
- layout, styles, navigation, and route structure;
- a clear server error when the registration is not saved.

Show the confirmation panel only after a successful API response. Do not simulate a successful save.

## Apply and deploy

After the new database and migration files are ready:

```bash
npx wrangler d1 migrations apply <new-database-name> --remote
npx wrangler pages deploy . --project-name=<existing-pages-project>
```

The final deployment is still Cloudflare Pages. Pages Functions provide the server-side D1 connection; no standalone Worker project is required.

## Validation before handoff

Verify:

- the existing static routes still load;
- the Register page still validates empty submissions in the browser;
- a valid registration sends one request to `/api/registrations`;
- confirmation appears only after a successful response;
- duplicate email returns a clear error;
- malformed requests are rejected server-side;
- the remote migration exists on the newly created D1 database;
- the `DB` binding points to the newly created database ID;
- no credentials appear in frontend files;
- `ASSEMBLY_NOTES.md` records the new database name, ID, migration status, endpoint, and deployment URL.

If any step cannot be completed, report it explicitly instead of claiming that the database is connected.
