import { ArrowForwardOutlined, DeliveryDiningOutlined, LocalOfferOutlined, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';

import { RestaurantCard } from '../components/catalog/RestaurantCard';
import { SearchBar } from '../components/catalog/SearchBar';
import { YumyState } from '../components/catalog/YumyState';
import type { Restaurant } from '../data/mockData';
import type { CatalogStatus } from '../types/catalog';
import { applyCatalogImageFallback } from '../utils/imageFallback';

interface HomeViewProps {
  status: CatalogStatus;
  restaurants: readonly Restaurant[];
  categories: string[];
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onBrowseAll: () => void;
  onBrowseCategory: (category: string) => void;
  onViewRestaurant: (restaurant: Restaurant) => void;
  onRetry: () => void;
}

export function HomeView({
  status,
  restaurants,
  categories,
  query,
  onQueryChange,
  onSearch,
  onBrowseAll,
  onBrowseCategory,
  onViewRestaurant,
  onRetry,
}: HomeViewProps) {
  if (status === 'loading') return <YumyState type="loading" />;
  if (status === 'error') return <YumyState actionLabel="Try again" type="error" onAction={onRetry} />;
  if (restaurants.length === 0) return <YumyState type="empty" message="No restaurants are available right now." />;

  const heroRestaurant = restaurants[1] ?? restaurants[0];
  const featured = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <Box sx={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #FFF3E0 100%)', overflow: 'hidden' }}>
        <Container maxWidth="xl">
          <Grid alignItems="center" container spacing={{ xs: 4, md: 8 }} sx={{ minHeight: { md: 560 }, py: { xs: 6, md: 8 } }}>
            <Grid item md={6} xs={12}>
              <Stack alignItems="flex-start" spacing={3}>
                <Chip color="secondary" icon={<DeliveryDiningOutlined />} label="Fresh food, delivered locally" />
                <Typography component="h1" sx={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, maxWidth: 650 }}>
                  What are you craving today?
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
                  Explore top local restaurants, discover new meals, and add your favorites to the cart in a few taps.
                </Typography>
                <Box sx={{ maxWidth: 620, width: '100%' }}>
                  <SearchBar placeholder="Search restaurants or meals" value={query} onChange={onQueryChange} onSubmit={onSearch} />
                </Box>
                <Button color="secondary" endIcon={<SearchOutlined />} size="large" variant="contained" onClick={onSearch}>
                  Find food
                </Button>
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box sx={{ mx: 'auto', maxWidth: 540, position: 'relative' }}>
                <Box alt={`${heroRestaurant.name} featured food`} component="img" src={heroRestaurant.image} sx={{ aspectRatio: '4 / 3', borderRadius: 4, boxShadow: '0 10px 30px rgba(46,125,50,0.18)', objectFit: 'cover', width: '100%' }} onError={(event) => applyCatalogImageFallback(event.currentTarget)} />
                <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, bottom: 18, boxShadow: 2, left: 18, p: 2, position: 'absolute' }}>
                  <Typography fontWeight={700}>{heroRestaurant.name}</Typography>
                  <Typography color="text.secondary" variant="body2">⭐ {heroRestaurant.rating} · {heroRestaurant.deliveryEstimate}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <Stack alignItems={{ xs: 'flex-start', sm: 'center' }} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
            <Box>
              <Typography color="primary" variant="overline">Explore cuisines</Typography>
              <Typography component="h2" variant="h2">Popular categories</Typography>
            </Box>
            <Button endIcon={<ArrowForwardOutlined />} onClick={onBrowseAll}>All restaurants</Button>
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap={1.25}>
            {categories.filter((category) => category !== 'All').slice(0, 12).map((category) => (
              <Chip clickable color="primary" key={category} label={category} variant="outlined" onClick={() => onBrowseCategory(category)} />
            ))}
          </Stack>
        </Box>

        <Box component="section" sx={{ pb: { xs: 6, md: 8 } }}>
          <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Box>
              <Typography color="primary" variant="overline">Yumy recommends</Typography>
              <Typography component="h2" variant="h2">Featured restaurants</Typography>
            </Box>
            <Button endIcon={<ArrowForwardOutlined />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={onBrowseAll}>View all</Button>
          </Stack>
          <Grid container spacing={3}>
            {featured.map((restaurant) => (
              <Grid item key={restaurant.restaurantId} md={4} sm={6} xs={12}>
                <RestaurantCard restaurant={restaurant} onSelect={onViewRestaurant} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box component="section" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 4 }}>
        <Container maxWidth="lg">
          <Stack alignItems={{ xs: 'flex-start', md: 'center' }} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <LocalOfferOutlined fontSize="large" />
              <Box>
                <Typography component="h2" variant="h2">Free delivery weekend</Typography>
                <Typography>Discover participating restaurants and enjoy more of what you love.</Typography>
              </Box>
            </Stack>
            <Button color="inherit" endIcon={<ArrowForwardOutlined />} variant="outlined" onClick={onBrowseAll}>Browse offers</Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
