import { FilterListRounded as FilterListRoundedIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { SearchBar } from '../components/catalog/SearchBar';
import type { CatalogFilters, CatalogSortOption, PriceRange, Product } from '../types/product';

interface PLPViewProps {
  products: Product[];
  searchTerm: string;
  isSearchPending: boolean;
  filters: CatalogFilters;
  sortBy: CatalogSortOption;
  categories: string[];
  brands: string[];
  priceBounds: PriceRange;
  onSearchChange: (value: string) => void;
  onFilterChange: <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => void;
  onSortChange: (value: CatalogSortOption) => void;
  onResetFilters: () => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function PLPView({
  products,
  searchTerm,
  isSearchPending,
  filters,
  sortBy,
  categories,
  brands,
  priceBounds,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onResetFilters,
  onViewDetails,
  onAddToCart,
}: PLPViewProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filterContent = (
    <FilterSidebar
      brands={brands}
      categories={categories}
      filters={filters}
      priceBounds={priceBounds}
      onFilterChange={onFilterChange}
      onReset={onResetFilters}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography color="primary" variant="overline">The marketplace edit</Typography>
        <Typography component="h1" variant="h2">Shop all fashion</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
          Explore clothing, footwear, and accessories selected from independent labels.
        </Typography>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 720 }}>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        {isSearchPending && <LinearProgress aria-label="Updating search results" sx={{ mx: 3, mt: -0.5 }} />}
      </Box>

      <Stack alignItems={{ xs: 'stretch', sm: 'center' }} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Stack alignItems="center" direction="row" spacing={1.5}>
          <Button startIcon={<FilterListRoundedIcon />} sx={{ display: { md: 'none' } }} variant="outlined" onClick={() => setMobileFiltersOpen(true)}>
            Filters
          </Button>
          <Typography color="text.secondary" variant="body2">{products.length} results</Typography>
        </Stack>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="catalog-sort-label">Sort by</InputLabel>
          <Select
            label="Sort by"
            labelId="catalog-sort-label"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as CatalogSortOption)}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="price-asc">Price: low to high</MenuItem>
            <MenuItem value="price-desc">Price: high to low</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '280px minmax(0, 1fr)' } }}>
        <Paper sx={{ alignSelf: 'start', display: { xs: 'none', md: 'block' }, position: 'sticky', top: 96 }}>
          {filterContent}
        </Paper>
        <ProductGrid products={products} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
      </Box>

      <Drawer anchor="left" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <Box sx={{ maxWidth: '88vw', width: 320 }}>
          {filterContent}
          <Box sx={{ px: 3, pb: 3 }}>
            <Button fullWidth variant="contained" onClick={() => setMobileFiltersOpen(false)}>Show {products.length} products</Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
}
