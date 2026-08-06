import type { MealItem, Restaurant } from '../data/mockData';

export type RestaurantSortOption = 'featured' | 'rating' | 'delivery' | 'name';

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function getDeliveryMinutes(estimate: string): number {
  return Number.parseInt(estimate, 10) || Number.MAX_SAFE_INTEGER;
}

export function searchMeals(meals: readonly MealItem[], query: string): MealItem[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [...meals];

  return meals.filter((meal) =>
    [meal.name, meal.description, meal.category, meal.restaurantName]
      .some((value) => normalize(value).includes(normalizedQuery)),
  );
}

export function filterAndSortRestaurants(
  restaurants: readonly Restaurant[],
  meals: readonly MealItem[],
  query: string,
  category: string,
  sortBy: RestaurantSortOption,
): Restaurant[] {
  const normalizedQuery = normalize(query);
  const matchingMealRestaurantIds = new Set(searchMeals(meals, query).map((meal) => meal.restaurantId));

  const results = restaurants.filter((restaurant) => {
    const matchesCategory = category === 'All' || restaurant.categories.includes(category);
    const matchesQuery = !normalizedQuery ||
      [restaurant.name, restaurant.cuisine, restaurant.description, ...restaurant.categories]
        .some((value) => normalize(value).includes(normalizedQuery)) ||
      matchingMealRestaurantIds.has(restaurant.restaurantId);

    return matchesCategory && matchesQuery;
  });

  return [...results].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery':
        return getDeliveryMinutes(a.deliveryEstimate) - getDeliveryMinutes(b.deliveryEstimate);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return 0;
    }
  });
}
