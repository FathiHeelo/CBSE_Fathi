import type {
  CatalogQuery,
  CatalogSortOption,
  PriceRange,
  Product,
} from '../types/product';

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

function matchesSearch(product: Product, searchTerm: string): boolean {
  const query = normalizeSearchText(searchTerm);

  if (!query) return true;

  const searchableText = normalizeSearchText(
    [
      product.title,
      product.shortDescription,
      product.description,
      product.category,
      product.subcategory,
      product.audience,
      product.brand,
      product.seller.name,
      product.sku,
      ...product.tags,
      ...product.availableColors.map(({ name }) => name),
      ...product.availableSizes,
      ...product.materials,
    ].join(' '),
  );

  return query.split(/\s+/).every((term) => searchableText.includes(term));
}

export function filterProducts(products: Product[], query: CatalogQuery): Product[] {
  return products.filter((product) => {
    const matchesCategory = query.category === 'all' || product.category === query.category;
    const matchesBrand = query.brands.length === 0 || query.brands.includes(product.brand);
    const matchesPrice =
      product.price >= query.priceRange[0] && product.price <= query.priceRange[1];
    const matchesRating = product.rating.value >= query.minimumRating;
    const matchesStock = !query.inStockOnly || product.inventory.quantity > 0;

    return (
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesRating &&
      matchesStock &&
      matchesSearch(product, query.searchTerm)
    );
  });
}

export function sortProducts(products: Product[], sortBy: CatalogSortOption): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'popularity':
      return sortedProducts.sort((a, b) => b.popularity - a.popularity);
    case 'rating':
      return sortedProducts.sort(
        (a, b) => b.rating.value - a.rating.value || b.rating.count - a.rating.count,
      );
    case 'newest':
      return sortedProducts.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    case 'relevance':
    default:
      return sortedProducts;
  }
}

export function selectCatalogProducts(
  products: Product[],
  query: CatalogQuery,
  sortBy: CatalogSortOption,
): Product[] {
  return sortProducts(filterProducts(products, query), sortBy);
}

export function getPriceBounds(products: Product[]): PriceRange {
  if (products.length === 0) return [0, 0];

  const prices = products.map(({ price }) => price);
  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
}

export function getUniqueValues(products: Product[], key: 'brand' | 'category'): string[] {
  return [...new Set(products.map((product) => product[key]))].sort(collator.compare);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
