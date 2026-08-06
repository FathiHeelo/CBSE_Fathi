import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import { BrandLogo } from '../brand/BrandLogo';

export function CatalogFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'common.white', mt: 10, py: 5 }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <BrandLogo size={64} textColor="common.white" />
          <Typography sx={{ color: 'rgba(255,255,255,0.72)' }} variant="body2">
            Good food from local restaurants, delivered with care.
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.14)', my: 3 }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.62)' }} variant="caption">
          © 2026 Yum Ta Dum · Group 13 Catalog microfrontend.
        </Typography>
      </Container>
    </Box>
  );
}
