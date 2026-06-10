# Coffee Shop Logger

A full-stack daily-logging app for coffee-shop small businesses. Log your daily sales totals and customer counts, then watch your numbers come alive on an interactive dashboard with running totals and Plotly charts.

---

## Quick Start

```bash
# 1. Install dependencies (root + client)
npm install
npm install --prefix client

# 2. Start the app (backend + frontend together)
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

The SQLite database is created automatically at `data/logs.db` and seeded with 28 days of realistic coffee-shop data on the first run.

---

## Run Tests

```bash
npm run test
```

Runs 4 Vitest tests against an in-memory SQLite instance (no side effects on `data/logs.db`).

---

## API Endpoints

### `POST /api/log`

Log a daily entry. `sector` is always `"coffee"` — hardcoded on the server.

**Request body:**
```json
{ "date": "2026-06-09T20:30:00", "sales": 123.45, "customers": 10 }
```

**Response 201:**
```json
{ "id": 29, "date": "2026-06-09T20:30:00", "sector": "coffee", "sales": 123.45, "customers": 10 }
```

### `GET /api/summary`

Get totals and all entries for a sector.

**Query params (all optional):**
- `sector` — defaults to `"coffee"`
- `from` / `to` — ISO timestamp filters (inclusive)

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

## Database

- **File:** `data/logs.db` (SQLite, auto-created on first run)
- **Auto-seeded** with 28 days of coffee-shop data (2026-05-11 → 2026-06-07) when the table is empty
- Data survives server restarts

---

## Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js + Express                   |
| Frontend   | Vite + React + Tailwind CSS         |
| Database   | SQLite via `node:sqlite` (Node 24 built-in) |
| Charts     | Plotly.js (`react-plotly.js`)       |
| Tests      | Node.js `node:test` + Supertest     |
| Dev runner | `concurrently`                      |
