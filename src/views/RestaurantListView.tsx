import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

import { RestaurantCard } from '../components/catalog/RestaurantCard';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { SearchBar } from '../components/catalog/SearchBar';
import { YumyState } from '../components/catalog/YumyState';
import type { Restaurant } from '../data/mockData';
import type { RestaurantSortOption } from '../hooks/useRestaurantSearch';
import type { CatalogStatus } from '../types/catalog';

interface RestaurantListViewProps {
  status: CatalogStatus;
  restaurants: readonly Restaurant[];
  categories: string[];
  category: string;
  query: string;
  sortBy: RestaurantSortOption;
  isSearchPending: boolean;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: RestaurantSortOption) => void;
  onReset: () => void;
  onViewRestaurant: (restaurant: Restaurant) => void;
  onRetry: () => void;
}

export function RestaurantListView({
  status,
  restaurants,
  categories,
  category,
  query,
  sortBy,
  isSearchPending,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onReset,
  onViewRestaurant,
  onRetry,
}: RestaurantListViewProps) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography color="primary" variant="overline">Local favorites</Typography>
        <Typography component="h1" variant="h1">Restaurants</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Browse cuisines, compare delivery times, and find your next meal.</Typography>
      </Box>
      <Box sx={{ mb: 3, maxWidth: 720 }}>
        <SearchBar loading={isSearchPending} placeholder="Search restaurant or meal name" value={query} onChange={onQueryChange} />
      </Box>
      <FilterSidebar categories={categories} category={category} sortBy={sortBy} onCategoryChange={onCategoryChange} onSortChange={onSortChange} />
      <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ my: 3 }}>
        <Typography color="text.secondary" variant="body2">{restaurants.length} restaurants</Typography>
        {(query || category !== 'All') && <Button onClick={onReset}>Clear filters</Button>}
      </Stack>

      {status === 'loading' ? <YumyState type="loading" /> : status === 'error' ? <YumyState actionLabel="Try again" type="error" onAction={onRetry} /> : restaurants.length === 0 ? (
        <YumyState actionLabel="Clear filters" type="empty" onAction={onReset} />
      ) : (
        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid item key={restaurant.restaurantId} lg={4} sm={6} xs={12}>
              <RestaurantCard restaurant={restaurant} onSelect={onViewRestaurant} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
