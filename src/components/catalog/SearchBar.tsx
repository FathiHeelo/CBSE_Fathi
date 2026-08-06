import {
  CloseRounded as CloseRoundedIcon,
  SearchRounded as SearchRoundedIcon,
} from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search restaurants or meals',
  size = 'medium',
  fullWidth = true,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <TextField
        fullWidth={fullWidth}
        inputProps={{ 'aria-label': 'Search restaurants and meals' }}
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton aria-label="Clear search" edge="end" size="small" onClick={() => onChange('')}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 999,
          },
        }}
      />
    </form>
  );
}
