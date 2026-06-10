import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDb } from './db.js';
import { createRouter } from './routes/log.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, '..', 'data', 'logs.db');

const db = createDb(DB_PATH);
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', createRouter(db));

// Serve built React app
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));

// SPA fallback — all non-API routes return index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Coffee Shop Logger API running on http://localhost:${PORT}`);
});

export default app;
