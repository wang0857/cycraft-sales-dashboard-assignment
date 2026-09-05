import InboxOutlined from '@mui/icons-material/InboxOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  message?: string;
  height?: number;
}

export function EmptyState({ message = '這個區間目前沒有資料', height = 240 }: EmptyStateProps) {
  return (
    <Stack
      spacing={1}
      sx={{
        height,
        color: 'text.secondary',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <InboxOutlined sx={{ fontSize: 28, opacity: 0.6 }} />
      <Typography variant="body2">{message}</Typography>
    </Stack>
  );
}
