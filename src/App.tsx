import { Alert, Box, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

import { BrandLogo } from './components/brand/BrandLogo';
import { YumyState } from './components/catalog/YumyState';
import { CatalogFooter } from './components/layout/CatalogFooter';
import { CatalogHeader } from './components/layout/CatalogHeader';
import {
  getMealsByRestaurantId,
  getRestaurantById,
  isCatalogDataValid,
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
  const [status, setStatus] = useState<CatalogStatus>('loading');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const search = useRestaurantSearch(restaurants, meals);
  const { route, searchParams, navigate } = useCatalogNavigation({ embedded });
  const [cartMessage, setCartMessage] = useState('');
  const urlQuery = searchParams.get('q') ?? '';

  useEffect(() => {
    setStatus('loading');
    const timeoutId = window.setTimeout(() => {
      try {
        setStatus(isCatalogDataValid() ? 'ready' : 'error');
      } catch {
        setStatus('error');
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [loadAttempt]);

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

  const retryCatalog = () => setLoadAttempt((attempt) => attempt + 1);

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
        onRetry={retryCatalog}
        onSearch={submitSearch}
        onViewRestaurant={viewRestaurant}
      />
    );
  } else if (route.name === 'restaurants') {
    content = (
      <RestaurantListView
        categories={search.categories}
        category={search.category}
        isSearchPending={search.isSearchPending}
        query={search.query}
        restaurants={search.matchingRestaurants}
        sortBy={search.sortBy}
        status={status}
        onCategoryChange={search.setCategory}
        onQueryChange={search.setQuery}
        onReset={search.reset}
        onRetry={retryCatalog}
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
        onRetry={retryCatalog}
      />
    );
  } else if (route.name === 'search') {
    content = (
      <SearchResultsView
        meals={search.query ? search.matchingMeals : []}
        isSearchPending={search.isSearchPending}
        query={search.query}
        restaurants={search.query ? search.matchingRestaurants : []}
        status={status}
        onAddMeal={addMeal}
        onQueryChange={search.setQuery}
        onRetry={retryCatalog}
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
        <Alert icon={<BrandLogo showName={false} size={32} />} severity="success" variant="filled" onClose={() => setCartMessage('')}>{cartMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

function NotFound({ onHome }: { onHome: () => void }) {
  return (
    <YumyState
      actionLabel="Back to home"
      message="Return home to discover restaurants and meals."
      title="This page is not on Yumy's map"
      type="empty"
      onAction={onHome}
    />
  );
}
