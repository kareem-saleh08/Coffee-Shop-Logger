# Coffee Shop Logger — CLAUDE.md

## Project Purpose

A full-stack daily-logging app for coffee-shop small businesses. Owners record each day's sales total and customer count; the dashboard shows today's numbers, all-time running totals, and an interactive chart of performance over time. Data persists in a local SQLite database that seeds itself automatically on first run.

---

## Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js + Express (port 3001)       |
| Frontend   | Vite + React + Tailwind CSS (port 5173) |
| Database   | SQLite via `node:sqlite` (Node.js built-in, Node 24+) |
| Charts     | Plotly.js (`react-plotly.js`)       |
| Tests      | Node.js `node:test` + Supertest     |
| Dev runner | `concurrently`                      |

---

## File Structure

```
coffeeshop-logger/
├── CLAUDE.md               ← this file
├── README.md
├── package.json            ← server deps + concurrently + vitest + supertest
├── .gitignore
├── data/
│   └── logs.db             ← SQLite DB (auto-created + seeded on first run)
├── server/
│   ├── index.js            ← Express entry point, port 3001
│   ├── db.js               ← createDb(path) factory: schema + seed
│   └── routes/
│       └── log.js          ← POST /api/log, GET /api/summary
├── tests/
│   └── api.test.js         ← Vitest + Supertest API tests
└── client/
    ├── package.json        ← React, Vite, Tailwind, Plotly
    ├── index.html          ← Inter font loaded here
    ├── vite.config.js      ← proxies /api → http://localhost:3001
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx         ← view state: "dashboard" | "form"
        ├── index.css       ← Tailwind directives
        └── components/
            ├── EntryForm.jsx
            └── Dashboard.jsx
```

---

## Commands

### Start the app (backend + frontend together)
```bash
npm run dev
```
- Backend starts on http://localhost:3001
- Frontend starts on http://localhost:5173
- Both launch simultaneously via `concurrently`

### Run tests
```bash
npm run test
```
- Runs Vitest against `tests/api.test.js`
- Uses an in-memory SQLite instance (`:memory:`) — no side effects on `data/logs.db`

### Start backend only
```bash
npm run server:dev
```

### Start frontend only
```bash
npm run client:dev
```

---

## Database

- **Location:** `data/logs.db` (relative to repo root)
- **Auto-created** on first server start if it doesn't exist
- **Auto-seeded** with 28 days of realistic coffee-shop data (2026-05-11 → 2026-06-08) when the table is empty

### Schema
```sql
CREATE TABLE IF NOT EXISTS daily_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  date       TEXT    NOT NULL,
  sector     TEXT    NOT NULL,
  sales      REAL    NOT NULL,
  customers  INTEGER NOT NULL
);
```

---

## API Endpoints

### POST /api/log
Logs a daily entry.

**Request body:**
```json
{ "date": "2026-06-09T20:30:00", "sales": 123.45, "customers": 10 }
```

- `sector` is always `"coffee"` — hardcoded on the server, never accepted from the client.
- All three fields are required. `sales` must be a finite number. `customers` must be a positive integer.

**Response 201:**
```json
{ "id": 29, "date": "2026-06-09T20:30:00", "sector": "coffee", "sales": 123.45, "customers": 10 }
```

**Response 400:**
```json
{ "error": "Missing required field: date" }
```

### GET /api/summary
Returns totals and all entries for a sector.

**Query params (all optional):**
- `sector` — defaults to `"coffee"`
- `from` — ISO timestamp lower bound (inclusive)
- `to` — ISO timestamp upper bound (inclusive)

**Response 200:**
```json
{
  "sector": "coffee",
  "totalSales": 5432.10,
  "totalCustomers": 617,
  "entries": [
    { "id": 1, "date": "2026-05-11T08:14:00", "sales": 87.50, "customers": 9 },
    ...
  ]
}
```

---

## Coding Conventions

- **API responses:** JSON-only. Always return `Content-Type: application/json`.
- **Timestamps:** Full ISO-8601 timestamp strings (e.g., `"2026-06-09T20:30:00"`), never date-only strings.
- **Sector:** Always `"coffee"`. The server hardcodes it on write; the client never sends it.
- **DB factory:** `server/db.js` exports `createDb(path)` so tests can pass `":memory:"` for isolation.
- **Error format:** `{ "error": "<message>" }` with appropriate 4xx status.

---

## Design System

| Role               | Color                      |
|--------------------|----------------------------|
| Page background    | `#F5EFE7` Warm Cream        |
| Primary text       | `#2B1F15` Dark Espresso     |
| Buttons / accents  | `#8B5A3C` Burnt Orange      |
| Button hover       | `#6B4226` Darker Burnt Orange |
| Secondary accent   | `#F4A460` Sandy Brown       |
| Success / data     | `#2E8B57` Sage Green        |
| Card background    | `#FFFFFF` with warm border  |

Font: **Inter** (Google Fonts) — rounded, professional, inviting.

---

## Why These Choices

- **SQLite + `node:sqlite`:** Zero-config persistence using Node.js's built-in SQLite module (Node 24+). No native compilation or extra packages needed.
- **Vite:** Fast HMR for frontend development; minimal config.
- **Tailwind CSS:** Utility-first — rapid, consistent styling without a separate CSS file.
- **Plotly.js:** Interactive, polished charts out of the box; dual-trace support with hover tooltips.
- **`node:test`:** Node.js built-in test runner. No npm package needed, handles `node:sqlite` natively (Vite 5 does not recognize `sqlite` as a built-in after stripping the `node:` prefix, making Vitest incompatible with `node:sqlite` on Node 24).
- **concurrently:** Single `npm run dev` starts both servers — better DX than two terminal tabs.
