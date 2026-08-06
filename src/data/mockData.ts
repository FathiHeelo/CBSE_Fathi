export interface Restaurant {
  restaurantId: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  rating: number;
  deliveryEstimate: string;
  categories: string[];
}

export interface MealItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export const restaurants = [
  {
    restaurantId: 'rest-01',
    name: 'Burger House',
    cuisine: 'American',
    description: 'Hand-pressed burgers, loaded fries, and house-made sauces prepared fresh to order.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    deliveryEstimate: '25-35 min',
    categories: ['Burgers', 'Fast Food', 'American'],
  },
  {
    restaurantId: 'rest-02',
    name: 'Olive & Zaatar',
    cuisine: 'Palestinian',
    description: 'Traditional Palestinian comfort food made with local olive oil, herbs, and family recipes.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    deliveryEstimate: '30-40 min',
    categories: ['Palestinian', 'Middle Eastern', 'Traditional'],
  },
  {
    restaurantId: 'rest-03',
    name: 'Napoli Oven',
    cuisine: 'Italian',
    description: 'Stone-baked Neapolitan pizza, handmade pasta, and classic Italian desserts.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    deliveryEstimate: '30-45 min',
    categories: ['Pizza', 'Italian', 'Pasta'],
  },
  {
    restaurantId: 'rest-04',
    name: 'Sushi Wave',
    cuisine: 'Japanese',
    description: 'Fresh sushi rolls, poke bowls, and Japanese favorites prepared by experienced chefs.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    deliveryEstimate: '35-45 min',
    categories: ['Sushi', 'Japanese', 'Asian'],
  },
  {
    restaurantId: 'rest-05',
    name: 'Damask Grill',
    cuisine: 'Levantine',
    description: 'Charcoal-grilled meats, mezze, and warm flatbreads inspired by Levantine kitchens.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    deliveryEstimate: '25-40 min',
    categories: ['Grill', 'Middle Eastern', 'Shawarma'],
  },
  {
    restaurantId: 'rest-06',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    description: 'Colorful salads, protein bowls, and plant-forward meals with fresh seasonal ingredients.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    deliveryEstimate: '20-30 min',
    categories: ['Healthy', 'Salads', 'Vegan'],
  },
] satisfies readonly Restaurant[];

export const meals = [
  {
    id: 'meal-101',
    restaurantId: 'rest-01',
    restaurantName: 'Burger House',
    name: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar, lettuce, tomato, pickles, and house sauce in a toasted bun.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    category: 'Burgers',
    quantity: 1,
  },
  {
    id: 'meal-102',
    restaurantId: 'rest-01',
    restaurantName: 'Burger House',
    name: 'Smoky BBQ Burger',
    description: 'Double beef, smoked cheddar, crispy onions, pickles, and smoky barbecue sauce.',
    price: 44,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80',
    category: 'Burgers',
    quantity: 1,
  },
  {
    id: 'meal-103',
    restaurantId: 'rest-01',
    restaurantName: 'Burger House',
    name: 'Crispy Chicken Burger',
    description: 'Buttermilk fried chicken, cabbage slaw, pickles, and spicy mayonnaise.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
    category: 'Burgers',
    quantity: 1,
  },
  {
    id: 'meal-104',
    restaurantId: 'rest-01',
    restaurantName: 'Burger House',
    name: 'Loaded House Fries',
    description: 'Crispy fries topped with cheese sauce, caramelized onions, and burger sauce.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    category: 'Sides',
    quantity: 1,
  },
  {
    id: 'meal-201',
    restaurantId: 'rest-02',
    restaurantName: 'Olive & Zaatar',
    name: 'Musakhan Rolls',
    description: 'Sumac chicken, caramelized onions, toasted pine nuts, and taboon bread rolls.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    category: 'Main Dishes',
    quantity: 1,
  },
  {
    id: 'meal-202',
    restaurantId: 'rest-02',
    restaurantName: 'Olive & Zaatar',
    name: 'Maqluba Bowl',
    description: 'Spiced rice layered with chicken, eggplant, cauliflower, and toasted almonds.',
    price: 48,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    category: 'Main Dishes',
    quantity: 1,
  },
  {
    id: 'meal-203',
    restaurantId: 'rest-02',
    restaurantName: 'Olive & Zaatar',
    name: 'Hummus & Falafel Plate',
    description: 'Creamy hummus, four falafel pieces, pickles, vegetables, and fresh pita.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80',
    category: 'Mezze',
    quantity: 1,
  },
  {
    id: 'meal-204',
    restaurantId: 'rest-02',
    restaurantName: 'Olive & Zaatar',
    name: 'Zaatar Manoushe',
    description: 'Freshly baked flatbread with zaatar, local olive oil, tomato, cucumber, and mint.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80',
    category: 'Bakery',
    quantity: 1,
  },
  {
    id: 'meal-301',
    restaurantId: 'rest-03',
    restaurantName: 'Napoli Oven',
    name: 'Margherita Pizza',
    description: 'San Marzano tomato, fresh mozzarella, basil, olive oil, and a charred sourdough crust.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    category: 'Pizza',
    quantity: 1,
  },
  {
    id: 'meal-302',
    restaurantId: 'rest-03',
    restaurantName: 'Napoli Oven',
    name: 'Truffle Mushroom Pizza',
    description: 'Mozzarella, roasted mushrooms, parmesan, thyme, and fragrant truffle cream.',
    price: 52,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    category: 'Pizza',
    quantity: 1,
  },
  {
    id: 'meal-303',
    restaurantId: 'rest-03',
    restaurantName: 'Napoli Oven',
    name: 'Penne Arrabbiata',
    description: 'Penne pasta in a spicy tomato and garlic sauce finished with parsley and parmesan.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    category: 'Pasta',
    quantity: 1,
  },
  {
    id: 'meal-304',
    restaurantId: 'rest-03',
    restaurantName: 'Napoli Oven',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    category: 'Desserts',
    quantity: 1,
  },
  {
    id: 'meal-401',
    restaurantId: 'rest-04',
    restaurantName: 'Sushi Wave',
    name: 'Salmon Avocado Roll',
    description: 'Fresh salmon, avocado, cucumber, sushi rice, and roasted sesame seeds.',
    price: 46,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    category: 'Sushi Rolls',
    quantity: 1,
  },
  {
    id: 'meal-402',
    restaurantId: 'rest-04',
    restaurantName: 'Sushi Wave',
    name: 'Crunchy Shrimp Roll',
    description: 'Tempura shrimp, avocado, cucumber, crunchy flakes, and spicy mayonnaise.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80',
    category: 'Sushi Rolls',
    quantity: 1,
  },
  {
    id: 'meal-403',
    restaurantId: 'rest-04',
    restaurantName: 'Sushi Wave',
    name: 'Teriyaki Chicken Bowl',
    description: 'Grilled teriyaki chicken, steamed rice, edamame, carrots, and sesame.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    category: 'Rice Bowls',
    quantity: 1,
  },
  {
    id: 'meal-404',
    restaurantId: 'rest-04',
    restaurantName: 'Sushi Wave',
    name: 'Vegetable Gyoza',
    description: 'Pan-seared dumplings filled with cabbage, mushroom, carrot, and ginger.',
    price: 26,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80',
    category: 'Starters',
    quantity: 1,
  },
  {
    id: 'meal-501',
    restaurantId: 'rest-05',
    restaurantName: 'Damask Grill',
    name: 'Chicken Shawarma Plate',
    description: 'Marinated chicken shawarma, garlic sauce, pickles, fries, and warm flatbread.',
    price: 43,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80',
    category: 'Shawarma',
    quantity: 1,
  },
  {
    id: 'meal-502',
    restaurantId: 'rest-05',
    restaurantName: 'Damask Grill',
    name: 'Mixed Grill',
    description: 'Chicken shish, kofta, lamb cubes, grilled vegetables, rice, and tahini.',
    price: 68,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    category: 'Grill',
    quantity: 1,
  },
  {
    id: 'meal-503',
    restaurantId: 'rest-05',
    restaurantName: 'Damask Grill',
    name: 'Kofta Tahini',
    description: 'Oven-baked kofta with potatoes, tomato, tahini sauce, and toasted bread.',
    price: 52,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
    category: 'Main Dishes',
    quantity: 1,
  },
  {
    id: 'meal-504',
    restaurantId: 'rest-05',
    restaurantName: 'Damask Grill',
    name: 'Mezze Selection',
    description: 'Hummus, moutabal, muhammara, tabbouleh, olives, and freshly baked flatbread.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80',
    category: 'Mezze',
    quantity: 1,
  },
  {
    id: 'meal-601',
    restaurantId: 'rest-06',
    restaurantName: 'Green Bowl',
    name: 'Mediterranean Power Bowl',
    description: 'Quinoa, chickpeas, cucumber, tomato, greens, olives, and lemon tahini dressing.',
    price: 37,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    category: 'Bowls',
    quantity: 1,
  },
  {
    id: 'meal-602',
    restaurantId: 'rest-06',
    restaurantName: 'Green Bowl',
    name: 'Grilled Chicken Caesar',
    description: 'Romaine, grilled chicken, parmesan, sourdough croutons, and light Caesar dressing.',
    price: 41,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
    category: 'Salads',
    quantity: 1,
  },
  {
    id: 'meal-603',
    restaurantId: 'rest-06',
    restaurantName: 'Green Bowl',
    name: 'Vegan Falafel Bowl',
    description: 'Falafel, brown rice, cabbage, tomato, pickles, herbs, and green tahini.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb2?auto=format&fit=crop&w=900&q=80',
    category: 'Bowls',
    quantity: 1,
  },
  {
    id: 'meal-604',
    restaurantId: 'rest-06',
    restaurantName: 'Green Bowl',
    name: 'Berry Oat Smoothie',
    description: 'Mixed berries, banana, oats, almond milk, chia seeds, and date syrup.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80',
    category: 'Drinks',
    quantity: 1,
  },
] satisfies readonly MealItem[];

export const restaurantCategories = [
  ...new Set(restaurants.flatMap(({ categories }) => categories)),
].sort();

export function getRestaurantById(restaurantId: string): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.restaurantId === restaurantId);
}

export function getMealsByRestaurantId(restaurantId: string): MealItem[] {
  return meals.filter((meal) => meal.restaurantId === restaurantId);
}

export function isCatalogDataValid(
  sourceRestaurants: readonly Restaurant[] = restaurants,
  sourceMeals: readonly MealItem[] = meals,
): boolean {
  if (sourceRestaurants.length === 0 || sourceMeals.length === 0) return false;

  const restaurantIds = new Set(sourceRestaurants.map((restaurant) => restaurant.restaurantId));
  return sourceMeals.every((meal) => restaurantIds.has(meal.restaurantId));
}
