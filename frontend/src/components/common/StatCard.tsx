import type { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  accentColor?: string;
  children: ReactNode;
}

export function StatCard({ icon, label, accentColor, children }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{ color: accentColor ?? 'text.secondary', mb: 1.5, alignItems: 'center' }}
        >
          {icon}
          <Typography variant="overline" sx={{ color: 'inherit' }}>
            {label}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}
