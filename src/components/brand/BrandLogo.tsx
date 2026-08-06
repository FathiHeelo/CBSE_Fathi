import { Box, Stack, Typography } from '@mui/material';

import logoUrl from '../../assets/yum-ta-dum-logo.png';

interface BrandLogoProps {
  size?: number;
  showName?: boolean;
  textColor?: string;
}

export function BrandLogo({ size = 48, showName = true, textColor = 'primary.main' }: BrandLogoProps) {
  return (
    <Stack alignItems="center" direction="row" spacing={1.25}>
      <Box
        alt={showName ? '' : 'Yum Ta Dum'}
        aria-hidden={showName ? true : undefined}
        component="img"
        src={logoUrl}
        sx={{ flexShrink: 0, height: size, objectFit: 'contain', width: size }}
      />
      {showName && (
        <Typography color={textColor} fontWeight={800} letterSpacing="-0.03em" variant="h5">
          Yum Ta Dum
        </Typography>
      )}
    </Stack>
  );
}
