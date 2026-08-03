import type { Components, Theme } from '@mui/material/styles';

export const componentOverrides: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': { boxSizing: 'border-box' },
      html: { scrollBehavior: 'smooth' },
      body: { margin: 0, minWidth: 320 },
      img: { display: 'block', maxWidth: '100%' },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { minHeight: 40, borderRadius: 999, paddingInline: 20 },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 16,
        backgroundImage: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 12 } },
  },
  MuiSlider: {
    styleOverrides: { thumb: { width: 20, height: 20 } },
  },
};

