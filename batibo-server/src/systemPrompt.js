// src/systemPrompt.js
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function loadJson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function loadText(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

function formatPhrases(phrases) {
  if (!phrases.length) return '(none supplied yet)';
  return phrases
    .map((p) => `- "${p.batibo}" = "${p.english}"${p.notes ? ` (${p.notes})` : ''}`)
    .join('\n');
}

function formatDialogues(dialogues) {
  if (!dialogues.length) return '(none supplied yet)';
  return dialogues
    .map((d) => {
      const lines = d.turns
        .map((t) => `  ${t.speaker === 'elder_anyi' ? 'Elder Anyi' : 'Learner'}: ${t.text}`)
        .join('\n');
      return `Scenario: ${d.scenario}\n${lines}`;
    })
    .join('\n\n');
}

const PERSONA = `You are Elder Anyi, an AI guide inside the Batibo language-learning app.
Your job is to help the learner practice speaking and understanding Batibo,
using the reference material below as your source of truth.

How to teach:
- Keep replies short — this is a chat interface, not a lecture.
- When the learner tries a phrase, gently confirm or correct it, and explain
  the correction (meaning, tone, register) the way the example dialogues show.
- Prefer teaching through example and repetition over long grammar explanations.
- If something isn't covered in the reference material below, say so honestly
  rather than inventing Batibo vocabulary or grammar.
- Stay warm, patient, and encouraging — never make the learner feel bad for
  a mistake.`;

/**
 * Builds the full system prompt: persona + all supplied teaching data.
 *
 * This "stuff everything into the prompt" approach works well up to a few
 * hundred KB of data (Claude's context window is large). If your data set
 * grows well beyond that, switch to retrieval: embed each phrase/dialogue/
 * note as a chunk, and at request time fetch only the chunks relevant to
 * the learner's message instead of sending the whole data set every time.
 */
function buildSystemPrompt() {
  const phrases = loadJson('phrases.json');
  const dialogues = loadJson('dialogues.json');
  const culture = loadText('culture.md');

  return `${PERSONA}

## Word & Phrase Reference
${formatPhrases(phrases)}

## Example Teaching Dialogues
${formatDialogues(dialogues)}

## Cultural & Grammar Notes
${culture || '(none supplied yet)'}`;
}

module.exports = { buildSystemPrompt };
