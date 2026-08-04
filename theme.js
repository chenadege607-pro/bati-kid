// theme.js
// Central design tokens pulled from the Batibo mock — keep every screen
// referencing these instead of hardcoding hex values.

export const colors = {
  background: '#F1E7D9',      // warm cream app background
  card: '#F1E7D9',
  white: '#FFFFFF',
  logoBg: '#B5522E',          // terracotta rounded square
  logoDot: '#C97A57',         // lighter inner circle on the logo mark
  primary: '#B5522E',         // terracotta — buttons, active pill
  primaryPressed: '#9C4425',
  heading: '#2B1B12',         // near-black warm brown for headings
  body: '#8C7A69',            // muted brown-gray for subtext/labels
  inputText: '#3A2A1E',
  border: '#E4D6C3',
  divider: '#E6DAC8',
  footerText: '#B4A491',
  segmentTrack: '#FFFFFF',
  segmentInactiveText: '#9C8D7C',
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
  // "Welcome to Batibo" reads as a bold serif display face.
  // Georgia ships on iOS/Android by default and is the closest system
  // match; swap in a custom font (e.g. Fraunces, Lora) for a pixel-exact
  // match — see the README for how to load one with expo-font.
  headingFamily: 'Georgia',
  bodyFamily: undefined, // system default (San Francisco / Roboto)
};
