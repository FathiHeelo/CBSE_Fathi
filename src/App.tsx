import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { CatalogFooter } from './components/layout/CatalogFooter';
import { CatalogHeader } from './components/layout/CatalogHeader';
import {
  getMealsByRestaurantId,
  getRestaurantById,
  meals,
  restaurants,
  type MealItem,
  type Restaurant,
} from './data/mockData';
import { dispatchCartAddItem } from './events/dispatchers';
import { useCatalogNavigation } from './hooks/useCatalogNavigation';
import { useRestaurantSearch } from './hooks/useRestaurantSearch';
import type { CatalogStatus } from './types/catalog';
import { HomeView } from './views/HomeView';
import { RestaurantDetailView } from './views/RestaurantDetailView';
import { RestaurantListView } from './views/RestaurantListView';
import { SearchResultsView } from './views/SearchResultsView';

export interface AppProps {
  embedded?: boolean;
}

export default function App({ embedded = false }: AppProps) {
  const status: CatalogStatus = 'ready';
  const search = useRestaurantSearch(restaurants, meals);
  const { route, searchParams, navigate } = useCatalogNavigation({ embedded });
  const [cartMessage, setCartMessage] = useState('');
  const urlQuery = searchParams.get('q') ?? '';

  useEffect(() => {
    if (route.name !== 'search') return;
    search.setQuery(urlQuery);
  }, [route.name, search.setQuery, urlQuery]);

  const viewRestaurant = (restaurant: Restaurant) => {
    navigate(`/restaurants/${encodeURIComponent(restaurant.restaurantId)}`);
  };

  const addMeal = (meal: MealItem) => {
    dispatchCartAddItem(meal);
    setCartMessage(`${meal.name} added to your cart`);
  };

  const browseCategory = (category: string) => {
    search.setCategory(category);
    navigate('/restaurants');
  };

  const submitSearch = () => {
    const query = search.query.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  let content;

  if (route.name === 'home') {
    content = (
      <HomeView
        categories={search.categories}
        query={search.query}
        restaurants={restaurants}
        status={status}
        onBrowseAll={() => navigate('/restaurants')}
        onBrowseCategory={browseCategory}
        onQueryChange={search.setQuery}
        onSearch={submitSearch}
        onViewRestaurant={viewRestaurant}
      />
    );
  } else if (route.name === 'restaurants') {
    content = (
      <RestaurantListView
        categories={search.categories}
        category={search.category}
        query={search.query}
        restaurants={search.matchingRestaurants}
        sortBy={search.sortBy}
        status={status}
        onCategoryChange={search.setCategory}
        onQueryChange={search.setQuery}
        onReset={search.reset}
        onSortChange={search.setSortBy}
        onViewRestaurant={viewRestaurant}
      />
    );
  } else if (route.name === 'restaurant') {
    content = (
      <RestaurantDetailView
        meals={getMealsByRestaurantId(route.restaurantId)}
        restaurant={getRestaurantById(route.restaurantId)}
        status={status}
        onAddMeal={addMeal}
        onNavigate={navigate}
      />
    );
  } else if (route.name === 'search') {
    content = (
      <SearchResultsView
        meals={search.query ? search.matchingMeals : []}
        query={search.query}
        restaurants={search.query ? search.matchingRestaurants : []}
        status={status}
        onAddMeal={addMeal}
        onQueryChange={search.setQuery}
        onViewRestaurant={viewRestaurant}
      />
    );
  } else {
    content = <NotFound onHome={() => navigate('/')} />;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {!embedded && <CatalogHeader onNavigate={navigate} />}
      <Box component="main">{content}</Box>
      {!embedded && <CatalogFooter />}
      <Snackbar autoHideDuration={3500} open={Boolean(cartMessage)} onClose={() => setCartMessage('')}>
        <Alert severity="success" variant="filled" onClose={() => setCartMessage('')}>{cartMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

function NotFound({ onHome }: { onHome: () => void }) {
  return (
    <Box sx={{ px: 3, py: 14, textAlign: 'center' }}>
      <Typography color="primary" variant="overline">404</Typography>
      <Typography component="h1" variant="h3">This page is not on Yumy's map</Typography>
      <Typography color="text.secondary" sx={{ my: 2 }}>Return home to discover restaurants and meals.</Typography>
      <Button variant="contained" onClick={onHome}>Back to home</Button>
    </Box>
  );
}
