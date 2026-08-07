// src/gemini.js
//
// Uses Google's Gemini API, which has a genuine ongoing free tier (no
// credit card required) — see batibo-server/README.md for setup and
// current rate limits.

const MODEL = 'gemini-2.5-flash'; // good balance of quality + free quota.
// Swap to 'gemini-2.5-flash-lite' for a higher daily request quota if
// you outgrow this model's free-tier limits.
const MAX_HISTORY_MESSAGES = 20; // trim long conversations to stay within quota

function apiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
}

/**
 * Sends the conversation to Gemini and returns Elder Anyi's reply as plain text.
 *
 * @param {string} systemPrompt - Persona + your Batibo data (see systemPrompt.js)
 * @param {{role: 'user'|'assistant', content: string}[]} history - prior turns
 * @param {string} userMessage - the learner's newest message
 */
async function getChatReply(systemPrompt, history, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set. Add it to your .env file.');
  }

  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);

  // Gemini uses "model" instead of "assistant" for the AI's turns, and
  // wraps text in a `parts` array rather than a plain string.
  const contents = [
    ...trimmedHistory.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const response = await fetch(apiUrl(), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      // Newer Gemini keys (format: "AQ.xxxx") are only accepted via this
      // header — the old "?key=" query param auth is for legacy "AIzaSy..."
      // keys. This header works for both formats, so it's the safe default.
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        maxOutputTokens: 512,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || '';
}

module.exports = { getChatReply };
