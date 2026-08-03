import {
  AddShoppingCartRounded as AddShoppingCartRoundedIcon,
  ArrowForwardRounded as ArrowForwardRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/catalogUtils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.inventory.status === 'out_of_stock';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
      }}
    >
      <Box sx={{ cursor: 'pointer', position: 'relative' }} onClick={() => onViewDetails(product)}>
        <CardMedia
          alt={product.images[0].alt}
          component="img"
          image={product.thumbnail}
          loading="lazy"
          sx={{ aspectRatio: '4 / 5', bgcolor: 'grey.100', objectFit: 'cover' }}
        />
        <Stack direction="row" spacing={1} sx={{ left: 12, position: 'absolute', top: 12 }}>
          {product.newArrival && <Chip color="primary" label="New" size="small" />}
          {product.compareAtPrice && <Chip label="Sale" size="small" sx={{ bgcolor: 'background.paper' }} />}
        </Stack>
      </Box>
      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2.5 }}>
        <Typography color="text.secondary" variant="caption">
          {product.brand}
        </Typography>
        <Typography component="h3" sx={{ mt: 0.5 }} variant="h6">
          {product.title}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 1 }}>
          <Rating precision={0.1} readOnly size="small" value={product.rating.value} />
          <Typography color="text.secondary" variant="caption">
            ({product.rating.count})
          </Typography>
        </Stack>
        <Stack alignItems="baseline" direction="row" spacing={1} sx={{ mb: 2, mt: 1.5 }}>
          <Typography fontWeight={700}>{formatCurrency(product.price, product.currency)}</Typography>
          {product.compareAtPrice && (
            <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }} variant="body2">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Button
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
            size="small"
            variant="outlined"
            onClick={() => onViewDetails(product)}
          >
            Details
          </Button>
          <Button
            aria-label={`Add ${product.title} to cart`}
            disabled={isOutOfStock}
            size="small"
            startIcon={<AddShoppingCartRoundedIcon />}
            variant="contained"
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
