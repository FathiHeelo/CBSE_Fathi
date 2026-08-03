import { Inventory2Outlined as Inventory2OutlinedIcon } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';

import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onViewDetails, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Stack alignItems="center" spacing={2} sx={{ px: 3, py: 10, textAlign: 'center' }}>
        <Box sx={{ bgcolor: 'action.hover', borderRadius: '50%', display: 'grid', p: 2, placeItems: 'center' }}>
          <Inventory2OutlinedIcon color="action" fontSize="large" />
        </Box>
        <Typography component="h2" variant="h5">No products found</Typography>
        <Typography color="text.secondary">Try changing your search or clearing a filter.</Typography>
      </Stack>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product) => (
        <Grid item key={product.id} lg={4} sm={6} xs={12}>
          <ProductCard product={product} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
        </Grid>
      ))}
    </Grid>
  );
}
