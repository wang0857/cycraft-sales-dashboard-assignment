import type { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';

export type SectionStatus = 'loading' | 'empty' | 'error' | 'ready';

interface SectionCardProps {
  id?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  status?: SectionStatus;
  loadingMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  children: ReactNode;
}

export function SectionCard({
  id,
  icon,
  title,
  subtitle,
  action,
  status = 'ready',
  loadingMessage,
  emptyMessage,
  errorMessage,
  children,
}: SectionCardProps) {
  return (
    <Card id={id} sx={{ height: '100%', scrollMarginTop: 16 }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 0.5,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            rowGap: 0.75,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
            {icon}
            <Typography variant="h3">{title}</Typography>
          </Stack>
          {action}
        </Stack>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {status === 'loading' && <LoadingState message={loadingMessage} />}
        {status === 'empty' && <EmptyState message={emptyMessage} />}
        {status === 'error' && <ErrorState message={errorMessage} />}
        {status === 'ready' && children}
      </CardContent>
    </Card>
  );
}
