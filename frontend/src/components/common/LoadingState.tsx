import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CHART_COLORS } from '../../utils/constants';

interface LoadingStateProps {
  message?: string;
  height?: number;
}

export function LoadingState({ message = '資料載入中…', height = 240 }: LoadingStateProps) {
  return (
    <Stack
      spacing={1.5}
      sx={{ height, color: 'text.secondary', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress size={28} thickness={4} sx={{ color: CHART_COLORS.revenue }} />
      <Typography variant="body2">{message}</Typography>
    </Stack>
  );
}
