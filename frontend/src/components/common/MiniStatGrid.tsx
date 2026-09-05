import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FONT_FAMILY_NUMERIC } from '../../theme/typography';

export interface MiniStat {
  label: string;
  value: string;
  valueColor?: string;
}

interface MiniStatGridProps {
  items: MiniStat[];
}

export function MiniStatGrid({ items }: MiniStatGridProps) {
  return (
    <Grid container spacing={1.5} sx={{ mt: 1 }}>
      {items.map((item) => (
        <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.25, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {item.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: FONT_FAMILY_NUMERIC, color: item.valueColor ?? 'text.primary', mt: 0.5 }}
            >
              {item.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
