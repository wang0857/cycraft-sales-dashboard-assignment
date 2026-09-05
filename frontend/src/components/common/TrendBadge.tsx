import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded';
import RemoveRounded from '@mui/icons-material/RemoveRounded';
import { alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { CHART_COLORS } from '../../utils/constants';
import { FONT_FAMILY_NUMERIC } from '../../theme/typography';
import { formatCurrency, formatPercent } from '../../utils/helpers/formatters';
import { TrendDirection, getTrendDirection } from '../../utils/enums';

interface TrendBadgeProps {
  value: number | null | undefined;
  format?: 'percent' | 'currency';
  decimals?: number;
}

const NEUTRAL_COLOR = '#94A3B8';

export function TrendBadge({ value, format = 'percent', decimals }: TrendBadgeProps) {
  const direction = getTrendDirection(value);
  const color =
    direction === TrendDirection.Up
      ? CHART_COLORS.positive
      : direction === TrendDirection.Down
        ? CHART_COLORS.negative
        : NEUTRAL_COLOR;
  const Icon = direction === TrendDirection.Up ? ArrowUpwardRounded : direction === TrendDirection.Down ? ArrowDownwardRounded : RemoveRounded;
  const label =
    value === null || value === undefined
      ? '—'
      : format === 'currency'
        ? formatCurrency(value, { signDisplay: true })
        : formatPercent(value, { decimals });

  return (
    <Chip
      size="small"
      icon={<Icon sx={{ fontSize: '14px !important' }} />}
      label={label}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontFamily: FONT_FAMILY_NUMERIC,
        '& .MuiChip-icon': { color: 'inherit' },
      }}
    />
  );
}
