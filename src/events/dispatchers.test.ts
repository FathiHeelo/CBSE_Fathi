import { afterEach, describe, expect, it, vi } from 'vitest';

import { meals } from '../data/mockData';
import {
  CATALOG_EVENTS,
  dispatchCartAddItem,
  dispatchNavigationRequested,
  type CartAddItemDetail,
  type NavigationRequestedDetail,
} from './dispatchers';

describe('Yum Ta Dum catalog event dispatchers', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('dispatches the exact cart:add-item contract across Shadow DOM boundaries', () => {
    const eventTarget = new EventTarget();
    vi.stubGlobal('window', eventTarget);
    let receivedEvent: CustomEvent<CartAddItemDetail> | undefined;

    eventTarget.addEventListener(CATALOG_EVENTS.addItemToCart, (event) => {
      receivedEvent = event as CustomEvent<CartAddItemDetail>;
    });

    const detail = dispatchCartAddItem(meals[0], 2);

    expect(detail.item).toEqual({ ...meals[0], quantity: 2 });
    expect(receivedEvent?.detail).toEqual(detail);
    expect(receivedEvent?.bubbles).toBe(true);
    expect(receivedEvent?.composed).toBe(true);
    expect(typeof receivedEvent?.detail.item.price).toBe('number');
  });

  it('dispatches navigation:requested without forcing a page reload', () => {
    const eventTarget = new EventTarget();
    vi.stubGlobal('window', eventTarget);
    let receivedEvent: CustomEvent<NavigationRequestedDetail> | undefined;

    eventTarget.addEventListener(CATALOG_EVENTS.requestNavigation, (event) => {
      receivedEvent = event as CustomEvent<NavigationRequestedDetail>;
    });

    dispatchNavigationRequested('/restaurants/rest-01');

    expect(receivedEvent?.detail).toEqual({ route: '/restaurants/rest-01' });
    expect(receivedEvent?.bubbles).toBe(true);
    expect(receivedEvent?.composed).toBe(true);
  });

  it('rejects non-route navigation values', () => {
    vi.stubGlobal('window', new EventTarget());
    expect(() => dispatchNavigationRequested('restaurants/rest-01')).toThrow(
      'Catalog navigation routes must start with "/".',
    );
  });
});
