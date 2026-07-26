-- AI Conclave 2026 registrations
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organisation TEXT NOT NULL,
  category TEXT NOT NULL,
  tracks TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_registrations_email
  ON registrations (email);

CREATE INDEX IF NOT EXISTS idx_registrations_created_at
  ON registrations (created_at);
