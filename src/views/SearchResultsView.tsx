import { Box, Container, Grid, Typography } from '@mui/material';

import { MealCard } from '../components/catalog/MealCard';
import { RestaurantCard } from '../components/catalog/RestaurantCard';
import { SearchBar } from '../components/catalog/SearchBar';
import { YumyState } from '../components/catalog/YumyState';
import type { MealItem, Restaurant } from '../data/mockData';
import type { CatalogStatus } from '../types/catalog';

interface SearchResultsViewProps {
  status: CatalogStatus;
  query: string;
  restaurants: readonly Restaurant[];
  meals: readonly MealItem[];
  isSearchPending: boolean;
  onQueryChange: (query: string) => void;
  onViewRestaurant: (restaurant: Restaurant) => void;
  onAddMeal: (meal: MealItem) => void;
  onRetry: () => void;
}

export function SearchResultsView({ status, query, restaurants, meals, isSearchPending, onQueryChange, onViewRestaurant, onAddMeal, onRetry }: SearchResultsViewProps) {
  const hasResults = restaurants.length > 0 || meals.length > 0;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
      <Typography color="primary" variant="overline">Search Yum Ta Dum</Typography>
      <Typography component="h1" variant="h1">Find restaurants and meals</Typography>
      <Box sx={{ my: 3, maxWidth: 720 }}>
        <SearchBar loading={isSearchPending} placeholder="Try burger, sushi, Palestinian…" value={query} onChange={onQueryChange} />
      </Box>

      {status === 'loading' ? <YumyState type="loading" /> : status === 'error' ? <YumyState actionLabel="Try again" type="error" onAction={onRetry} /> : !query ? (
        <YumyState type="empty" title="What sounds good?" message="Enter a restaurant, cuisine, or meal name to start searching." />
      ) : !hasResults ? <YumyState actionLabel="Clear search" type="empty" onAction={() => onQueryChange('')} /> : (
        <>
          {restaurants.length > 0 && (
            <Box component="section" sx={{ mt: 5 }}>
              <Typography component="h2" sx={{ mb: 3 }} variant="h2">Restaurants ({restaurants.length})</Typography>
              <Grid container spacing={3}>
                {restaurants.map((restaurant) => (
                  <Grid item key={restaurant.restaurantId} lg={4} sm={6} xs={12}>
                    <RestaurantCard restaurant={restaurant} onSelect={onViewRestaurant} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {meals.length > 0 && (
            <Box component="section" sx={{ mt: 6 }}>
              <Typography component="h2" sx={{ mb: 3 }} variant="h2">Meals ({meals.length})</Typography>
              <Grid container spacing={3}>
                {meals.map((meal) => (
                  <Grid item key={meal.id} lg={6} xs={12}>
                    <MealCard meal={meal} onAdd={onAddMeal} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
