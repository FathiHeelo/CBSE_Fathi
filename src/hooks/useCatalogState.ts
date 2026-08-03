import { useCallback, useMemo, useState } from 'react';

import mockProducts from '../data/mockProducts.json';
import type {
  CatalogFilters,
  CatalogSortOption,
  Product,
} from '../types/product';
import {
  getPriceBounds,
  getUniqueValues,
  selectCatalogProducts,
} from '../utils/catalogUtils';
import { useDebouncedValue } from './useDebouncedValue';

const catalogSeed = mockProducts as unknown as Product[];

function createInitialFilters(products: Product[]): CatalogFilters {
  return {
    category: 'all',
    brands: [],
    priceRange: getPriceBounds(products),
    minimumRating: 0,
    inStockOnly: false,
  };
}

export interface UseCatalogStateOptions {
  initialProducts?: Product[];
  searchDebounceMs?: number;
}

export function useCatalogState(options: UseCatalogStateOptions = {}) {
  const { initialProducts = catalogSeed, searchDebounceMs = 300 } = options;
  const [products, setProducts] = useState<Product[]>(() => [...initialProducts]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CatalogFilters>(() =>
    createInitialFilters(initialProducts),
  );
  const [sortBy, setSortBy] = useState<CatalogSortOption>('relevance');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, searchDebounceMs);

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);
  const categories = useMemo(() => getUniqueValues(products, 'category'), [products]);
  const brands = useMemo(() => getUniqueValues(products, 'brand'), [products]);

  const filteredProducts = useMemo(
    () =>
      selectCatalogProducts(
        products,
        { ...filters, searchTerm: debouncedSearchTerm },
        sortBy,
      ),
    [debouncedSearchTerm, filters, products, sortBy],
  );

  const setFilter = useCallback(
    <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => {
      setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilters(createInitialFilters(products));
    setSortBy('relevance');
  }, [products]);

  const addProduct = useCallback((product: Product) => {
    setProducts((currentProducts) =>
      currentProducts.some(({ id }) => id === product.id)
        ? currentProducts
        : [...currentProducts, product],
    );
  }, []);

  const updateProduct = useCallback(
    (productId: string, updates: Partial<Omit<Product, 'id'>>) => {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, ...updates } : product,
        ),
      );
    },
    [],
  );

  const removeProduct = useCallback((productId: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter(({ id }) => id !== productId),
    );
  }, []);

  const resetProducts = useCallback(() => {
    setProducts([...initialProducts]);
  }, [initialProducts]);

  const getProductById = useCallback(
    (productId: string) => products.find(({ id }) => id === productId),
    [products],
  );

  const getProductBySlug = useCallback(
    (slug: string) => products.find((product) => product.slug === slug),
    [products],
  );

  return {
    products,
    filteredProducts,
    totalResults: filteredProducts.length,
    searchTerm,
    debouncedSearchTerm,
    isSearchPending: searchTerm !== debouncedSearchTerm,
    filters,
    sortBy,
    categories,
    brands,
    priceBounds,
    setSearchTerm,
    setFilter,
    setSortBy,
    resetFilters,
    addProduct,
    updateProduct,
    removeProduct,
    resetProducts,
    getProductById,
    getProductBySlug,
  };
}
