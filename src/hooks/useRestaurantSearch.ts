import { useMemo, useState } from 'react';

import type { MealItem, Restaurant } from '../data/mockData';
import { filterAndSortRestaurants, searchMeals, type RestaurantSortOption } from '../utils/restaurantSearch';
import { useDebouncedValue } from './useDebouncedValue';

export type { RestaurantSortOption } from '../utils/restaurantSearch';

export function useRestaurantSearch(restaurants: readonly Restaurant[], meals: readonly MealItem[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<RestaurantSortOption>('featured');
  const debouncedQuery = useDebouncedValue(query, 300);

  const categories = useMemo(
    () => ['All', ...new Set(restaurants.flatMap((restaurant) => restaurant.categories))].sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    }),
    [restaurants],
  );

  const matchingMeals = useMemo(() => {
    return searchMeals(meals, debouncedQuery);
  }, [debouncedQuery, meals]);

  const matchingRestaurants = useMemo(() => {
    return filterAndSortRestaurants(restaurants, meals, debouncedQuery, category, sortBy);
  }, [category, debouncedQuery, meals, restaurants, sortBy]);

  const reset = () => {
    setQuery('');
    setCategory('All');
    setSortBy('featured');
  };

  return {
    query,
    category,
    sortBy,
    categories,
    matchingMeals,
    matchingRestaurants,
    isSearchPending: query !== debouncedQuery,
    setQuery,
    setCategory,
    setSortBy,
    reset,
  };
}
