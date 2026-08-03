import {
  AddRounded as AddRoundedIcon,
  AddShoppingCartRounded as AddShoppingCartRoundedIcon,
  ArrowBackRounded as ArrowBackRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  RemoveRounded as RemoveRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { ProductGrid } from '../components/catalog/ProductGrid';
import type { Product } from '../types/product';
import { formatCurrency } from '../utils/catalogUtils';

interface PDPViewProps {
  product: Product;
  relatedProducts: Product[];
  onNavigate: (path: string) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, options?: { size?: string; color?: string }) => void;
  onQuickAdd: (product: Product) => void;
}

export function PDPView({
  product,
  relatedProducts,
  onNavigate,
  onViewDetails,
  onAddToCart,
  onQuickAdd,
}: PDPViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0].url);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.inventory.status === 'out_of_stock';

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 7 } }}>
      <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 4 }}>
        <Link component="button" underline="hover" onClick={() => onNavigate('/')}>Home</Link>
        <Link component="button" underline="hover" onClick={() => onNavigate('/products')}>Shop</Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 4, md: 7 }}>
        <Grid item lg={7} xs={12}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '88px minmax(0, 1fr)' } }}>
            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1.5} sx={{ order: { xs: 2, sm: 1 }, overflowX: 'auto' }}>
              {product.images.map((image) => (
                <Box
                  alt={image.alt}
                  aria-label={`View ${image.alt}`}
                  component="img"
                  key={image.url}
                  src={image.url}
                  tabIndex={0}
                  onClick={() => setSelectedImage(image.url)}
                  onKeyDown={(event) => event.key === 'Enter' && setSelectedImage(image.url)}
                  sx={{
                    aspectRatio: '4 / 5',
                    border: '2px solid',
                    borderColor: selectedImage === image.url ? 'primary.main' : 'transparent',
                    borderRadius: 2,
                    cursor: 'pointer',
                    flex: '0 0 76px',
                    objectFit: 'cover',
                    width: { xs: 76, sm: '100%' },
                  }}
                />
              ))}
            </Stack>
            <Box
              alt={product.images.find(({ url }) => url === selectedImage)?.alt ?? product.title}
              component="img"
              src={selectedImage}
              sx={{ aspectRatio: '4 / 5', bgcolor: 'grey.100', borderRadius: 4, objectFit: 'cover', order: { xs: 1, sm: 2 }, width: '100%' }}
            />
          </Box>
        </Grid>

        <Grid item lg={5} xs={12}>
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 104 } }}>
            <Typography color="primary" fontWeight={700} variant="overline">{product.brand}</Typography>
            <Typography component="h1" sx={{ mt: 0.5 }} variant="h3">{product.title}</Typography>
            <Stack alignItems="center" direction="row" spacing={1.25} sx={{ mt: 2 }}>
              <Rating precision={0.1} readOnly value={product.rating.value} />
              <Typography color="text.secondary" variant="body2">{product.rating.value} ({product.rating.count} reviews)</Typography>
            </Stack>
            <Stack alignItems="baseline" direction="row" spacing={1.5} sx={{ mt: 2 }}>
              <Typography fontWeight={800} variant="h4">{formatCurrency(product.price)}</Typography>
              {product.compareAtPrice && (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatCurrency(product.compareAtPrice)}
                </Typography>
              )}
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 2 }}>{product.shortDescription}</Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              <Box>
                <Typography fontWeight={700} gutterBottom>Color: {selectedColor}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {product.availableColors.map((color) => (
                    <Button
                      aria-label={`Select ${color.name}`}
                      key={color.name}
                      size="small"
                      startIcon={<Box sx={{ bgcolor: color.hex, border: '1px solid', borderColor: 'divider', borderRadius: '50%', height: 18, width: 18 }} />}
                      variant={selectedColor === color.name ? 'contained' : 'outlined'}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      {color.name}
                    </Button>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography fontWeight={700} gutterBottom>Size: {selectedSize}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {product.availableSizes.map((size) => (
                    <Button key={size} size="small" variant={selectedSize === size ? 'contained' : 'outlined'} onClick={() => setSelectedSize(size)}>
                      {size}
                    </Button>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography fontWeight={700} gutterBottom>Quantity</Typography>
                <Paper sx={{ alignItems: 'center', display: 'inline-flex', p: 0.5 }}>
                  <IconButton aria-label="Decrease quantity" disabled={quantity <= 1} size="small" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                    <RemoveRoundedIcon />
                  </IconButton>
                  <Typography aria-live="polite" sx={{ minWidth: 44, textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton aria-label="Increase quantity" disabled={quantity >= product.inventory.quantity} size="small" onClick={() => setQuantity((value) => Math.min(product.inventory.quantity, value + 1))}>
                    <AddRoundedIcon />
                  </IconButton>
                </Paper>
              </Box>
            </Stack>

            <Button
              disabled={isOutOfStock}
              fullWidth
              size="large"
              startIcon={<AddShoppingCartRoundedIcon />}
              sx={{ mt: 3, py: 1.5 }}
              variant="contained"
              onClick={() => onAddToCart(product, quantity, { size: selectedSize, color: selectedColor })}
            >
              {isOutOfStock ? 'Out of stock' : 'Add to bag'}
            </Button>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip
                color={isOutOfStock ? 'default' : 'success'}
                icon={!isOutOfStock ? <CheckCircleRoundedIcon /> : undefined}
                label={isOutOfStock ? 'Currently unavailable' : `${product.inventory.quantity} available`}
                size="small"
              />
              {product.seller.verified && <Chip icon={<CheckCircleRoundedIcon />} label="Verified seller" size="small" variant="outlined" />}
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">Sold by {product.seller.name} · {product.seller.rating}★</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: { xs: 6, md: 9 } }}>
        <Grid item md={7} xs={12}>
          <Typography component="h2" gutterBottom variant="h4">Details</Typography>
          <Typography color="text.secondary">{product.description}</Typography>
          <Typography component="h3" sx={{ mb: 1.5, mt: 4 }} variant="h6">Materials</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {product.materials.map((material) => <Chip key={material} label={material} variant="outlined" />)}
          </Stack>
        </Grid>
        <Grid item md={5} xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" sx={{ px: 1, pt: 1 }} variant="h6">Specifications</Typography>
            <Table size="small">
              <TableBody>
                {Object.entries(product.specifications).map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell sx={{ color: 'text.secondary', pl: 1 }}>{label}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, pr: 1 }}>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {relatedProducts.length > 0 && (
        <Box component="section" sx={{ mt: { xs: 8, md: 11 } }}>
          <Typography color="primary" variant="overline">Complete the edit</Typography>
          <Typography component="h2" sx={{ mb: 4 }} variant="h3">You may also like</Typography>
          <ProductGrid products={relatedProducts.slice(0, 3)} onAddToCart={onQuickAdd} onViewDetails={onViewDetails} />
        </Box>
      )}

      <Button startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 5 }} onClick={() => onNavigate('/products')}>Back to all products</Button>
    </Container>
  );
}
