import { afterEach, describe, expect, it, vi } from 'vitest';

import mockProducts from '../data/mockProducts.json';
import type { AddToCartDetail } from './catalogEvents';
import type { Product } from '../types/product';
import { dispatchAddToCart } from './catalogEvents';

const product = (mockProducts as unknown as Product[])[0];

describe('catalog events', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('dispatches a composed, bubbling add-to-cart event with variant details', () => {
    const eventTarget = new EventTarget();
    vi.stubGlobal('window', eventTarget);
    let receivedEvent: CustomEvent<AddToCartDetail> | undefined;

    eventTarget.addEventListener('catalog:add-to-cart', (event) => {
      receivedEvent = event as CustomEvent<AddToCartDetail>;
    });

    dispatchAddToCart(product, 2, { color: 'Oat', size: 'M' });

    expect(receivedEvent?.detail).toMatchObject({
      productId: product.id,
      quantity: 2,
      color: 'Oat',
      size: 'M',
    });
    expect(receivedEvent?.bubbles).toBe(true);
    expect(receivedEvent?.composed).toBe(true);
  });
});
