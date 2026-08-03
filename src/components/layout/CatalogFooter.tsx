import { Box, Container, Divider, Stack, Typography } from '@mui/material';

export function CatalogFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: '#24191E', color: 'common.white', mt: 10, py: 5 }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Typography fontWeight={800} variant="h5">Modeva</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.72)' }} variant="body2">
            Curated fashion from independent brands.
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.14)', my: 3 }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.62)' }} variant="caption">
          © 2026 Modeva Marketplace. Catalog microfrontend.
        </Typography>
      </Container>
    </Box>
  );
}

