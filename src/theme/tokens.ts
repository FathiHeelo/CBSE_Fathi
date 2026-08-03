import type { PaletteOptions, ThemeOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#7A284E',
    light: '#A9577C',
    dark: '#531332',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#556B2F',
    light: '#829858',
    dark: '#314414',
    contrastText: '#FFFFFF',
  },
  error: { main: '#B3261E' },
  warning: { main: '#B45309' },
  info: { main: '#0369A1' },
  success: { main: '#15803D' },
  background: {
    default: '#FAF8F6',
    paper: '#FFFBFF',
  },
  text: {
    primary: '#24191E',
    secondary: '#6F5A63',
  },
  divider: '#E8DDE2',
};

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
  h1: { fontSize: '3.5rem', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.03em' },
  h2: { fontSize: '2.75rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.025em' },
  h3: { fontSize: '2rem', lineHeight: 1.2, fontWeight: 700, letterSpacing: '-0.015em' },
  h4: { fontSize: '1.5rem', lineHeight: 1.25, fontWeight: 700 },
  h5: { fontSize: '1.25rem', lineHeight: 1.3, fontWeight: 600 },
  h6: { fontSize: '1rem', lineHeight: 1.4, fontWeight: 600 },
  subtitle1: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 600 },
  subtitle2: { fontSize: '0.875rem', lineHeight: 1.45, fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.55 },
  button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  caption: { fontSize: '0.75rem', lineHeight: 1.5 },
  overline: { fontSize: '0.75rem', lineHeight: 1.5, fontWeight: 700, letterSpacing: '0.08em' },
};
