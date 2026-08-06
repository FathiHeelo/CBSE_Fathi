import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

import { BrandLogo } from '../brand/BrandLogo';

interface YumyStateProps {
  type: 'loading' | 'empty' | 'error' | 'success';
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const defaults = {
  loading: { title: 'Yumy is preparing your choices', message: 'Loading delicious options…' },
  empty: { title: 'Yumy found no matches', message: 'Try another search or clear a filter.' },
  error: { title: 'Yumy hit a small problem', message: 'We could not load the catalog. Please try again.' },
  success: { title: 'Yumy says it is done', message: 'Your action was completed successfully.' },
};

export function YumyState({ type, title, message, actionLabel, onAction }: YumyStateProps) {
  const copy = defaults[type];

  return (
    <Stack alignItems="center" role={type === 'error' ? 'alert' : 'status'} spacing={2} sx={{ px: 3, py: 8, textAlign: 'center' }}>
      <Box sx={{ display: 'grid', height: 112, placeItems: 'center', position: 'relative', width: 112 }}>
        <BrandLogo showName={false} size={96} />
        {type === 'loading' && (
          <CircularProgress
            aria-label="Loading catalog"
            color="secondary"
            size={112}
            sx={{ position: 'absolute' }}
          />
        )}
      </Box>
      <Typography component="h2" variant="h3">{title ?? copy.title}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 440 }}>{message ?? copy.message}</Typography>
      {onAction && <Button variant="contained" onClick={onAction}>{actionLabel ?? (type === 'error' ? 'Try again' : 'Continue')}</Button>}
    </Stack>
  );
}
