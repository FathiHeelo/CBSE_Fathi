import {
  MenuRounded as MenuRoundedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface CatalogHeaderProps {
  onNavigate: (path: string) => void;
}

export function CatalogHeader({ onNavigate }: CatalogHeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const navigateFromMenu = (path: string) => {
    setMenuAnchor(null);
    onNavigate(path);
  };

  return (
    <AppBar
      color="inherit"
      elevation={0}
      position="sticky"
      sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,251,255,0.94)', backdropFilter: 'blur(12px)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <IconButton
            aria-label="Open navigation"
            aria-controls={menuAnchor ? 'mobile-navigation' : undefined}
            aria-expanded={Boolean(menuAnchor)}
            aria-haspopup="true"
            sx={{ display: { md: 'none' }, mr: 1 }}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            id="mobile-navigation"
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => navigateFromMenu('/')}>Home</MenuItem>
            <MenuItem onClick={() => navigateFromMenu('/products')}>Shop</MenuItem>
          </Menu>
          <Button color="inherit" sx={{ minWidth: 0, px: 0 }} onClick={() => onNavigate('/')}>
            <Stack alignItems="center" direction="row" spacing={1.25}>
              <Box sx={{ bgcolor: 'primary.main', borderRadius: '10px 2px 10px 2px', height: 30, transform: 'rotate(-5deg)', width: 30 }} />
              <Typography fontWeight={800} letterSpacing="-0.04em" variant="h5">Modeva</Typography>
            </Stack>
          </Button>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            <Button color="inherit" onClick={() => onNavigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => onNavigate('/products')}>Shop</Button>
          </Stack>
          <Box sx={{ flex: 1 }} />
          <Button
            aria-label="Open shopping bag"
            color="inherit"
            startIcon={<ShoppingBagOutlinedIcon />}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('catalog:navigate', {
                detail: { path: '/cart' },
                bubbles: true,
                composed: true,
              }));
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Bag</Box>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
