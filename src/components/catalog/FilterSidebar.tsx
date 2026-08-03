import { RestartAltRounded as RestartAltRoundedIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import type { CatalogFilters, PriceRange } from '../../types/product';
import { formatCurrency } from '../../utils/catalogUtils';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  filters: CatalogFilters;
  priceBounds: PriceRange;
  onFilterChange: <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  categories,
  brands,
  filters,
  priceBounds,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const toggleBrand = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((currentBrand) => currentBrand !== brand)
      : [...filters.brands, brand];
    onFilterChange('brands', nextBrands);
  };

  return (
    <Box component="aside" sx={{ minWidth: 0, p: 3 }}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h6">Filters</Typography>
        <Button startIcon={<RestartAltRoundedIcon />} size="small" onClick={onReset}>Reset</Button>
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      <FormControl fullWidth>
        <FormLabel sx={{ color: 'text.primary', fontWeight: 700 }}>Category</FormLabel>
        <RadioGroup
          value={filters.category}
          onChange={(event) => onFilterChange('category', event.target.value)}
        >
          <FormControlLabel control={<Radio size="small" />} label="All categories" value="all" />
          {categories.map((category) => (
            <FormControlLabel key={category} control={<Radio size="small" />} label={category} value={category} />
          ))}
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2.5 }} />

      <Box>
        <Typography fontWeight={700} gutterBottom>Price range</Typography>
        <Typography color="text.secondary" variant="body2">
          {formatCurrency(filters.priceRange[0])} – {formatCurrency(filters.priceRange[1])}
        </Typography>
        <Slider
          disableSwap
          max={priceBounds[1]}
          min={priceBounds[0]}
          value={filters.priceRange}
          valueLabelDisplay="auto"
          onChange={(_, value) => onFilterChange('priceRange', value as PriceRange)}
        />
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <FormControl fullWidth>
        <FormLabel sx={{ color: 'text.primary', fontWeight: 700 }}>Minimum rating</FormLabel>
        <RadioGroup
          value={filters.minimumRating}
          onChange={(event) => onFilterChange('minimumRating', Number(event.target.value))}
        >
          <FormControlLabel control={<Radio size="small" />} label="Any rating" value={0} />
          <FormControlLabel control={<Radio size="small" />} label="4★ & up" value={4} />
          <FormControlLabel control={<Radio size="small" />} label="4.5★ & up" value={4.5} />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2.5 }} />

      <Box>
        <Typography fontWeight={700} gutterBottom>Brand</Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  size="small"
                  onChange={() => toggleBrand(brand)}
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <FormControlLabel
        control={
          <Switch
            checked={filters.inStockOnly}
            onChange={(event) => onFilterChange('inStockOnly', event.target.checked)}
          />
        }
        label="In-stock items only"
      />
    </Box>
  );
}
