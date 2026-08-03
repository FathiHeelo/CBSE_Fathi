import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';

import { CatalogFooter } from './components/layout/CatalogFooter';
import { CatalogHeader } from './components/layout/CatalogHeader';
import { useCatalogState } from './hooks/useCatalogState';
import { useCatalogNavigation } from './hooks/useCatalogNavigation';
import type { Product } from './types/product';
import { dispatchAddToCart } from './utils/catalogEvents';
import { HomeView } from './views/HomeView';
import { PDPView } from './views/PDPView';
import { PLPView } from './views/PLPView';

export default function App() {
  const catalog = useCatalogState();
  const { route, navigate } = useCatalogNavigation();
  const [cartMessage, setCartMessage] = useState('');

  const viewDetails = (product: Product) => navigate(`/products/${encodeURIComponent(product.slug)}`);

  const addToCart = (
    product: Product,
    quantity = 1,
    options: { size?: string; color?: string } = {},
  ) => {
    dispatchAddToCart(product, quantity, options);
    setCartMessage(`${quantity} × ${product.title} added to your bag`);
  };

  const browseCategory = (category: string) => {
    catalog.resetFilters();
    catalog.setFilter('category', category);
    navigate('/products');
  };

  let content;

  if (route.name === 'home') {
    content = (
      <HomeView
        categories={catalog.categories}
        products={catalog.products}
        searchTerm={catalog.searchTerm}
        onAddToCart={addToCart}
        onBrowseCategory={browseCategory}
        onSearchChange={catalog.setSearchTerm}
        onShopAll={() => navigate('/products')}
        onViewDetails={viewDetails}
      />
    );
  } else if (route.name === 'products') {
    content = (
      <PLPView
        brands={catalog.brands}
        categories={catalog.categories}
        filters={catalog.filters}
        isSearchPending={catalog.isSearchPending}
        priceBounds={catalog.priceBounds}
        products={catalog.filteredProducts}
        searchTerm={catalog.searchTerm}
        sortBy={catalog.sortBy}
        onAddToCart={addToCart}
        onFilterChange={catalog.setFilter}
        onResetFilters={catalog.resetFilters}
        onSearchChange={catalog.setSearchTerm}
        onSortChange={catalog.setSortBy}
        onViewDetails={viewDetails}
      />
    );
  } else if (route.name === 'product') {
    const product = catalog.getProductBySlug(route.slug);
    content = product ? (
      <PDPView
        key={product.id}
        product={product}
        relatedProducts={catalog.products.filter(({ category, id }) => category === product.category && id !== product.id)}
        onAddToCart={addToCart}
        onNavigate={navigate}
        onQuickAdd={addToCart}
        onViewDetails={viewDetails}
      />
    ) : (
      <NotFound onHome={() => navigate('/')} />
    );
  } else {
    content = <NotFound onHome={() => navigate('/')} />;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CatalogHeader onNavigate={navigate} />
      <Box component="main">{content}</Box>
      <CatalogFooter />
      <Snackbar autoHideDuration={3500} open={Boolean(cartMessage)} onClose={() => setCartMessage('')}>
        <Alert severity="success" variant="filled" onClose={() => setCartMessage('')}>{cartMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

function NotFound({ onHome }: { onHome: () => void }) {
  return (
    <Box sx={{ px: 3, py: 14, textAlign: 'center' }}>
      <Typography color="primary" variant="overline">404</Typography>
      <Typography component="h1" variant="h3">This style is no longer here</Typography>
      <Typography color="text.secondary" sx={{ my: 2 }}>Return home to keep exploring the marketplace.</Typography>
      <Button variant="contained" onClick={onHome}>Back to home</Button>
    </Box>
  );
}
