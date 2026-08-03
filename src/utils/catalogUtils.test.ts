import { describe, expect, it } from 'vitest';

import mockProducts from '../data/mockProducts.json';
import type { CatalogQuery, Product } from '../types/product';
import {
  filterProducts,
  getPriceBounds,
  getUniqueValues,
  normalizeSearchText,
  sortProducts,
} from './catalogUtils';

const products = mockProducts as unknown as Product[];
const priceRange = getPriceBounds(products);

const baseQuery: CatalogQuery = {
  searchTerm: '',
  category: 'all',
  brands: [],
  priceRange,
  minimumRating: 0,
  inStockOnly: false,
};

describe('catalogUtils', () => {
  it('normalizes case and diacritics for consistent searching', () => {
    expect(normalizeSearchText('  Crème ÉLÉGANTE  ')).toBe('creme elegante');
  });

  it('searches product copy and fashion attributes', () => {
    const results = filterProducts(products, { ...baseQuery, searchTerm: 'linen women' });

    expect(results.map(({ slug }) => slug)).toContain('elara-tailored-linen-blazer');
    expect(results.map(({ slug }) => slug)).not.toContain('sol-resort-linen-shirt');
  });

  it('combines category, brand, price, rating, and stock filters', () => {
    const results = filterProducts(products, {
      ...baseQuery,
      category: 'Footwear',
      brands: ['Solis Footwear'],
      priceRange: [100, 175],
      minimumRating: 4.5,
      inStockOnly: true,
    });

    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('nova-leather-sneakers');
  });

  it('sorts a copy without mutating the source list', () => {
    const originalFirstId = products[0].id;
    const sorted = sortProducts(products, 'price-asc');

    expect(sorted[0].price).toBe(36);
    expect(products[0].id).toBe(originalFirstId);
  });

  it('derives stable marketplace facets', () => {
    expect(getUniqueValues(products, 'category')).toEqual([
      'Accessories',
      'Footwear',
      'Men',
      'Women',
    ]);
    expect(priceRange).toEqual([36, 210]);
  });
});
