import {
  ArrowForwardRounded as ArrowForwardRoundedIcon,
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  RecyclingRounded as RecyclingRoundedIcon,
  VerifiedOutlined as VerifiedOutlinedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { ProductGrid } from '../components/catalog/ProductGrid';
import { SearchBar } from '../components/catalog/SearchBar';
import type { Product } from '../types/product';

interface HomeViewProps {
  products: Product[];
  categories: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onShopAll: () => void;
  onBrowseCategory: (category: string) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function HomeView({
  products,
  categories,
  searchTerm,
  onSearchChange,
  onShopAll,
  onBrowseCategory,
  onViewDetails,
  onAddToCart,
}: HomeViewProps) {
  const heroProduct = products.find(({ featured }) => featured) ?? products[0];
  const featuredProducts = products.filter(({ featured }) => featured).slice(0, 3);

  return (
    <>
      <Box sx={{ bgcolor: '#F2E8EC', overflow: 'hidden' }}>
        <Container maxWidth="xl">
          <Grid alignItems="center" container spacing={{ xs: 4, md: 8 }} sx={{ minHeight: { md: 620 }, py: { xs: 6, md: 8 } }}>
            <Grid item md={6} xs={12}>
              <Stack alignItems="flex-start" spacing={3}>
                <Typography color="primary" fontWeight={800} variant="overline">New season · Independent labels</Typography>
                <Typography component="h1" sx={{ maxWidth: 660 }} variant="h1">
                  Style that feels distinctly yours.
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 580 }} variant="h6">
                  Discover considered fashion, emerging designers, and lasting wardrobe pieces—all in one marketplace.
                </Typography>
                <Box sx={{ maxWidth: 600, width: '100%' }}>
                  <SearchBar value={searchTerm} onChange={onSearchChange} onSubmit={onShopAll} />
                </Box>
                <Button endIcon={<ArrowForwardRoundedIcon />} size="large" variant="contained" onClick={onShopAll}>
                  Shop the collection
                </Button>
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box sx={{ mx: 'auto', maxWidth: 520, position: 'relative' }}>
                <Box
                  alt={heroProduct.images[0].alt}
                  component="img"
                  src={heroProduct.images[0].url}
                  sx={{ aspectRatio: '4 / 5', borderRadius: '48% 48% 24px 24px', boxShadow: 8, objectFit: 'cover', width: '100%' }}
                />
                <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, bottom: 24, boxShadow: 4, left: { xs: 12, md: -32 }, p: 2, position: 'absolute' }}>
                  <Typography fontWeight={700}>{heroProduct.title}</Typography>
                  <Typography color="text.secondary" variant="body2">Featured edit</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
          <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 4 }}>
            <Box>
              <Typography color="primary" variant="overline">Find your edit</Typography>
              <Typography component="h2" variant="h3">Shop by category</Typography>
            </Box>
            <Button endIcon={<ArrowForwardRoundedIcon />} onClick={onShopAll}>View everything</Button>
          </Stack>
          <Grid container spacing={2.5}>
            {categories.map((category) => {
              const categoryProducts = products.filter((product) => product.category === category);
              const cover = categoryProducts[0];
              return (
                <Grid item key={category} md={3} sm={6} xs={12}>
                  <Card sx={{ overflow: 'hidden' }}>
                    <CardActionArea onClick={() => onBrowseCategory(category)}>
                      <Box sx={{ position: 'relative' }}>
                        <Box alt={category} component="img" src={cover.thumbnail} sx={{ aspectRatio: '4 / 3', objectFit: 'cover', width: '100%' }} />
                        <Box sx={{ background: 'linear-gradient(transparent, rgba(25,12,18,.82))', inset: 0, position: 'absolute' }} />
                        <Box sx={{ bottom: 0, color: 'common.white', p: 2.5, position: 'absolute' }}>
                          <Typography fontWeight={700} variant="h5">{category}</Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,.78)' }} variant="body2">{categoryProducts.length} pieces</Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box component="section" sx={{ pb: { xs: 7, md: 10 } }}>
          <Stack alignItems="flex-end" direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
            <Box>
              <Typography color="primary" variant="overline">Curated for you</Typography>
              <Typography component="h2" variant="h3">Featured pieces</Typography>
            </Box>
            <Button endIcon={<ArrowForwardRoundedIcon />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={onShopAll}>Shop all</Button>
          </Stack>
          <ProductGrid products={featuredProducts} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
        </Box>
      </Container>

      <Box component="section" sx={{ bgcolor: '#EEE8DF', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { icon: <VerifiedOutlinedIcon />, title: 'Verified boutiques', body: 'Every marketplace seller is quality checked.' },
              { icon: <LocalShippingOutlinedIcon />, title: 'Easy delivery', body: 'Tracked shipping and simple 30-day returns.' },
              { icon: <RecyclingRoundedIcon />, title: 'Considered choices', body: 'Clear material details help you shop thoughtfully.' },
            ].map(({ icon, title, body }) => (
              <Grid item key={title} md={4} xs={12}>
                <Stack alignItems="flex-start" direction="row" spacing={2}>
                  <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, color: 'primary.main', display: 'grid', p: 1.5, placeItems: 'center' }}>{icon}</Box>
                  <Box>
                    <Typography fontWeight={700}>{title}</Typography>
                    <Typography color="text.secondary" variant="body2">{body}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
