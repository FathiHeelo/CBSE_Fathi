import { FormControl, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { RestaurantSortOption } from '../../hooks/useRestaurantSearch';

interface RestaurantFiltersProps {
  categories: string[];
  category: string;
  sortBy: RestaurantSortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: RestaurantSortOption) => void;
}

export function RestaurantFilters({ categories, category, sortBy, onCategoryChange, onSortChange }: RestaurantFiltersProps) {
  return (
    <Stack alignItems={{ xs: 'stretch', md: 'center' }} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
      <ToggleButtonGroup
        exclusive
        aria-label="Restaurant category"
        size="small"
        value={category}
        onChange={(_, nextCategory: string | null) => nextCategory && onCategoryChange(nextCategory)}
        sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important', borderColor: 'divider !important', borderRadius: '999px !important', px: 2 } }}
      >
        {categories.map((item) => <ToggleButton key={item} value={item}>{item}</ToggleButton>)}
      </ToggleButtonGroup>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="restaurant-sort-label">Sort by</InputLabel>
        <Select label="Sort by" labelId="restaurant-sort-label" value={sortBy} onChange={(event) => onSortChange(event.target.value as RestaurantSortOption)}>
          <MenuItem value="featured">Featured</MenuItem>
          <MenuItem value="rating">Highest rated</MenuItem>
          <MenuItem value="delivery">Fastest delivery</MenuItem>
          <MenuItem value="name">Name A-Z</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

