import { describe, expect, it } from 'vitest';

import {
  getMealsByRestaurantId,
  getRestaurantById,
  meals,
  restaurants,
} from './mockData';

describe('canonical Yum Ta Dum mock data', () => {
  it('keeps restaurant and meal IDs unique and stable', () => {
    expect(new Set(restaurants.map(({ restaurantId }) => restaurantId)).size).toBe(restaurants.length);
    expect(new Set(meals.map(({ id }) => id)).size).toBe(meals.length);
    expect(restaurants[0].restaurantId).toBe('rest-01');
    expect(meals[0].id).toBe('meal-101');
  });

  it('links every meal to its canonical restaurant', () => {
    for (const meal of meals) {
      const restaurant = getRestaurantById(meal.restaurantId);
      expect(restaurant, `${meal.id} has no restaurant`).toBeDefined();
      expect(meal.restaurantName).toBe(restaurant?.name);
    }
  });

  it('stores raw positive ILS values and default quantities', () => {
    for (const meal of meals) {
      expect(typeof meal.price).toBe('number');
      expect(meal.price).toBeGreaterThan(0);
      expect(meal.quantity).toBe(1);
    }
  });

  it('provides restaurant lookup helpers for views and integration fixtures', () => {
    expect(getRestaurantById('rest-01')?.name).toBe('Burger House');
    expect(getMealsByRestaurantId('rest-01')).toHaveLength(4);
    expect(getMealsByRestaurantId('missing')).toEqual([]);
  });
});
