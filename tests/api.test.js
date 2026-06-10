import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import request from 'supertest';
import express from 'express';
import { createDb } from '../server/db.js';
import { createRouter } from '../server/routes/log.js';

function buildApp() {
  const db = createDb(':memory:', { seed: false });
  const app = express();
  app.use(express.json());
  app.use('/api', createRouter(db));
  return { app, db };
}

describe('POST /api/log', () => {
  it('inserts a row and returns the created entry', async () => {
    const { app } = buildApp();

    const res = await request(app)
      .post('/api/log')
      .send({ date: '2026-06-09T20:00:00', sales: 150.0, customers: 15 });

    assert.equal(res.status, 201);
    assert.ok(res.body.id);
    assert.equal(res.body.sector, 'coffee');
    assert.equal(res.body.sales, 150.0);
    assert.equal(res.body.customers, 15);
    assert.equal(res.body.date, '2026-06-09T20:00:00');
  });

  it('returns 400 when required fields are missing', async () => {
    const { app } = buildApp();

    const res = await request(app)
      .post('/api/log')
      .send({ sales: 100 });

    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });
});

describe('GET /api/summary', () => {
  it('returns correct totals and entries', async () => {
    const { app, db } = buildApp();

    db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    ).run('2026-06-09T08:00:00', 'coffee', 200.0, 20);
    db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    ).run('2026-06-10T08:00:00', 'coffee', 300.0, 30);

    const res = await request(app).get('/api/summary');

    assert.equal(res.status, 200);
    assert.equal(res.body.sector, 'coffee');
    assert.equal(res.body.totalSales, 500.0);
    assert.equal(res.body.totalCustomers, 50);
    assert.equal(res.body.entries.length, 2);
  });

  it('filters by from date range', async () => {
    const { app, db } = buildApp();

    db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    ).run('2026-06-08T08:00:00', 'coffee', 100.0, 10);
    db.prepare(
      'INSERT INTO daily_log (date, sector, sales, customers) VALUES (?, ?, ?, ?)'
    ).run('2026-06-09T08:00:00', 'coffee', 200.0, 20);

    const res = await request(app)
      .get('/api/summary')
      .query({ from: '2026-06-09T00:00:00' });

    assert.equal(res.status, 200);
    assert.equal(res.body.entries.length, 1);
    assert.equal(res.body.totalSales, 200.0);
  });
});
