export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductRating {
  value: number;
  count: number;
}

export interface ProductInventory {
  quantity: number;
  status: StockStatus;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductAudience = 'women' | 'men' | 'unisex' | 'kids';

export interface ProductSeller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory: string;
  audience: ProductAudience;
  brand: string;
  seller: ProductSeller;
  price: number;
  compareAtPrice: number | null;
  currency: 'USD';
  rating: ProductRating;
  inventory: ProductInventory;
  images: ProductImage[];
  thumbnail: string;
  tags: string[];
  availableColors: ProductColor[];
  availableSizes: string[];
  materials: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  popularity: number;
  specifications: Record<string, string>;
  createdAt: string;
}

export type PriceRange = [number, number];

export interface CatalogFilters {
  category: string;
  brands: string[];
  priceRange: PriceRange;
  minimumRating: number;
  inStockOnly: boolean;
}

export type CatalogSortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'popularity'
  | 'rating'
  | 'newest';

export interface CatalogQuery extends CatalogFilters {
  searchTerm: string;
}
