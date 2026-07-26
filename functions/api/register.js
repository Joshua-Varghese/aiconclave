const ALLOWED_CATEGORIES = new Set([
  "Student",
  "Faculty",
  "Farmer",
  "Healthcare Professional",
  "Industry",
  "Other",
]);

const ALLOWED_TRACKS = new Set([
  "Workshops",
  "Hackathon (Technical)",
  "Hackathon (Non-Technical)",
  "Panel Discussion",
]);

const MAX_LEN = {
  name: 120,
  email: 254,
  phone: 40,
  organisation: 200,
  category: 80,
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

function badRequest(message, details) {
  return json({ ok: false, error: message, details: details || null }, 400);
}

function trimStr(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email) {
  // Practical check — not a full RFC parser.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function onRequestPost(context) {
  const db = context.env && context.env.DB;
  if (!db) {
    return json(
      { ok: false, error: "Registration service is not configured." },
      503
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  if (!body || typeof body !== "object") {
    return badRequest("Invalid request body.");
  }

  const name = trimStr(body.name, MAX_LEN.name);
  const email = trimStr(body.email, MAX_LEN.email).toLowerCase();
  const phone = trimStr(body.phone, MAX_LEN.phone);
  const organisation = trimStr(body.organisation, MAX_LEN.organisation);
  const category = trimStr(body.category, MAX_LEN.category);

  const tracksRaw = Array.isArray(body.tracks) ? body.tracks : [];
  const tracks = [];
  for (const t of tracksRaw) {
    if (typeof t !== "string") continue;
    const value = t.trim();
    if (ALLOWED_TRACKS.has(value) && !tracks.includes(value)) {
      tracks.push(value);
    }
  }

  const errors = [];
  if (!name) errors.push("name");
  if (!email || !isValidEmail(email)) errors.push("email");
  if (!phone || !isValidPhone(phone)) errors.push("phone");
  if (!organisation) errors.push("organisation");
  if (!category || !ALLOWED_CATEGORIES.has(category)) errors.push("category");

  if (errors.length) {
    return badRequest("Please fill in all required fields correctly.", errors);
  }

  try {
    const result = await db
      .prepare(
        `INSERT INTO registrations
          (name, email, phone, organisation, category, tracks)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(name, email, phone, organisation, category, JSON.stringify(tracks))
      .run();

    const id = result && result.meta ? result.meta.last_row_id : null;

    return json(
      {
        ok: true,
        id,
        registration: {
          name,
          email,
          phone,
          organisation,
          category,
          tracks,
        },
      },
      201
    );
  } catch (err) {
    console.error("register insert failed", err && err.message ? err.message : err);
    return json({ ok: false, error: "Could not save registration. Try again." }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
        "access-control-max-age": "86400",
      },
    });
  }
  return json({ ok: false, error: "Method not allowed." }, 405);
}
