import { AccessTimeOutlined, ArrowBackRounded, StarRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';

import { MealCard } from '../components/catalog/MealCard';
import { YumyState } from '../components/catalog/YumyState';
import type { MealItem, Restaurant } from '../data/mockData';
import type { CatalogStatus } from '../types/catalog';

interface RestaurantDetailViewProps {
  status: CatalogStatus;
  restaurant?: Restaurant;
  meals: readonly MealItem[];
  onNavigate: (route: string) => void;
  onAddMeal: (meal: MealItem) => void;
}

export function RestaurantDetailView({ status, restaurant, meals, onNavigate, onAddMeal }: RestaurantDetailViewProps) {
  if (status === 'loading') return <YumyState type="loading" />;
  if (status === 'error') return <YumyState type="error" />;
  if (!restaurant) return <YumyState type="empty" title="Restaurant not found" message="This restaurant is not in the Yum Ta Dum catalog." />;

  const groupedMeals = meals.reduce<Record<string, MealItem[]>>((groups, meal) => {
    (groups[meal.category] ??= []).push(meal);
    return groups;
  }, {});

  return (
    <>
      <Box sx={{ height: { xs: 260, md: 380 }, overflow: 'hidden', position: 'relative' }}>
        <Box alt={`${restaurant.name} food`} component="img" src={restaurant.image} sx={{ height: '100%', objectFit: 'cover', width: '100%' }} />
        <Box sx={{ background: 'linear-gradient(transparent 30%, rgba(0,0,0,.78))', inset: 0, position: 'absolute' }} />
        <Container maxWidth="xl" sx={{ bottom: 0, color: 'common.white', left: 0, pb: 4, position: 'absolute', right: 0 }}>
          <Typography component="h1" sx={{ fontSize: { xs: 32, md: 44 } }}>{restaurant.name}</Typography>
          <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1 }}>
            <Chip icon={<StarRounded />} label={`${restaurant.rating.toFixed(1)} rating`} sx={{ bgcolor: 'background.paper' }} />
            <Chip icon={<AccessTimeOutlined />} label={restaurant.deliveryEstimate} sx={{ bgcolor: 'background.paper' }} />
            <Typography>{restaurant.cuisine}</Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component="button" underline="hover" onClick={() => onNavigate('/')}>Home</Link>
          <Link component="button" underline="hover" onClick={() => onNavigate('/restaurants')}>Restaurants</Link>
          <Typography color="text.primary">{restaurant.name}</Typography>
        </Breadcrumbs>
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>{restaurant.description}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
          {restaurant.categories.map((category) => <Chip key={category} label={category} variant="outlined" />)}
        </Stack>

        {meals.length === 0 ? <YumyState type="empty" title="The menu is being prepared" /> : Object.entries(groupedMeals).map(([category, categoryMeals]) => (
          <Box component="section" key={category} sx={{ mt: 6 }}>
            <Typography component="h2" sx={{ mb: 3 }} variant="h2">{category}</Typography>
            <Grid container spacing={3}>
              {categoryMeals.map((meal) => (
                <Grid item key={meal.id} lg={6} xs={12}>
                  <MealCard meal={meal} onAdd={onAddMeal} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Button startIcon={<ArrowBackRounded />} sx={{ mt: 6 }} onClick={() => onNavigate('/restaurants')}>Back to restaurants</Button>
      </Container>
    </>
  );
}

