# Batibo Chat Server

A small backend that powers Elder Anyi in the app's Chat tab. It holds
your Batibo teaching data, builds a system prompt from it, and calls
a free AI provider (Groq or Gemini) to generate replies. The API key
lives here — never in the mobile app.

## Which provider is active

Set `AI_PROVIDER` in `.env` to `groq` or `gemini` — that's the only
thing that changes. Everything else (your data files, the system
prompt, the app) is identical either way. Defaults to `groq` if unset.

**Currently defaulted to Groq.** Google's Gemini API has a known,
widespread issue right now where some accounts get `403 PERMISSION_DENIED:
"Your project has been denied access. Please contact support."` on
every request — this isn't a key or config problem, it's an
account/project-level block on Google's side with no self-serve fix
(their own support flow just says to post on the developer forum for
manual review). If that's what you hit, Groq is the practical
workaround while you wait it out. Switch back to `gemini` in `.env`
any time it's resolved for your account.

### Groq vs. Gemini — the actual tradeoff

- **Groq**: free tier, no credit card, very fast, but only runs
  open-weight models (Llama, etc.) rather than Gemini/Claude-quality
  models. For a scoped teaching persona like Elder Anyi — where the
  real intelligence comes from your data in the system prompt, not
  the model's own general knowledge — this is a fine tradeoff.
- **Gemini**: free tier, no credit card, generally stronger model
  quality, but (as above) currently has account-access issues
  affecting some users, and on the free tier Google may use your
  prompts/responses to improve their products.

## How "training" works here

This isn't model fine-tuning — for a corpus this size you don't want
that anyway. Instead, your data (phrases, example dialogues, cultural/
grammar notes) gets included directly in the system prompt on every
request, so the model has it as reference material when it replies.
This is simpler, cheaper to iterate on (just edit a file, no retraining),
and easy to verify — you can always see exactly what the model was told.
This works identically regardless of which provider is active.

If your data set eventually grows past a few hundred KB, the comment
at the top of `src/systemPrompt.js` explains the next step: switch to
retrieval (only send the chunks relevant to each message, instead of
the whole data set every time).

## Setup

```bash
cd batibo-server
npm install
cp .env.example .env
```

**For Groq** (default): get a free key (no card) at
https://console.groq.com/keys → paste into `.env` as `GROQ_API_KEY`.

**For Gemini**: get a free key (no card) at
https://aistudio.google.com/apikey → paste into `.env` as
`GEMINI_API_KEY`, and set `AI_PROVIDER=gemini`.

Run it:

```bash
npm run dev
```

You should see `Batibo chat server running on http://localhost:3001`.
Test it:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I say good morning?"}'
```


## Adding your real data

Replace the sample content in these three files — the format matters,
the content doesn't need to:

- **`data/phrases.json`** — array of `{ batibo, english, notes }`
- **`data/dialogues.json`** — array of `{ scenario, turns: [{ speaker, text }] }`,
  where `speaker` is `"learner"` or `"elder_anyi"`. These teach the
  model *how* Elder Anyi should sound and correct mistakes, not just vocabulary.
- **`data/culture.md`** — free-form markdown: grammar rules, tone
  patterns, formality/register notes, anything cultural context that
  should shape how Elder Anyi teaches.

No restart needed in dev mode (`npm run dev` uses `--watch`); in
production, redeploy after editing these files.

## Connecting the app to this server

In the Expo app, `screens/ChatScreen.js` reads the server URL from
`config.js`. For local development on a physical phone, `localhost`
won't reach your laptop — use your machine's LAN IP or a tunnel:

```bash
# Option A: LAN IP (phone and laptop on the same WiFi)
# find your IP with `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
# then set API_BASE_URL to http://<your-lan-ip>:3001 in config.js

# Option B: tunnel (works anywhere, easier for quick testing)
npx ngrok http 3001
# then set API_BASE_URL to the https://*.ngrok-free.app URL it prints
```

## Deploying (still free)

Render, Railway (has a free trial then small cost), and Fly.io all have
low-cost or free tiers for a small Node service like this:

1. Push this folder to its own git repo (or a subfolder of your app repo)
2. Create a new Web Service pointing at it, build command `npm install`,
   start command `npm start`
3. Set the `AI_PROVIDER` and matching API key (`GROQ_API_KEY` or
   `GEMINI_API_KEY`) as environment variables in the host's dashboard —
   never commit your real `.env`
4. Set `API_BASE_URL` in the app's `config.js` to the deployed URL

## Notes on what's production-ready vs. not

- **Rate limiting** in `server.js` is a basic in-memory counter — fine
  for testing, but resets on every server restart and doesn't work
  across multiple server instances. Swap in Redis (or your host's
  built-in rate limiting) before opening this up to real users. It also
  helps you stay under Gemini's free-tier limits.
- **No auth** on `/api/chat` yet — anyone with the URL can call it and
  burn through your free quota. Add an app-level auth token or API key
  check once you have real users.
- **CORS is wide open** (`cors()` with no options) — fine for
  development; scope it to your app's actual origin(s) before shipping.

If both Groq and Gemini ever stop working for you, **Ollama**
(ollama.com) runs a model entirely on your own machine — zero cost,
zero rate limits, and no account to get blocked. The tradeoff is
response quality depends on what your hardware can run, and it needs
to keep running locally for the app to reach it.
