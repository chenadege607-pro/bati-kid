// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { buildSystemPrompt } = require('./src/systemPrompt');
const { getChatReply } = require('./src/provider');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Simple in-memory rate limiting per IP — replace with a real store
// (Redis, etc.) before this goes to production with real users.
const requestLog = new Map();
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60 * 1000; // per minute

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  const ip = req.ip;
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  }

  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: '"message" (string) is required.' });
  }
  if (history && !Array.isArray(history)) {
    return res.status(400).json({ error: '"history" must be an array if provided.' });
  }

  try {
    const systemPrompt = buildSystemPrompt();
    const reply = await getChatReply(systemPrompt, history || [], message);
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Something went wrong generating a reply.' });
  }
});

app.listen(PORT, () => {
  console.log(`Batibo chat server running on http://localhost:${PORT}`);
});
