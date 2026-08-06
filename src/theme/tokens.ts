import type { PaletteOptions, ThemeOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#2E7D32',
    light: '#60AD5E',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#F57C00',
    light: '#FFAD42',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },
  error: { main: '#D32F2F' },
  warning: { main: '#ED6C02' },
  info: { main: '#0288D1' },
  success: { main: '#2E7D32' },
  background: {
    default: '#F7F8F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1F1F1F',
    secondary: '#616161',
  },
  divider: '#E0E0E0',
};

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Roboto, Arial, sans-serif',
  h1: { fontSize: '2rem', lineHeight: 1.25, fontWeight: 700 },
  h2: { fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 700 },
  h3: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 600 },
  h4: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 600 },
  h5: { fontSize: '1.125rem', lineHeight: 1.45, fontWeight: 600 },
  h6: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 600 },
  subtitle1: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 600 },
  subtitle2: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 400 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 400 },
  button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
  caption: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 400 },
  overline: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 600, letterSpacing: '0.06em' },
};
