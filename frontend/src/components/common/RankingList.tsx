import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { getProductColor } from '../../utils/constants';
import { FONT_FAMILY_NUMERIC } from '../../theme/typography';
import { formatCurrency, formatPercent } from '../../utils/helpers/formatters';
import type { ProductRankingItem } from '../../types/sales';

interface RankingListProps {
  items: ProductRankingItem[];
  count?: number;
}

export function RankingList({ items, count }: RankingListProps) {
  const rows = typeof count === 'number' ? items.slice(0, count) : items;
  const maxRevenue = rows.reduce((max, row) => Math.max(max, row.revenue), 0);

  return (
    <Stack spacing={1.5}>
      {rows.map((row, index) => (
        <Tooltip
          key={row.name}
          arrow
          title={`${row.name}：${formatCurrency(row.revenue)}（佔比 ${formatPercent(row.share, { signDisplay: false })}）`}
        >
          <Box>
            <Stack direction="row" sx={{ mb: 0.5, justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="body2" noWrap sx={{ maxWidth: '58%' }}>
                {index + 1}. {row.name}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: FONT_FAMILY_NUMERIC, whiteSpace: 'nowrap' }}>
                {formatCurrency(row.revenue)}（{formatPercent(row.share, { signDisplay: false })}）
              </Typography>
            </Stack>
            <Box sx={{ height: 8, borderRadius: 999, bgcolor: 'action.hover', overflow: 'hidden' }}>
              <Box
                sx={{
                  height: '100%',
                  width: maxRevenue === 0 ? 0 : `${(row.revenue / maxRevenue) * 100}%`,
                  borderRadius: 999,
                  bgcolor: getProductColor(index),
                }}
              />
            </Box>
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}
