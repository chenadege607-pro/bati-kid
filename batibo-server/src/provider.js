// src/provider.js
//
// Picks which AI provider backs the chat, based on AI_PROVIDER in .env.
// This means switching providers (e.g. once Gemini access issues clear
// up) is a one-line .env change — nothing else in the app changes.

const gemini = require('./gemini');
const groq = require('./groq');

function getProvider() {
  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();

  if (provider === 'gemini') return gemini;
  if (provider === 'groq') return groq;

  throw new Error(
    `Unknown AI_PROVIDER "${provider}" — use "gemini" or "groq" in your .env file.`
  );
}

async function getChatReply(systemPrompt, history, userMessage) {
  const { getChatReply: reply } = getProvider();
  return reply(systemPrompt, history, userMessage);
}

module.exports = { getChatReply };
