import { DatabaseSync } from 'node:sqlite';

const SEED_DATA = [
  { date: '2026-05-11T08:14:00', sales: 87.50,  customers: 9  },
  { date: '2026-05-12T09:02:00', sales: 213.75, customers: 24 },
  { date: '2026-05-13T08:37:00', sales: 156.00, customers: 17 },
  { date: '2026-05-14T08:55:00', sales: 298.50, customers: 31 },
  { date: '2026-05-15T09:18:00', sales: 124.25, customers: 13 },
  { date: '2026-05-16T08:08:00', sales: 189.00, customers: 21 },
  { date: '2026-05-17T09:25:00', sales: 310.75, customers: 34 },
  { date: '2026-05-18T08:44:00', sales:  72.50, customers:  7 },
  { date: '2026-05-19T09:11:00', sales: 245.00, customers: 27 },
  { date: '2026-05-20T08:29:00', sales: 167.25, customers: 18 },
  { date: '2026-05-21T08:52:00', sales: 203.50, customers: 22 },
  { date: '2026-05-22T09:07:00', sales: 138.75, customers: 15 },
  { date: '2026-05-23T08:33:00', sales: 275.00, customers: 29 },
  { date: '2026-05-24T09:19:00', sales:  95.25, customers: 10 },
  { date: '2026-05-25T08:41:00', sales: 320.50, customers: 33 },
  { date: '2026-05-26T09:03:00', sales: 178.00, customers: 19 },
  { date: '2026-05-27T08:17:00', sales: 231.75, customers: 25 },
  { date: '2026-05-28T09:28:00', sales: 112.50, customers: 12 },
  { date: '2026-05-29T08:46:00', sales: 267.25, customers: 28 },
  { date: '2026-05-30T09:14:00', sales: 145.00, customers: 16 },
  { date: '2026-05-31T08:38:00', sales: 289.75, customers: 30 },
  { date: '2026-06-01T09:22:00', sales: 198.50, customers: 21 },
  { date: '2026-06-02T08:09:00', sales:  63.25, customers:  6 },
  { date: '2026-06-03T09:16:00', sales: 234.00, customers: 26 },
  { date: '2026-06-04T08:51:00', sales: 187.50, customers: 20 },
  { date: '2026-06-05T09:04:00', sales: 315.75, customers: 32 },
  { date: '2026-06-06T08:27:00', sales: 152.25, customers: 16 },
  { date: '2026-06-07T09:13:00', sales: 243.00, customers: 27 },
];

export function createDb(dbPath, { seed = true } = {}) {
  const db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_log (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      date      TEXT    NOT NULL,
      sector    TEXT    NOT NULL,
      sales     REAL    NOT NULL,
      customers INTEGER NOT NULL
    )
  `);

  const count = db.prepare('SELECT COUNT(*) AS n FROM daily_log').get().n;
  if (seed && count === 0) {
    const insert = db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    );
    db.exec('BEGIN');
    for (const row of SEED_DATA) {
      insert.run(row.date, 'coffee', row.sales, row.customers);
    }
    db.exec('COMMIT');
  }

  return db;
}
