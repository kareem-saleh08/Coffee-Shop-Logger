import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDb } from './db.js';
import { createRouter } from './routes/log.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(express.json());

// Initialize database
const db = createDb(path.join(__dirname, '..', 'data', 'logs.db'));

// API routes
app.use('/api', createRouter(db));

// Serve static files from built client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
