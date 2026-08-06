import { describe, expect, it } from 'vitest';

import { resolveCatalogRoute } from './useCatalogNavigation';

describe('catalog route resolution', () => {
  it.each([
    ['/', { name: 'home' }],
    ['/restaurants', { name: 'restaurants' }],
    ['/restaurants/rest-01', { name: 'restaurant', restaurantId: 'rest-01' }],
    ['/search', { name: 'search' }],
    ['/unknown', { name: 'not-found' }],
  ])('maps %s to the expected catalog route', (pathname, expected) => {
    expect(resolveCatalogRoute(pathname)).toEqual(expected);
  });
});
