// src/groq.js
//
// Uses Groq's API — free tier, no credit card required, and (unlike
// Gemini) doesn't seem prone to the account-level "project denied
// access" issue some Google accounts are currently hitting. Runs open
// models (Llama, etc.) rather than Gemini/Claude — see README for the
// quality/speed tradeoff.
//
// Endpoint is OpenAI-compatible: https://api.groq.com/openai/v1/chat/completions

const MODEL = 'llama-3.3-70b-versatile'; // strong general-purpose free model.
// Swap to 'llama-3.1-8b-instant' for a much higher daily request quota
// if you outgrow this model's free-tier limits (lower quality tradeoff).
const MAX_HISTORY_MESSAGES = 20; // trim long conversations to stay within quota

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Sends the conversation to Groq and returns Elder Anyi's reply as plain text.
 *
 * @param {string} systemPrompt - Persona + your Batibo data (see systemPrompt.js)
 * @param {{role: 'user'|'assistant', content: string}[]} history - prior turns
 * @param {string} userMessage - the learner's newest message
 */
async function getChatReply(systemPrompt, history, userMessage) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set. Add it to your .env file.');
  }

  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);

  // OpenAI-compatible schema: system prompt is just the first message,
  // and roles map directly (no "model" vs "assistant" translation needed).
  const messages = [
    { role: 'system', content: systemPrompt },
    ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

module.exports = { getChatReply };
