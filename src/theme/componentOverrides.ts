import type { Components, Theme } from '@mui/material/styles';

export const componentOverrides: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': { boxSizing: 'border-box' },
      html: { scrollBehavior: 'smooth' },
      body: { margin: 0, minWidth: 320 },
      img: { display: 'block', maxWidth: '100%' },
      ':focus-visible': { outline: '3px solid #F57C00', outlineOffset: 2 },
      '@media (prefers-reduced-motion: reduce)': {
        '*': { animationDuration: '0.01ms !important', scrollBehavior: 'auto !important', transitionDuration: '0.01ms !important' },
      },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { minHeight: 44, borderRadius: 12, paddingInline: 20 },
      containedPrimary: { '&:hover': { backgroundColor: '#1B5E20' } },
      containedSecondary: { '&:hover': { backgroundColor: '#E65100' } },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundImage: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 999, fontWeight: 600 } },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 12 } },
  },
  MuiDialog: {
    styleOverrides: { paper: { borderRadius: 20 } },
  },
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
  MuiSlider: {
    styleOverrides: { thumb: { width: 20, height: 20 } },
  },
};
