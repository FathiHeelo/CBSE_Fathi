import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { componentOverrides } from './componentOverrides';
import { lightPalette, typography } from './tokens';

const baseTheme = createTheme({
  palette: lightPalette,
  typography,
  spacing: 8,
  shape: { borderRadius: 12 },
  components: componentOverrides,
});

export const catalogTheme = responsiveFontSizes(baseTheme);

