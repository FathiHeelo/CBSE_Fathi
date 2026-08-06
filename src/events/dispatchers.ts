import type { MealItem } from '../data/mockData';

export const CATALOG_EVENTS = {
  addItemToCart: 'cart:add-item',
  requestNavigation: 'navigation:requested',
} as const;

export interface CartAddItemDetail {
  item: MealItem;
}

export interface NavigationRequestedDetail {
  route: string;
}

function dispatchCatalogEvent<TDetail>(eventName: string, detail: TDetail): void {
  window.dispatchEvent(
    new CustomEvent<TDetail>(eventName, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
}

export function dispatchCartAddItem(meal: MealItem, quantity = 1): CartAddItemDetail {
  const normalizedQuantity = Math.max(1, Math.trunc(quantity));
  const detail: CartAddItemDetail = {
    item: {
      ...meal,
      quantity: normalizedQuantity,
    },
  };

  dispatchCatalogEvent(CATALOG_EVENTS.addItemToCart, detail);
  return detail;
}

export function dispatchNavigationRequested(route: string): NavigationRequestedDetail {
  if (!route.startsWith('/')) {
    throw new Error('Catalog navigation routes must start with "/".');
  }

  const detail: NavigationRequestedDetail = { route };
  dispatchCatalogEvent(CATALOG_EVENTS.requestNavigation, detail);
  return detail;
}

