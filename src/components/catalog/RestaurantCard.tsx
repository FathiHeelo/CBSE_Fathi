import { AccessTimeOutlined, ArrowForwardRounded, StarRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import type { Restaurant } from '../../data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { boxShadow: '0 6px 18px rgba(0,0,0,0.12)', transform: 'translateY(-3px)' } }}>
      <Box onClick={() => onSelect(restaurant)} sx={{ cursor: 'pointer', position: 'relative' }}>
        <CardMedia alt={`${restaurant.name} restaurant`} component="img" image={restaurant.image} loading="lazy" sx={{ aspectRatio: '16 / 10', bgcolor: 'grey.100', objectFit: 'cover' }} />
        <Chip
          icon={<AccessTimeOutlined />}
          label={restaurant.deliveryEstimate}
          size="small"
          sx={{ bgcolor: 'background.paper', bottom: 12, boxShadow: 1, position: 'absolute', right: 12 }}
        />
      </Box>
      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2 }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography component="h3" variant="h3">{restaurant.name}</Typography>
            <Typography color="text.secondary" variant="body2">{restaurant.cuisine}</Typography>
          </Box>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <StarRounded color="secondary" fontSize="small" />
            <Typography fontWeight={700} variant="body2">{restaurant.rating.toFixed(1)}</Typography>
          </Stack>
        </Stack>
        <Typography color="text.secondary" sx={{ display: '-webkit-box', mt: 1.5, overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }} variant="body2">
          {restaurant.description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 2 }}>
          {restaurant.categories.slice(0, 3).map((category) => <Chip key={category} label={category} size="small" variant="outlined" />)}
        </Stack>
        <Button endIcon={<ArrowForwardRounded />} sx={{ alignSelf: 'flex-start', mt: 'auto', pt: 2 }} onClick={() => onSelect(restaurant)}>
          View menu
        </Button>
      </CardContent>
    </Card>
  );
}

