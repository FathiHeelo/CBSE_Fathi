import {
  CloseOutlined as CloseOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import type { FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  loading?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search restaurants or meals',
  size = 'medium',
  fullWidth = true,
  loading = false,
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
              <SearchOutlinedIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress aria-label="Updating search results" size={20} />
            </InputAdornment>
          ) : value ? (
            <InputAdornment position="end">
              <IconButton aria-label="Clear search" edge="end" size="small" onClick={() => onChange('')}>
                <CloseOutlinedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: '12px',
          },
        }}
      />
    </form>
  );
}
