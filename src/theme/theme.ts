import { createTheme } from '@mui/material/styles';

import { componentOverrides } from './componentOverrides';
import { lightPalette, typography } from './tokens';

export const yumTaDumTheme = createTheme({
  palette: lightPalette,
  typography,
  spacing: 8,
  shape: { borderRadius: 12 },
  components: componentOverrides,
});
