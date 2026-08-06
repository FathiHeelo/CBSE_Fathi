import { AddShoppingCartOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';

import type { MealItem } from '../../data/mockData';
import { formatILS } from '../../utils/currency';
import { applyCatalogImageFallback } from '../../utils/imageFallback';

interface MealCardProps {
  meal: MealItem;
  onAdd: (meal: MealItem) => void;
}

export function MealCard({ meal, onAdd }: MealCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%', overflow: 'hidden' }}>
      <CardMedia alt={meal.name} component="img" image={meal.image} loading="lazy" sx={{ aspectRatio: { xs: '16 / 9', sm: '1 / 1' }, flex: { sm: '0 0 160px' }, objectFit: 'cover', width: { xs: '100%', sm: 160 } }} onError={(event) => applyCatalogImageFallback(event.currentTarget)} />
      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2 }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
          <Typography component="h3" variant="h3">{meal.name}</Typography>
          <Chip label={meal.category} size="small" />
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">{meal.description}</Typography>
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 'auto', pt: 2 }}>
          <Typography color="primary" fontWeight={700} variant="h3">{formatILS(meal.price)}</Typography>
          <Button color="secondary" startIcon={<AddShoppingCartOutlined />} variant="contained" onClick={() => onAdd(meal)}>
            Add to cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
