# Batibo — Full App

A React Native (Expo) implementation of the Batibo app: splash screen,
login, sign up, and the three main tabs (Learn, Chat, Stats).

## Structure

```
batibo-app/
├── App.js                     # navigation root: Splash → Login/SignUp → Main tabs
├── theme.js                   # all colors/spacing/radii tokens in one place
├── components/
│   ├── Avatar.js              # photo or initials, with the gold ring
│   ├── BottomTabBar.js        # custom Learn / Chat / Stats tab bar
│   ├── ProgressBar.js         # lesson mastery bar
│   └── StatCard.js            # small stat tile on the Stats screen
├── screens/
│   ├── SplashScreen.js        # animated logo splash
│   ├── LoginScreen.js         # welcome / sign in
│   ├── SignUpScreen.js        # "Join the community"
│   ├── LearnScreen.js         # zig-zag lesson path
│   ├── ChatScreen.js          # chat with Elder Anyi
│   └── StatsScreen.js         # profile + stats + lesson mastery
├── app.json                   # Expo config (native splash background color)
└── package.json
```

## Run it

```bash
npm install
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or scan the QR
code with Expo Go on your phone.

### Version compatibility (Expo 57 / React Native 0.86)

`package.json` is pinned to the versions Expo SDK 57 actually bundles for
React Native 0.86 (React 19.2.3) — pulled straight from Expo's own
[bundledNativeModules.json](https://github.com/expo/expo/blob/main/packages/expo/bundledNativeModules.json),
which is the source of truth for "which version of X works with this SDK":

| package | version |
|---|---|
| `expo` | ~57.0.10 |
| `react` | 19.2.3 |
| `react-native` | 0.86.0 |
| `react-native-screens` | 4.25.2 |
| `react-native-safe-area-context` | ~5.7.0 |
| `react-native-gesture-handler` | ~2.32.0 |
| `expo-splash-screen` | ~56.0.10 |
| `expo-status-bar` | ~56.0.4 |
| `@expo/vector-icons` | ^15.0.2 |
| `@react-navigation/*` | ^7.x (latest stable — v8 is still alpha) |

If you ever bump the Expo version, don't hand-edit these numbers again —
run this instead and let Expo resolve everything for the SDK you're on:

```bash
npx expo install expo@latest --fix
```

`npx expo install <package>` (instead of `npm install <package>`) is
also the right way to add any *new* native package later — it always
picks the version tested against your installed SDK.

Two other things RN 0.86 changed that are already reflected here:

- **New Architecture is required** — `app.json` sets `"newArchEnabled": true`.
- **Android edge-to-edge is standard** — `app.json` sets
  `"edgeToEdgeEnabled": true`.


## Navigation flow

```
Splash
  └─▶ Login ──▶ SignUp ──▶ Main (tabs)
        └──────────────────▶ Main (tabs)

Main (tabs)
  ├─ Learn
  ├─ Chat
  └─ Stats ──▶ Sign out ──▶ Login
```

- `LoginScreen`: "Continue learning" → `Main`, "Join the community" → `SignUp`
- `SignUpScreen`: back arrow → back to `Login`, "Begin the path" → `Main`
- `StatsScreen`: "Sign out" → back to `Login`

This is the standard Expo two-layer splash pattern — see the previous
README section below for how `SplashScreen.js` + `app.json` work together.
`App.js`'s `prepare()` function is where you'd swap the fake delay for
a real auth-token check, font loading, etc.

## Screens — what's real vs. sample data

Every screen is fully laid out and functional (inputs are controlled,
buttons navigate, the chat composer actually appends messages), but the
**content is static sample data** matching the mocks:

- `LearnScreen.js` — `LESSONS` array (Morning Greetings / Family Bonds /
  The Market)
- `ChatScreen.js` — `INITIAL_MESSAGES` array; typing and hitting send
  appends a real user bubble, but there's no AI response wired up yet
- `StatsScreen.js` — `STATS` and `LESSONS` arrays

Swap these for real data from your backend (fetch on mount, or pass
through context/a state library) — the components themselves don't need
to change.

## Matching the mocks exactly

Everything is driven from `theme.js`. Two things you'll want to finish
for a pixel-perfect match:

1. **Font** — headings use `Georgia` (a safe built-in serif) as a
   stand-in for the bold serif in the mocks. For an exact match, drop a
   font file (e.g. Fraunces, Lora, Source Serif) into `assets/fonts/`
   and load it with `expo-font`:
   ```js
   import { useFonts } from 'expo-font';
   const [loaded] = useFonts({
     'Fraunces-Bold': require('./assets/fonts/Fraunces-Bold.ttf'),
   });
   ```
   then set `typography.headingFamily` in `theme.js` to that family name.
2. **Avatar photos** — `Avatar.js` falls back to initials on a tinted
   circle when no `uri` is passed. Pass a real photo URL/asset once you
   have user avatars, e.g. `<Avatar uri={user.photoUrl} name={user.name} />`.

## Notes on specific screens

- **LearnScreen**: the up/down chevrons and the thin side/bottom bars
  are decorative, matching the scroll affordances in the mock — the
  actual scrolling is handled by the built-in `ScrollView`.
- **ChatScreen**: the "LISTEN" button on Elder Anyi's messages doesn't
  play audio yet — wire it up to your TTS/audio playback of choice.
- **StatsScreen**: the header (avatar/name/email/level) stays fixed
  while the stats grid and lesson list scroll underneath, matching how
  the mock looks mid-scroll.
