import { useMemo, useState } from 'react';

import type { MealItem, Restaurant } from '../data/mockData';
import { filterAndSortRestaurants, searchMeals, type RestaurantSortOption } from '../utils/restaurantSearch';

export type { RestaurantSortOption } from '../utils/restaurantSearch';

export function useRestaurantSearch(restaurants: readonly Restaurant[], meals: readonly MealItem[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<RestaurantSortOption>('featured');

  const categories = useMemo(
    () => ['All', ...new Set(restaurants.flatMap((restaurant) => restaurant.categories))].sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    }),
    [restaurants],
  );

  const matchingMeals = useMemo(() => {
    return searchMeals(meals, query);
  }, [meals, query]);

  const matchingRestaurants = useMemo(() => {
    return filterAndSortRestaurants(restaurants, meals, query, category, sortBy);
  }, [category, meals, query, restaurants, sortBy]);

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
    setQuery,
    setCategory,
    setSortBy,
    reset,
  };
}
