import { Router } from 'express';

export function createRouter(db) {
  const router = Router();

  router.post('/log', (req, res) => {
    const { date, sales, customers } = req.body;

    if (!date) return res.status(400).json({ error: 'Missing required field: date' });
    if (sales === undefined || sales === null) return res.status(400).json({ error: 'Missing required field: sales' });
    if (customers === undefined || customers === null) return res.status(400).json({ error: 'Missing required field: customers' });
    if (typeof sales !== 'number' || !isFinite(sales)) return res.status(400).json({ error: 'sales must be a finite number' });
    if (!Number.isInteger(customers) || customers < 1) return res.status(400).json({ error: 'customers must be a positive integer' });

    const stmt = db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(date, 'coffee', sales, customers);
    const row = db.prepare('SELECT * FROM daily_log WHERE id = ?').get(Number(result.lastInsertRowid));

    return res.status(201).json(row);
  });

  router.get('/summary', (req, res) => {
    const sector = req.query.sector || 'coffee';
    const { from, to } = req.query;

    let query = 'SELECT * FROM daily_log WHERE sector = ?';
    const params = [sector];

    if (from) {
      query += ' AND date >= ?';
      params.push(from);
    }
    if (to) {
      query += ' AND date <= ?';
      params.push(to);
    }
    query += ' ORDER BY date ASC';

    const entries = db.prepare(query).all(...params);

    const totalSales = entries.reduce((sum, e) => sum + e.sales, 0);
    const totalCustomers = entries.reduce((sum, e) => sum + e.customers, 0);

    return res.json({
      sector,
      totalSales: Math.round(totalSales * 100) / 100,
      totalCustomers,
      entries: entries.map(({ id, date, sales, customers }) => ({ id, date, sales, customers })),
    });
  });

  return router;
}
