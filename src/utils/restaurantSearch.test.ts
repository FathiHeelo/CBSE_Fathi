import { describe, expect, it } from 'vitest';

import { meals, restaurants } from '../data/mockData';
import { filterAndSortRestaurants, searchMeals } from './restaurantSearch';

describe('restaurant search and filtering', () => {
  it('finds a meal by its name', () => {
    expect(searchMeals(meals, 'cheeseburger').map((meal) => meal.id)).toContain('meal-101');
  });

  it('includes a restaurant when one of its meals matches', () => {
    const results = filterAndSortRestaurants(restaurants, meals, 'cheeseburger', 'All', 'featured');
    expect(results.map((restaurant) => restaurant.restaurantId)).toEqual(['rest-01']);
  });

  it('filters by category and sorts by rating', () => {
    const results = filterAndSortRestaurants(restaurants, meals, '', 'Healthy', 'rating');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((restaurant) => restaurant.categories.includes('Healthy'))).toBe(true);
    expect(results.map((restaurant) => restaurant.rating)).toEqual(
      [...results].sort((a, b) => b.rating - a.rating).map((restaurant) => restaurant.rating),
    );
  });
});
