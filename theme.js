// theme.js
// Central design tokens — every screen in the app pulls from here instead
// of hardcoding hex values, so the whole app stays visually consistent.

export const colors = {
  background: '#F1E7D9',       // warm cream app background
  headerBand: '#F5EBDD',       // very slightly lighter band behind profile header
  white: '#FFFFFF',

  logoBg: '#B5522E',           // terracotta rounded square (splash / login logo)
  logoDot: '#C97A57',

  primary: '#B5522E',          // terracotta — buttons, active states, big stat numbers
  primaryPressed: '#9C4425',
  primaryTint: '#F3DDD0',      // pale terracotta wash — selected pill / chip bg
  primaryTintBorder: '#C97A4E',

  heading: '#2B1B12',          // near-black warm brown for headings
  body: '#8C7A69',             // muted brown-gray for subtext/labels
  bodyStrong: '#5B4C3F',
  inputText: '#3A2A1E',
  placeholder: '#B7A794',

  border: '#E7DBC9',
  divider: '#E6DAC8',
  footerText: '#B4A491',

  segmentTrack: '#FFFFFF',
  segmentInactiveText: '#9C8D7C',

  card: '#FFFFFF',
  cardBorder: '#EFE4D4',

  trackFill: '#E6DAC8',        // progress bar empty track
  streakDot: '#E0913C',        // small dot in "12 DAY STREAK" pill
  avatarRing: '#E8A33D',       // gold ring around profile avatars
  avatarBg: '#F0C9A6',

  lockedCircle: '#FFFFFF',
  lockedIcon: '#C9BBA6',
  lockedText: '#B4A491',
  timelineLine: '#E0D2BC',

  chatAiBubble: '#FFFFFF',
  chatUserBubble: '#B5522E',
  chatUserText: '#FFFFFF',
  chatAiText: '#2B1B12',
  chatMeta: '#9C8D7C',
  chatOnline: '#B5522E',

  tabActive: '#B5522E',
  tabInactive: '#9C8D7C',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#EFE4D4',

  danger: '#B5522E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 20,
  pill: 999,
};

export const typography = {
  // "Welcome to Batibo" / screen headings read as a bold serif display face.
  // Georgia ships on iOS/Android by default and is the closest system
  // match; swap in a custom font (e.g. Fraunces, Lora) for a pixel-exact
  // match — see the README for how to load one with expo-font.
  headingFamily: 'Georgia',
  bodyFamily: undefined, // system default (San Francisco / Roboto)
};
