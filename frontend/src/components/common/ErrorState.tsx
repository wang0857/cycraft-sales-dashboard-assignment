import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CHART_COLORS } from '../../utils/constants';

interface ErrorStateProps {
  message?: string;
  height?: number;
}

export function ErrorState({ message = '資料載入失敗，請稍後再試', height = 240 }: ErrorStateProps) {
  return (
    <Stack
      spacing={1}
      sx={{ height, color: CHART_COLORS.negative, alignItems: 'center', justifyContent: 'center' }}
    >
      <ErrorOutlineRounded sx={{ fontSize: 28 }} />
      <Typography variant="body2">{message}</Typography>
    </Stack>
  );
}
